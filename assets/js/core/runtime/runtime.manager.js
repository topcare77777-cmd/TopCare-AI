/**
 * file: assets/js/core/runtime/runtime.manager.js
 */

import { RuntimeBase } from './runtime.base.js';

export class RuntimeManager {
    static initialize(engine) {
        if (!(engine instanceof RuntimeBase)) {
            throw new TypeError("RuntimeManager requires an instance of RuntimeBase.");
        }
        return engine;
    }
}