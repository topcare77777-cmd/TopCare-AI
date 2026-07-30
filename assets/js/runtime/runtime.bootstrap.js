/**
 * file: assets/js/runtime/runtime.bootstrap.js
 */

import { Core } from '../core/index.js';
import { Container } from '../container/index.js';
import { ApiClient } from '../api/index.js';
import { Repository } from '../repository/index.js';
import { UserService } from '../services/index.js';
import { Router, History, RouteLoader, RouteGuard } from '../router/index.js';
import { RuntimeRouter } from './runtime.router.service.js';

export class RuntimeBootstrap {
    static _initialized = false;

    static async initialize() {
        if (RuntimeBootstrap._initialized) {
            Core.Logger.info("RuntimeBootstrap already initialized. Skipping.");
            return true;
        }

        Core.Logger.info("RuntimeBootstrap initializing TopCare AI Enterprise Engine...");

        try {
            // 1. Register Core & Infrastructure Dependencies into DI Container
            Container.register("ApiClient", ApiClient);
            Container.register("Repository", Repository);
            Container.register("UserService", UserService);
            Container.register("Router", Router);
            Container.register("History", History);
            Container.register("RouteLoader", RouteLoader);
            Container.register("RouteGuard", RouteGuard);

            Core.Logger.info("DI Container bindings registered successfully (including Router & Subsystems).");

            // 2. Initialize Core Subsystems & Event Bus
            Core.Lifecycle.boot();

            // 3. Initialize Router Runtime Integration
            await RuntimeRouter.initialize();

            // 4. Mark initialization flag as true (Idempotent Guard)
            RuntimeBootstrap._initialized = true;

            // 5. Emit Application Ready Event
            Core.Event.emit(Core.Constants.get('events', 'READY') || 'app.ready', {
                timestamp: Date.now(),
                version: Core.version
            });

            Core.Logger.info("RuntimeBootstrap successfully completed full enterprise initialization.");
            return true;
        } catch (error) {
            Core.Logger.error(`RuntimeBootstrap initialization failed: ${error.message}`);
            throw error;
        }
    }
}