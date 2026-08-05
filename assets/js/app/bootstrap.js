/**
 * file: assets/js/app/bootstrap.js
 * Version: 136.0.0 (BUILD 126.1 — ENTERPRISE CAPABILITY BOOTSTRAP INTEGRATION)
 * Status: APPROVED & LOCKED
 * SRP: Orchestrates TopCare App startup, initializes Capabilities, Router, Mobile Menu, and Event bindings.
 */

import { Core } from '../core/index.js';
import { Router } from '../router/router.js';
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

    // 3. Initialize Single Page Application Router & Hash Listeners
    if (Router && typeof Router.init === 'function') {
        Router.init();
    } else if (Router && typeof Router.handleRoute === 'function') {
        Router.handleRoute();
        window.addEventListener('hashchange', () => Router.handleRoute());
    }

    Core.Logger.info('[Bootstrap] TopCare AI Platform V2 Successfully Bootstrapped.');
}

export default bootstrap;