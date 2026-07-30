/**
 * file: assets/js/runtime/runtime.bootstrap.js
 */

import { Core } from '../core/index.js';
import { Container } from '../container/index.js';
import { ApiClient } from '../api/index.js';
import { Repository } from '../repository/index.js';
import { UserService } from '../services/index.js';

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

            Core.Logger.info("DI Container bindings registered successfully.");

            // 2. Initialize Core Subsystems & Event Bus
            Core.Lifecycle.boot();

            // 3. Mark initialization flag as true (Idempotent Guard)
            RuntimeBootstrap._initialized = true;

            // 4. Emit Application Ready Event
            Core.Event.emit(Core.Constants.get('events', 'READY') || 'app.ready', {
                timestamp: Date.now(),
                version: Core.version
            });

            Core.Logger.info("RuntimeBootstrap successfully completed initialization.");
            return true;
        } catch (error) {
            Core.Logger.error(`RuntimeBootstrap initialization failed: ${error.message}`);
            throw error;
        }
    }
}