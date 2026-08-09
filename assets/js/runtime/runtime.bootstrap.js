/**
 * TOPCARE AI PLATFORM V2 — RUNTIME BOOTSTRAP
 * Path: assets/js/runtime/runtime.bootstrap.js
 * Version: 131.1.0 (BUILD 131 — LAZY INITIAL BOOT)
 * Status: PENDING LOCK
 */

import { RouteLoader } from '../router/route.loader.js';
import { Router } from '../router/router.service.js';
import { Core } from '../core/index.js';

export class RuntimeBootstrapEngine {
    constructor() {
        this._isInitialized = false;
        Object.seal(this);
    }

    async initialize() {
        if (this._isInitialized) return;

        Core.Logger.info('[RuntimeBootstrap] Starting boot pipeline (Manifest First)...');

        // 1. Pendaftaran route mentah, tanpa loading module
        RouteLoader.loadRoutes();

        // 2. Start Router (Akan mentrigger lazy load saat menemukan hash active)
        await Router.start();

        this._isInitialized = true;
        Core.Logger.info('[RuntimeBootstrap] Pipeline initialized.');
    }
}

export const RuntimeBootstrap = new RuntimeBootstrapEngine();
export default RuntimeBootstrap;