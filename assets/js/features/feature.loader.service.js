/**
 * file: assets/js/features/feature.loader.service.js
 */

import { FeatureLoaderRegistry } from './feature.loader.registry.js';

export const FeatureLoaderService = Object.freeze({
    registerFeatureManifest(manifest) {
        return FeatureLoaderRegistry.registerManifest(manifest);
    },
    async loadFeature(featureId) {
        return await FeatureLoaderRegistry.load(featureId);
    },
    async prefetchFeature(featureId) {
        return await FeatureLoaderRegistry.prefetch(featureId);
    },
    isFeatureLoaded(featureId) {
        return FeatureLoaderRegistry.isLoaded(featureId);
    },
    async loadAll() {
        return await FeatureLoaderRegistry.loadAllManifests();
    }
});