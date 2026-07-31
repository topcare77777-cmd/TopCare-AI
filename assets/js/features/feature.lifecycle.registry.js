/**
 * file: assets/js/features/feature.lifecycle.registry.js
 */

import { FeatureLifecycleBase } from './feature.lifecycle.base.js';
import { FeatureLifecycleManager } from './feature.lifecycle.manager.js';

const engine = FeatureLifecycleManager.initialize(new FeatureLifecycleBase());

export const FeatureLifecycleRegistry = Object.freeze({
    async boot(name, definition) {
        return await engine.boot(name, definition);
    },
    async initialize(name, definition, container) {
        return await engine.initialize(name, definition, container);
    },
    async mount(name, definition, context) {
        return await engine.mount(name, definition, context);
    },
    async ready(name, definition) {
        return await engine.ready(name, definition);
    },
    async unmount(name, definition) {
        return await engine.unmount(name, definition);
    },
    async destroy(name, definition) {
        return await engine.destroy(name, definition);
    },
    getState(name) {
        return engine.getLifecycleState(name);
    }
});