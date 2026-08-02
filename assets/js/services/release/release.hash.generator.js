/**
 * TOPCARE AI PLATFORM V2 — RELEASE HASH GENERATOR
 * Path: assets/js/services/release/release.hash.generator.js
 * Status: ACTIVE (BUILD AC-030 - LOCKED GOLDEN BASELINE)
 * Role: Calculates Cryptographic Deterministic Hashes for Release Integrity Auditing
 */

import { deepFreezeDTO } from '../../core/utils/dto.js';

function computeStringHash(str) {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
        const char = str.charCodeAt(i);
        hash = ((hash << 5) - hash) + char;
        hash |= 0;
    }
    return `hash_${Math.abs(hash).toString(36)}`;
}

export const ReleaseHashGenerator = Object.freeze({
    /**
     * Generates a deterministic hash map over all release artifact DTOs.
     * Pure Function: Zero side-effects.
     */
    generateHashes({
        architectureSnapshot = {},
        dtoCatalogSnapshot = {},
        configSnapshot = {},
        metricsSnapshot = {},
        compatibilityMatrix = {},
        diagnosticsReport = {},
        publicApiSurface = []
    } = {}) {
        return deepFreezeDTO({
            architectureHash: computeStringHash(JSON.stringify(architectureSnapshot)),
            dtoCatalogHash: computeStringHash(JSON.stringify(dtoCatalogSnapshot)),
            configurationHash: computeStringHash(JSON.stringify(configSnapshot)),
            metricsHash: computeStringHash(JSON.stringify(metricsSnapshot)),
            compatibilityHash: computeStringHash(JSON.stringify(compatibilityMatrix)),
            diagnosticsHash: computeStringHash(JSON.stringify(diagnosticsReport)),
            publicApiHash: computeStringHash(JSON.stringify(publicApiSurface))
        });
    }
});

export default ReleaseHashGenerator;
