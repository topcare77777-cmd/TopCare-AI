/**
 * file: assets/js/features/feature.loader.registry.js
 */

import { FeatureLoaderBase } from './feature.loader.base.js';
import { FeatureLoaderManager } from './feature.loader.manager.js';

const engine = FeatureLoaderManager.initialize(new FeatureLoaderBase());

export const FeatureLoaderRegistry = Object.freeze({
    registerManifest(manifest) {
        return engine.registerManifest(manifest);
    },
    async load(featureId) {
        return await engine.load(featureId);
    },
    async prefetch(featureId) {
        return await engine.prefetch(featureId);
    },
    isLoaded(featureId) {
        return engine.isLoaded(featureId);
    },
    async loadAllManifests() {
        return await engine.loadAllManifests();
    }
});