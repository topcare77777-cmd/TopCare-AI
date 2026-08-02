/**
 * TOPCARE AI PLATFORM V2 — SCHEMA VERSION RESOLVER
 * Path: assets/js/services/schema/schema.version.resolver.js
 * Status: ACTIVE (BUILD AC-028 - LOCKED GOLDEN BASELINE)
 * Role: Evaluates Compatibility Levels for Incoming DTOs
 */

import { COMPATIBILITY_LEVELS, validateDTOIdentity } from '../../core/schema/schema.catalog.js';
import SchemaRegistry from '../../core/schema/schema.registry.js';
import { deepFreezeDTO } from '../../core/utils/dto.js';

export const SchemaVersionResolver = Object.freeze({
    /**
     * Resolves compatibility status of an incoming DTO against system target version.
     * @param {Object} dtoInstance
     * @returns {Object} Compatibility Status DTO
     */
    resolveStatus(dtoInstance) {
        try {
            validateDTOIdentity(dtoInstance);
        } catch (err) {
            return deepFreezeDTO({
                status: COMPATIBILITY_LEVELS.UNKNOWN,
                reason: err.message
            });
        }

        const { schemaType, schemaVersion } = dtoInstance;
        const targetVersion = SchemaRegistry.getTargetVersion(schemaType);

        if (schemaVersion === targetVersion) {
            return deepFreezeDTO({
                status: COMPATIBILITY_LEVELS.COMPATIBLE,
                schemaType,
                schemaVersion,
                targetVersion,
                requiresMigration: false
            });
        }

        const route = SchemaRegistry.findMigrationRoute(schemaType, schemaVersion, targetVersion);
        if (route && route.length > 1) {
            return deepFreezeDTO({
                status: COMPATIBILITY_LEVELS.UPGRADABLE,
                schemaType,
                schemaVersion,
                targetVersion,
                migrationRoute: Object.freeze(route),
                requiresMigration: true
            });
        }

        return deepFreezeDTO({
            status: COMPATIBILITY_LEVELS.INCOMPATIBLE,
            schemaType,
            schemaVersion,
            targetVersion,
            reason: `No valid migration route found from ${schemaVersion} to ${targetVersion} for ${schemaType}.`,
            requiresMigration: false
        });
    }
});

export default SchemaVersionResolver;
