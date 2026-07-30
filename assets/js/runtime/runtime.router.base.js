/**
 * file: assets/js/runtime/runtime.router.base.js
 */

import { Core } from '../core/index.js';
import { Container } from '../container/index.js';
import { RuntimeRouterInterface } from './runtime.router.interface.js';
import { RUNTIME_ROUTER_EVENTS } from './runtime.router.types.js';

export class RuntimeRouterBase extends RuntimeRouterInterface {
    constructor() {
        super();
        this._initialized = false;
        Object.seal(this);
    }

    _validateDependencies() {
        const required = ['Router', 'History', 'RouteLoader', 'RouteGuard'];
        for (const dep of required) {
            if (!Container.has(dep)) {
                throw new Error(`RuntimeRouter dependency validation failed: Missing required component '${dep}' in DI Container.`);
            }
        }
    }

    initialize() {
        if (this._initialized) {
            Core.Logger.info("RuntimeRouter already initialized. Skipping.");
            return true;
        }

        Core.Logger.info("RuntimeRouter initializing Router subsystem from Container...");

        try {
            // 1. Validate mandatory router components solely via DI Container SSOT
            this._validateDependencies();

            // 2. Resolve Router exclusively from Container
            const router = Container.resolve("Router");

            if (!router || typeof router.start !== 'function') {
                throw new Error("Resolved Router instance from Container missing 'start' method.");
            }

            // 3. Start Router engine
            router.start();

            this._initialized = true;

            // 4. Emit router.ready event
            Core.Event.emit(RUNTIME_ROUTER_EVENTS.READY, {
                timestamp: Date.now(),
                version: Core.version
            });

            Core.Logger.info("RuntimeRouter successfully initialized and started via Container.");
            return true;
        } catch (error) {
            Core.Logger.error(`RuntimeRouter initialization failed: ${error.message}`);
            Core.Event.emit(RUNTIME_ROUTER_EVENTS.FAILED, { error: error.message });
            throw error;
        }
    }

    isInitialized() {
        return this._initialized;
    }
}