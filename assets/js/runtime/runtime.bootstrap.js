/**
 * file: assets/js/runtime/runtime.bootstrap.js
 * Status: ACTIVE (BUILD 123.1)
 * Role: Enterprise Core Infrastructure & Subsystem Bootstrap Orchestrator
 */

import { Core } from '../core/index.js';
import { Container } from '../container/index.js';
import { ApiClient } from '../api/index.js';
import { Repository } from '../repository/index.js';
import { UserService } from '../services/index.js';
import { Router, History, RouteLoader, RouteGuard } from '../router/index.js';
import { RuntimeRouter } from './runtime.router.service.js';
import { FeatureRegistry, FeatureLoader } from '../features/index.js';
import { ViewService, ViewMountService } from '../view/index.js';
import { CapabilityBootstrap } from './capability.bootstrap.js';

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
            Container.register("FeatureRegistry", FeatureRegistry);
            Container.register("ViewService", ViewService);
            Container.register("ViewMountService", ViewMountService);

            Core.Logger.info("DI Container bindings registered successfully.");

            // 2. Initialize Core Subsystems & Event Bus
            Core.Lifecycle.boot();

            // 3. Initialize Capability Engine & Bind Handlers (BUILD 123.1 Integration)
            await CapabilityBootstrap.initialize();

            // 4. Load Feature Modules & Bind Feature Routes via FeatureLoader
            await FeatureLoader.load();

            // 5. Initialize Feature Modules via FeatureRegistry & View Adapter
            await FeatureRegistry.initializeAll();

            // 6. Initialize Route Loader SSOT
            if (RouteLoader && typeof RouteLoader.initialize === 'function') {
                RouteLoader.initialize();
            }

            // 7. Initialize View Service Layer
            await ViewService.initialize();

            // 8. Start View Mount Service
            const mountService = Container.resolve("ViewMountService");
            if (mountService && typeof mountService.initialize === 'function') {
                mountService.initialize('#app');
            } else if (mountService && typeof mountService.start === 'function') {
                mountService.start();
            }

            // 9. Initialize Router Runtime Integration
            await RuntimeRouter.initialize();

            // 10. Mark initialization flag as true (Idempotent Guard)
            RuntimeBootstrap._initialized = true;

            // 11. Emit Application Ready Event
            Core.Event.emit(Core.Constants.get('events', 'READY') || 'app.ready', {
                timestamp: Date.now(),
                version: Core.version
            });

            Core.Logger.info("RuntimeBootstrap successfully completed enterprise feature route binding initialization.");
            return true;
        } catch (error) {
            Core.Logger.error(`RuntimeBootstrap initialization failed: ${error.message}`);
            throw error;
        }
    }
}