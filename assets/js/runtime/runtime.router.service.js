/**
 * file: assets/js/runtime/runtime.router.service.js
 */

import { RuntimeRouterBase } from './runtime.router.base.js';
import { RuntimeRouterManager } from './runtime.router.manager.js';

const engine = RuntimeRouterManager.initialize(new RuntimeRouterBase());

export const RuntimeRouter = Object.freeze({
    initialize() {
        return engine.initialize();
    },
    isInitialized() {
        return engine.isInitialized();
    }
});