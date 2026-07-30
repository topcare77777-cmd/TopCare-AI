/**
 * file: assets/js/core/state/state.manager.js
 */

import { StateBase } from './state.base.js';

export class StateManager {
    static initialize(engine) {
        if (!(engine instanceof StateBase)) {
            throw new TypeError("StateManager requires an instance of StateBase.");
        }
        return engine;
    }
}