/**
 * file: assets/js/features/feature.lifecycle.service.js
 */

import { FeatureLifecycleRegistry } from './feature.lifecycle.registry.js';

export const FeatureLifecycleService = Object.freeze({
    async bootFeature(name, definition) {
        return await FeatureLifecycleRegistry.boot(name, definition);
    },
    async initializeFeature(name, definition, container) {
        return await FeatureLifecycleRegistry.initialize(name, definition, container);
    },
    async mountFeature(name, definition, context) {
        return await FeatureLifecycleRegistry.mount(name, definition, context);
    },
    async markReady(name, definition) {
        return await FeatureLifecycleRegistry.ready(name, definition);
    },
    async unmountFeature(name, definition) {
        return await FeatureLifecycleRegistry.unmount(name, definition);
    },
    async destroyFeature(name, definition) {
        return await FeatureLifecycleRegistry.destroy(name, definition);
    },
    getFeatureState(name) {
        return FeatureLifecycleRegistry.getState(name);
    }
});