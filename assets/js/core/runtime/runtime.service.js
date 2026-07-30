/**
 * file: assets/js/core/runtime/runtime.service.js
 */

import { RuntimeBase } from './runtime.base.js';
import { RuntimeManager } from './runtime.manager.js';

const engine = RuntimeManager.initialize(new RuntimeBase());

export const Runtime = Object.freeze({
    boot() {
        engine.boot();
        return this;
    },
    shutdown() {
        engine.shutdown();
        return this;
    },
    isBooted() {
        return engine.isBooted();
    },
    getState() {
        return engine.getState();
    }
});