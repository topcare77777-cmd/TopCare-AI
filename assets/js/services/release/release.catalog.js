/**
 * TOPCARE AI PLATFORM V2 — RELEASE CATALOG & CONTRACTS SSOT
 * Path: assets/js/services/release/release.catalog.js & release.contract.js
 * Status: ACTIVE (BUILD AC-030 - LOCKED GOLDEN BASELINE)
 * Role: Single Source of Truth for Release States, Versioning, and DTO Factory
 */

import { PLATFORM_VERSION, KNOWN_SCHEMA_TYPES } from '../../core/schema/schema.catalog.js';
import TimeProvider from '../../core/time/time.provider.js';
import { deepFreezeDTO } from '../../core/utils/dto.js';

export const RELEASE_SCHEMA_VERSION = '2.0.0';

export const RELEASE_STATUS = deepFreezeDTO({
    CANDIDATE: 'CANDIDATE',
    VERIFIED: 'VERIFIED',
    GOLDEN_SEALED: 'GOLDEN_SEALED',
    REJECTED: 'REJECTED'
});

export function createGoldenReleaseManifestDTO({
    releaseId,
    releaseName = 'TopCare AI Enterprise Golden Release',
    buildNumber = 1,
    releaseStatus = RELEASE_STATUS.GOLDEN_SEALED,
    performanceSummary = {},
    compatibilitySummary = {},
    diagnosticsSummary = {},
    artifactHashes = {},
    timeProvider = TimeProvider
}) {
    return deepFreezeDTO({
        schemaType: KNOWN_SCHEMA_TYPES.GOLDEN_RELEASE_MANIFEST,
        schemaVersion: RELEASE_SCHEMA_VERSION,
        platformVersion: PLATFORM_VERSION,
        releaseId: releaseId || `rel_${PLATFORM_VERSION}_b${buildNumber}_${timeProvider.now().toString(36)}`,
        releaseName: String(releaseName),
        buildNumber: Number(buildNumber),
        releaseTimestamp: timeProvider.iso(),
        architectureVersion: '2.0.0',
        publicApiVersion: '1.0.0',
        compatibilityVersion: '2.0.0',
        diagnosticsVersion: '2.0.0',
        metricsVersion: '2.0.0',
        configurationVersion: '2.0.0',
        performanceSummary: deepFreezeDTO({ ...performanceSummary }),
        compatibilitySummary: deepFreezeDTO({ ...compatibilitySummary }),
        diagnosticsSummary: deepFreezeDTO({ ...diagnosticsSummary }),
        artifactHashes: deepFreezeDTO({ ...artifactHashes }),
        releaseStatus: RELEASE_STATUS[releaseStatus] || RELEASE_STATUS.CANDIDATE
    });
}
