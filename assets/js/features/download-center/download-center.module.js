/**
 * TOPCARE AI PLATFORM V2 — DOWNLOAD CENTER MODULE REGISTRY
 * Path: assets/js/features/download-center/download-center.module.js
 * Version: 137.1.0 (BUILD 137.1 — ROUTER REGISTRY COMPATIBLE)
 * Status: APPROVED & LOCKED
 * SRP: Registers Download Center routes matching RouterRegistry native dispatch pattern.
 */

import { Router } from '../../router/router.service.js';

export class DownloadCenterModule {
    /**
     * Registers route paths using native RouterRegistry pattern
     * @param {Object} registryInstance Reference to RouterRegistry
     */
    static register(registryInstance) {
        if (!registryInstance || typeof registryInstance._dispatchCorePage !== 'function') {
            console.warn("[DownloadCenterModule] RouterRegistry instance missing or invalid. Falling back to global Router registration.");
        }

        // Primary Route
        Router.register('/download-center', () => {
            if (registryInstance && typeof registryInstance._dispatchCorePage === 'function') {
                registryInstance._dispatchCorePage('download-center.page.js');
            }
        });

        // Alias Route Navigation
        Router.register('/downloads', () => {
            if (typeof Router.navigate === 'function') {
                Router.navigate('/download-center');
            }
        });
    }
}

export default DownloadCenterModule;