/**
 * file: assets/js/core/state/state.service.js
 */

import { StateBase } from './state.base.js';
import { StateManager } from './state.manager.js';

const engine = StateManager.initialize(new StateBase());

export const State = Object.freeze({
    set(key, value) {
        engine.set(key, value);
        return this;
    },
    get(key) {
        return engine.get(key);
    },
    has(key) {
        return engine.has(key);
    },
    remove(key) {
        engine.remove(key);
        return this;
    },
    clear() {
        engine.clear();
        return this;
    },
    keys() {
        return engine.keys();
    }
});