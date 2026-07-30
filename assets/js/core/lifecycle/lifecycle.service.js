/**
 * file: assets/js/core/lifecycle/lifecycle.service.js
 */

import { LifecycleBase } from './lifecycle.base.js';
import { LifecycleManager } from './lifecycle.manager.js';

const engine = LifecycleManager.initialize(new LifecycleBase());

export const Lifecycle = Object.freeze({
    beforeBoot(callback) {
        engine.registerBeforeBoot(callback);
        return this;
    },
    afterBoot(callback) {
        engine.registerAfterBoot(callback);
        return this;
    },
    beforeShutdown(callback) {
        engine.registerBeforeShutdown(callback);
        return this;
    },
    afterShutdown(callback) {
        engine.registerAfterShutdown(callback);
        return this;
    },
    _executeBeforeBoot() {
        engine.executeBeforeBoot();
        return this;
    },
    _executeAfterBoot() {
        engine.executeAfterBoot();
        return this;
    },
    _executeBeforeShutdown() {
        engine.executeBeforeShutdown();
        return this;
    },
    _executeAfterShutdown() {
        engine.executeAfterShutdown();
        return this;
    },
    clear() {
        engine.clear();
        return this;
    }
});