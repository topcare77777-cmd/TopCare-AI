/**
 * file: assets/js/features/feature.registry.js
 */

import { FeatureBase } from './feature.base.js';
import { FeatureManager } from './feature.manager.js';

// Central Singleton Feature Registry Engine instance
const engine = FeatureManager.initialize(new FeatureBase());

export const FeatureRegistry = Object.freeze({
    register(name, definition, options) {
        return engine.register(name, definition, options);
    },
    resolve(name) {
        return engine.resolve(name);
    },
    has(name) {
        return engine.has(name);
    },
    getAll() {
        return engine.getAll();
    },
    async initializeAll() {
        return await engine.initializeAll();
    }
});