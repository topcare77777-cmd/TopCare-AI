/**
 * file: assets/js/features/feature.service.js
 */

import { FeatureRegistry } from './feature.registry.js';

export const FeatureService = Object.freeze({
    registerFeature(name, definition, options) {
        return FeatureRegistry.register(name, definition, options);
    },
    getFeature(name) {
        return FeatureRegistry.resolve(name);
    },
    hasFeature(name) {
        return FeatureRegistry.has(name);
    },
    listFeatures() {
        return FeatureRegistry.getAll();
    },
    async bootFeatures() {
        return await FeatureRegistry.initializeAll();
    }
});