/**
 * TOPCARE AI PLATFORM V2 — RUNTIME BOOTSTRAP
 * Path: assets/js/runtime/runtime.bootstrap.js
 * Version: 130.0.0 (BUILD 130 — MANIFEST RUNTIME BOOTSTRAP)
 * Status: APPROVED & LOCKED
 * SRP: Sequentially initializes Feature Manifest Loader, View Registry, Route Loader, and Router Engine.
 */

import { FeatureLoader } from '../features/feature.loader.js';
import { RouteLoader } from '../router/route.loader.js';
import { Router } from '../router/router.service.js';
import { Core } from '../core/index.js';

export class RuntimeBootstrapEngine {
    constructor() {
        this._isInitialized = false;
        Object.seal(this);
    }

    /**
     * Executes single canonical pipeline bootstrap driven by FeatureManifestRegistry.
     */
    async initialize() {
        if (this._isInitialized) {
            Core.Logger.warn('[RuntimeBootstrap] Bootstrap already completed. Skipping.');
            return;
        }

        Core.Logger.info('[RuntimeBootstrap] Starting Manifest-Driven Single Pipeline Bootstrapping...');

        try {
            // STEP 1: Dynamically load modules from FeatureManifestRegistry & populate ViewRegistry
            await FeatureLoader.loadAll();

            // STEP 2: Map loaded feature manifests to RouteLoader & Router
            RouteLoader.loadRoutes();

            // STEP 3: Start Router Engine Hash Listener & Dispatch Initial Route
            Router.start();

            this._isInitialized = true;
            Core.Logger.info('[RuntimeBootstrap] TopCare AI Platform Bootstrapped Successfully.');
        } catch (error) {
            Core.Logger.error(`[RuntimeBootstrap] Critical Boot Failure: ${error.message}`);
            throw error;
        }
    }
}

export const RuntimeBootstrap = new RuntimeBootstrapEngine();
export default RuntimeBootstrap;