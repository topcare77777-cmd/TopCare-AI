/**
 * TOPCARE AI PLATFORM V2 — RELEASE BUNDLE GENERATOR & ARCHIVE SEALER
 * Path: assets/js/services/release/release.bundle.generator.js & release.archive.seal.js
 * Status: ACTIVE (BUILD AC-030 - LOCKED GOLDEN BASELINE)
 * Role: Compiles Final Golden Release Bundle and Applies Permanent Archival Seal
 */

import { RELEASE_STATUS, createGoldenReleaseManifestDTO } from './release.catalog.js';
import ReleaseCandidateValidator from './release.validator.js';
import ReleaseHashGenerator from './release.hash.generator.js';
import TimeProvider from '../../core/time/time.provider.js';
import { deepFreezeDTO } from '../../core/utils/dto.js';

export const ReleaseArchiveSeal = Object.freeze({
    /**
     * Seals a candidate release bundle into an immutable Golden Release Archive.
     *
     * @param {Object} bundle - Complete Snapshot Bundle
     * @param {Object} [options]
     * @param {number} [options.buildNumber=1]
     * @returns {Object} Composite Result { manifestDTO, goldenBundle, validationReport }
     */
    sealGoldenRelease(bundle = {}, options = {}) {
        const buildNumber = options.buildNumber || 1;

        // 1. Read-Only Verification
        const validationReport = ReleaseCandidateValidator.validateCandidateBundle(bundle);
        if (!validationReport.isValid) {
            throw new Error(`[ReleaseArchiveSeal] Candidate release validation failed: ${validationReport.violations.join(' | ')}`);
        }

        // 2. Cryptographic Hash Calculation
        const artifactHashes = ReleaseHashGenerator.generateHashes(bundle);

        // 3. Summaries Extraction
        const performanceSummary = {
            memoryPassed: bundle.architectureSnapshot?.summary?.memoryAssurancePassed || true,
            dtoContractsPassed: bundle.architectureSnapshot?.summary?.dtoContractsPassed || 0
        };

        const compatibilitySummary = {
            status: bundle.compatibilityMatrix?.status || 'COMPATIBLE',
            totalSchemasEvaluated: bundle.compatibilityMatrix?.totalEvaluated || 0
        };

        const diagnosticsSummary = {
            overallStatus: bundle.diagnosticsReport?.overallStatus || 'HEALTHY',
            summary: bundle.diagnosticsReport?.summary || {}
        };

        // 4. Create Immutable Golden Release Manifest DTO
        const manifestDTO = createGoldenReleaseManifestDTO({
            buildNumber,
            releaseStatus: RELEASE_STATUS.GOLDEN_SEALED,
            performanceSummary,
            compatibilitySummary,
            diagnosticsSummary,
            artifactHashes,
            timeProvider: TimeProvider
        });

        // 5. Freeze Complete Golden Bundle Permanently
        const goldenBundle = deepFreezeDTO({
            manifest: manifestDTO,
            artifacts: deepFreezeDTO({ ...bundle })
        });

        return deepFreezeDTO({
            manifestDTO,
            goldenBundle,
            validationReport
        });
    }
});

export default ReleaseArchiveSeal;
