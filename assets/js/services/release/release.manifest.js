/**
 * TOPCARE AI PLATFORM V2 — ENHANCED MANIFEST & SEQUENTIAL MIGRATION REGISTRY
 * Path: assets/js/services/release/release.manifest.js & migration.registry.js
 * Status: ACTIVE (PRODUCTION VALIDATION CANDIDATE - HARDENED)
 */

import TimeProvider from '../../core/time/time.provider.js';
import { deepFreezeDTO } from '../../core/utils/dto.js';

export function createEnhancedReleaseManifestDTO({
    semver = '2.2.0',
    buildNumber = 100,
    releaseChannel = 'stable', // 'stable' | 'beta' | 'nightly' | 'lts'
    gitCommit = 'c028a3f9e',
    platformVersion = '2.2.0',
    targetEnvironment = {},
    timeProvider = TimeProvider
}) {
    return deepFreezeDTO({
        schemaType: 'ReleaseManifestDTO',
        schemaVersion: '2.0.0',
        semver: String(semver),
        buildNumber: Number(buildNumber),
        releaseChannel: String(releaseChannel),
        gitCommit: String(gitCommit),
        platformVersion: String(platformVersion),
        targetEnvironment: deepFreezeDTO({
            minimumBrowser: 'ES2022 / Chrome 100+',
            minimumNode: 'v18.0.0',
            buildEnvironment: 'ci-github-actions-linux-x64',
            targetPlatform: 'static-web-app',
            ...targetEnvironment
        }),
        compiledAt: timeProvider.iso()
    });
}

// Sequential Migration Registry (Catatan 4)
export const SequentialMigrationRegistry = (() => {
    /** @type {Array<Object>} Ordered migration scripts */
    const registry = [
        { id: '001_initial_schema', version: '1.0.0', description: 'Initial DTO Schema Setup' },
        { id: '002_memory_schema_v2', version: '2.0.0', description: 'Extracted Facts & Confidence Scoring Upgrade' },
        { id: '003_workspace_ui_contracts', version: '2.1.0', description: 'Workspace RenderDTO & UI Action Factory Integration' },
        { id: '004_security_permissions_ssot', version: '2.2.0', description: 'Security Catalog Permission Set Optimization' }
    ];

    function getMigrationSteps(fromVersion, toVersion) {
        return deepFreezeDTO(registry.filter(step => step.version > fromVersion && step.version <= toVersion));
    }

    return Object.freeze({
        getMigrationSteps,
        listAllSteps: () => deepFreezeDTO([...registry])
    });
})();
