/**
 * TOPCARE AI PLATFORM V2 — CAPABILITY BOOTSTRAP REGISTRY
 * Path: assets/js/runtime/capability.bootstrap.js
 * Version: 137.0.0 (BUILD 137.0 — CAPABILITY INTEGRATION)
 * Status: APPROVED & LOCKED
 * SRP: Bootstraps enterprise capability modules during ApplicationEntry initialization.
 */

import { DownloadCenterModule } from '../features/download-center/download-center.module.js';

export class CapabilityBootstrap {
    /**
     * Called automatically by runtime/application.entry.service.js during startup
     */
    static initialize() {
        try {
            // Install Download Center Capability
            DownloadCenterModule.install();

            if (window.TopCare && window.TopCare.Logger) {
                window.TopCare.Logger.info('[CapabilityBootstrap] DownloadCenterModule successfully attached to native Runtime Engine.');
            }
        } catch (err) {
            console.error('[CapabilityBootstrap] Error attaching DownloadCenterModule:', err);
        }
    }
}

export default CapabilityBootstrap;