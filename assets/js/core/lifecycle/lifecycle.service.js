/**
 * file: assets/js/core/lifecycle/lifecycle.service.js
 * Version: 131.1.0
 * BUILD 131.1 — LIFECYCLE COMPATIBILITY BRIDGE
 * SRP: Public Lifecycle API with backward compatibility.
 */

import { LifecycleBase } from './lifecycle.base.js';
import { LifecycleManager } from './lifecycle.manager.js';

const engine = LifecycleManager.initialize(
    new LifecycleBase()
);

export const Lifecycle = Object.freeze({

    // -------------------------------------------------
    // Enterprise API
    // -------------------------------------------------

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
    },

    // -------------------------------------------------
    // Legacy Compatibility API
    // -------------------------------------------------

    boot() {
        engine.executeBeforeBoot();
        engine.executeAfterBoot();
        return this;
    },

    shutdown() {
        engine.executeBeforeShutdown();
        engine.executeAfterShutdown();
        return this;
    }
});

export default Lifecycle;