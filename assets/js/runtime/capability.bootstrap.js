/**
 * TOPCARE AI PLATFORM V2 — CAPABILITY BOOTSTRAP
 * Path: assets/js/runtime/capability.bootstrap.js
 * Status: CLEANED (BUILD 137.4)
 */

import { Core } from '../core/index.js';

export class CapabilityBootstrapEngine {
    constructor() {
        this._isInitialized = false;
        Object.seal(this);
    }

    async initialize() {
        if (this._isInitialized) return;

        Core.Logger.info('[CapabilityBootstrap] Initializing runtime capabilities...');

        // Note: DownloadCenterModule manual registration has been securely removed.
        // Download Center is now properly delegated to FeatureLoaderRegistry lazy-loading.

        this._isInitialized = true;
        Core.Logger.info('[CapabilityBootstrap] Capabilities initialized successfully.');
    }
}

export const CapabilityBootstrap = new CapabilityBootstrapEngine();
export default CapabilityBootstrap;