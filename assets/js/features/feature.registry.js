/**
 * TOPCARE AI PLATFORM V2 — FEATURE REGISTRY
 * Path: assets/js/features/feature.registry.js
 * Status: APPROVED & LOCKED
 * SRP: Central Registration and Access Hub for Application Features and Page Views.
 */

import { ViewRegistry } from '../view/view.registry.js';
import { Core } from '../core/index.js';

export class FeatureRegistryEngine {
    constructor() {
        this._features = new Map();
        Object.seal(this);
    }

    /**
     * Registers a feature along with its primary page view and metadata.
     * @param {string} featureId 
     * @param {Object} featureDefinition 
     */
    register(featureId, featureDefinition) {
        if (!featureId || !featureDefinition) {
            Core.Logger.error('[FeatureRegistry] Invalid feature registration attempt.');
            return;
        }

        const normalizedId = ViewRegistry.normalizeKey(featureId);

        this._features.set(normalizedId, featureDefinition);

        // Synchronize feature's primary view to ViewRegistry
        if (featureDefinition.view) {
            ViewRegistry.register(normalizedId, featureDefinition.view);
        }

        // Register route aliases if provided
        if (Array.isArray(featureDefinition.aliases)) {
            featureDefinition.aliases.forEach((alias) => {
                if (featureDefinition.view) {
                    ViewRegistry.register(alias, featureDefinition.view);
                }
            });
        }

        Core.Logger.info(`[FeatureRegistry] Registered feature '${normalizedId}' to platform registry.`);
    }

    /**
     * Resolves a feature definition by ID.
     * @param {string} featureId 
     * @returns {Object|null}
     */
    resolve(featureId) {
        const normalizedId = ViewRegistry.normalizeKey(featureId);
        return this._features.get(normalizedId) || null;
    }

    /**
     * Returns all registered feature definitions.
     * @returns {Array<Object>}
     */
    getAllFeatures() {
        return Array.from(this._features.values());
    }

    /**
     * Checks if a feature is registered.
     * @param {string} featureId 
     * @returns {boolean}
     */
    has(featureId) {
        const normalizedId = ViewRegistry.normalizeKey(featureId);
        return this._features.has(normalizedId);
    }
}

export const FeatureRegistry = new FeatureRegistryEngine();
export default FeatureRegistry;