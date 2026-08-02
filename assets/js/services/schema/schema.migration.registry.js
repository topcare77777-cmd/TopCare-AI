/**
 * TOPCARE AI PLATFORM V2 — MIGRATION REGISTRY & ENGINE
 * Path: assets/js/services/schema/schema.migration.registry.js & schema.migration.engine.js
 * Status: ACTIVE (BUILD AC-028 - LOCKED GOLDEN BASELINE)
 * Role: Pure Adapter Chain Migration Execution & Report Generation
 */

import SchemaRegistry from '../../core/schema/schema.registry.js';
import SchemaVersionResolver from './schema.version.resolver.js';
import { COMPATIBILITY_LEVELS } from '../../core/schema/schema.catalog.js';
import { deepCloneDTO, deepFreezeDTO } from '../../core/utils/dto.js';
import TimeProvider from '../../core/time/time.provider.js';

export const MigrationRegistry = (() => {
    /** @type {Map<string, Function>} Key: "schemaType:fromVersion->toVersion" */
    const adapters = new Map();

    function registerAdapter(schemaType, fromVersion, toVersion, adapterFn) {
        if (typeof adapterFn !== 'function') {
            throw new Error('[MigrationRegistry] Adapter must be a pure function.');
        }
        const key = `${schemaType}:${fromVersion}->${toVersion}`;
        adapters.set(key, adapterFn);

        // Also register route in SchemaRegistry Graph
        SchemaRegistry.registerMigrationPath(schemaType, fromVersion, toVersion);
    }

    function findAdapter(schemaType, fromVersion, toVersion) {
        const key = `${schemaType}:${fromVersion}->${toVersion}`;
        return adapters.get(key) || null;
    }

    return Object.freeze({
        registerAdapter,
        findAdapter
    });
})();

export const MigrationEngine = Object.freeze({
    /**
     * Executes linear step-by-step migration over immutable input DTO.
     * @param {Object} inputDTO - Immutable input DTO
     * @returns {Object} Composite Result { transformedDTO, reportDTO }
     */
    migrate(inputDTO) {
        const startTime = TimeProvider.now();
        const statusResult = SchemaVersionResolver.resolveStatus(inputDTO);

        if (statusResult.status === COMPATIBILITY_LEVELS.COMPATIBLE) {
            return deepFreezeDTO({
                transformedDTO: inputDTO,
                reportDTO: deepFreezeDTO({
                    reportId: `mig_${TimeProvider.now().toString(36)}`,
                    schemaType: inputDTO.schemaType,
                    fromVersion: inputDTO.schemaVersion,
                    toVersion: inputDTO.schemaVersion,
                    adapterChain: Object.freeze([]),
                    durationMs: 0,
                    success: true,
                    warnings: Object.freeze([])
                })
            });
        }

        if (statusResult.status !== COMPATIBILITY_LEVELS.UPGRADABLE) {
            throw new Error(`[MigrationEngine] Cannot migrate DTO with status: ${statusResult.status}. Reason: ${statusResult.reason}`);
        }

        const route = statusResult.migrationRoute; // e.g. ['1.0.0', '2.0.0', '2.1.0']
        const adapterChainNames = [];
        const warnings = [];

        // Constitution 44 — Migration Never Mutates Input (Clone first)
        let currentDTO = deepCloneDTO(inputDTO);

        for (let i = 0; i < route.length - 1; i++) {
            const stepFrom = route[i];
            const stepTo = route[i + 1];

            const adapterFn = MigrationRegistry.findAdapter(inputDTO.schemaType, stepFrom, stepTo);
            if (!adapterFn) {
                throw new Error(`[MigrationEngine] Missing registered adapter for ${inputDTO.schemaType}: ${stepFrom} -> ${stepTo}`);
            }

            const stepKey = `${inputDTO.schemaType}:${stepFrom}->${stepTo}`;
            adapterChainNames.push(stepKey);

            // Execute Pure Adapter Transformation
            currentDTO = adapterFn(deepFreezeDTO(currentDTO));
        }

        const durationMs = TimeProvider.now() - startTime;

        const reportDTO = deepFreezeDTO({
            reportId: `mig_${TimeProvider.now().toString(36)}`,
            schemaType: inputDTO.schemaType,
            fromVersion: inputDTO.schemaVersion,
            toVersion: currentDTO.schemaVersion,
            adapterChain: Object.freeze(adapterChainNames),
            durationMs,
            success: true,
            warnings: Object.freeze(warnings)
        });

        return deepFreezeDTO({
            transformedDTO: deepFreezeDTO(currentDTO),
            reportDTO
        });
    }
});

export default MigrationEngine;
