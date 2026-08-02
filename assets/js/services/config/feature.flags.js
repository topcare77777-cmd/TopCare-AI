/**
 * TOPCARE AI PLATFORM V2 — FEATURE FLAGS REGISTRY & RESOLVER
 * Path: assets/js/services/config/feature.flags.js
 * Role: Single Source of Truth for Platform Feature Toggles
 */

import { deepFreezeDTO } from '../../core/utils/dto.js';

const FEATURE_REGISTRY = Object.freeze({
    ENABLE_OFFLINE_FALLBACK: true,
    ENABLE_STREAMING_UI: true,
    ENABLE_PERSONALITY_PROFILES: true,
    ENABLE_ADVANCED_DIAGNOSTICS: true,
    ENABLE_TELEMETRY_LOGGING: true
});

export const FeatureFlags = (() => {

    /**
     * Resolves whether a specific feature flag is active.
     * @param {string} flagKey - Flag identifier key.
     * @returns {boolean} True if enabled.
     */
    function isEnabled(flagKey) {
        if (typeof flagKey !== 'string') return false;
        return Boolean(FEATURE_REGISTRY[flagKey]);
    }

    /**
     * Retrieves a read-only snapshot of all active feature flags.
     * @returns {Object} Immutable feature flag catalog.
     */
    function getAllFlags() {
        return deepFreezeDTO({ ...FEATURE_REGISTRY });
    }

    return Object.freeze({
        isEnabled,
        getAllFlags
    });
})();

export default FeatureFlags;
