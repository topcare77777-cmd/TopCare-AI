/**
 * file: assets/js/runtime/runtime.router.manager.js
 */

import { RuntimeRouterBase } from './runtime.router.base.js';

export class RuntimeRouterManager {
    static initialize(engine) {
        if (!(engine instanceof RuntimeRouterBase)) {
            throw new TypeError("RuntimeRouterManager requires an instance of RuntimeRouterBase.");
        }
        return engine;
    }
}