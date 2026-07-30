/**
 * file: assets/js/core/lifecycle/lifecycle.manager.js
 */

import { LifecycleBase } from './lifecycle.base.js';

export class LifecycleManager {
    static initialize(engine) {
        if (!(engine instanceof LifecycleBase)) {
            throw new TypeError("LifecycleManager requires an instance of LifecycleBase.");
        }
        return engine;
    }
}