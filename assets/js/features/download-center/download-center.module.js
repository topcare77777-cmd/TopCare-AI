/**
 * TOPCARE AI PLATFORM V2 — DOWNLOAD CENTER MODULE
 * Path: assets/js/features/download-center/download-center.module.js
 * Status: COMPATIBILITY MODE (BUILD 137.4)
 * Note: Manual routing has been stripped. Route mapping is now handled 
 * natively by FeatureManifestRegistry via the RouteLoader.
 */

import { Core } from '../../core/index.js';

export const DownloadCenterModule = {
    /**
     * Legacy install method.
     * Retained as a NO-OP to prevent "is not a function" crash errors 
     * if any orphan dependency still attempts to invoke it.
     */
    install(config = {}) {
        Core.Logger.info('[DownloadCenterModule] Legacy install() bypassed. Routing is now declarative via Manifest.');
    },

    initialize() {
        Core.Logger.info('[DownloadCenterModule] Initialized in compatibility mode.');
    }
};

export default DownloadCenterModule;