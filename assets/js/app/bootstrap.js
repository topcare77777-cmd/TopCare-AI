/**
 * file: assets/js/app/bootstrap.js
 * Version: 137.0.0 (BUILD 129.0 — ROUTER SERVICE COMPATIBILITY MIGRATION)
 * Status: APPROVED & LOCKED
 * SRP: Orchestrates TopCare App startup and backward compatibility features.
 */

import { Core } from '../core/index.js';
import { MobileMenu } from '../core/mobile-menu.js';
import { CapabilityBootstrap } from '../core/capability/capability.bootstrap.js';

export async function bootstrap() {
    Core.Logger.info('[Bootstrap] Starting TopCare AI Platform V2 Runtime...');

    // 1. Initialize Enterprise Capability Bootstrap Registry Loader
    if (typeof CapabilityBootstrap !== 'undefined' && typeof CapabilityBootstrap.initialize === 'function') {
        CapabilityBootstrap.initialize();
    }

    // 2. Initialize Mobile Menu Event Handlers
    if (typeof MobileMenu !== 'undefined' && typeof MobileMenu.init === 'function') {
        MobileMenu.init();
    }

    Core.Logger.info('[Bootstrap] TopCare AI Platform V2 Compatibility Layer Successfully Bootstrapped.');
}

export default bootstrap;