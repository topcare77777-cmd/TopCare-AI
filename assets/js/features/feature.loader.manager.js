/**
 * TOPCARE AI PLATFORM V2 — FEATURE LOADER MANAGER
 * Path: assets/js/features/feature.loader.manager.js
 * Version: 131.1.0 (BUILD 131 — BASE LOADER DELEGATION)
 * Status: PENDING VALIDATION
 *
 * SRP:
 * Orchestrates access to the canonical FeatureLoaderBase.
 *
 * IMPORTANT:
 * - No dynamic import() in this layer.
 * - No secondary Promise cache.
 * - FeatureLoaderBase owns loading, caching and dependency resolution.
 */

import { FeatureManifestRegistry } from './feature.manifest.registry.js';
import { Core } from '../core/index.js';

export class FeatureLoaderManagerEngine {
    constructor(baseLoader) {
        if (!baseLoader || typeof baseLoader.load !== 'function') {
            throw new TypeError(
                '[FeatureLoaderManager] A valid FeatureLoaderBase instance is required.'
            );
        }

        this._baseLoader = baseLoader;
        Object.seal(this);
    }

    static initialize(baseLoader) {
        return new FeatureLoaderManagerEngine(baseLoader);
    }

    /**
     * Legacy manifest registration bridge.
     *
     * The canonical BUILD 130/131 manifest is static and read-only.
     * If the registry supports runtime registration, delegate to it.
     */
    registerManifest(manifest) {
        if (!manifest) {
            throw new TypeError(
                '[FeatureLoaderManager] Manifest is required.'
            );
        }

        if (typeof FeatureManifestRegistry.register === 'function') {
            return FeatureManifestRegistry.register(manifest);
        }

        Core.Logger.warn(
            '[FeatureLoaderManager] Runtime manifest registration is not supported by the canonical registry.'
        );

        return false;
    }

    /**
     * Canonical lazy-load entry point.
     *
     * FeatureLoaderBase is the sole loading authority.
     * Promise deduplication is therefore handled by Base Loader.
     *
     * @param {string} featureId
     * @returns {Promise<Object>}
     */
    async load(featureId) {
        if (!featureId || typeof featureId !== 'string') {
            throw new TypeError(
                '[FeatureLoaderManager] featureId must be a valid string.'
            );
        }

        const normalizedId = featureId.toLowerCase();

        Core.Logger.info(
            `[FeatureLoaderManager] Delegating lazy load to FeatureLoaderBase: '${normalizedId}'`
        );

        return await this._baseLoader.load(normalizedId);
    }

    /**
     * Returns whether the canonical Base Loader considers
     * the feature loaded.
     */
    isLoaded(featureId) {
        if (!featureId || typeof featureId !== 'string') {
            return false;
        }

        return this._baseLoader.isLoaded(featureId.toLowerCase());
    }

    /**
     * Prefetch delegates to Base Loader.
     */
    async prefetch(featureId) {
        if (!featureId || typeof featureId !== 'string') {
            return;
        }

        try {
            await this._baseLoader.prefetch(featureId.toLowerCase());
        } catch (error) {
            Core.Logger.warn(
                `[FeatureLoaderManager] Prefetch failed for '${featureId}': ${error.message}`
            );
        }
    }

    /**
     * Legacy bulk-loading API retained for backward compatibility.
     *
     * IMPORTANT:
     * RuntimeBootstrap MUST NOT call this method.
     * BUILD 131 routing remains lazy.
     */
    async loadAllManifests() {
        const manifests = FeatureManifestRegistry.getManifests();

        for (const manifest of manifests) {
            await this.load(manifest.id);
        }
    }
}

export const FeatureLoaderManager = FeatureLoaderManagerEngine;
export default FeatureLoaderManager;