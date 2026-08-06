/**
 * TOPCARE AI PLATFORM V2 — NAVBAR COMPOSITION ROOT (FACTORY)
 * Path: assets/js/components/navbar/factory/navbar.factory.js
 * Version: 132.0.0 (BUILD 132.0 — CANONICAL BASELINE)
 * Status: APPROVED & LOCKED
 * SRP: Instantiable Single Composition Root assembling dependencies and exposing the canonical wire bundle.
 */

import { SELECTORS } from '../navbar.constants.js';
import { NavbarCache } from '../core/navbar.cache.js';
import { NavbarBreakpoints } from '../core/navbar.breakpoints.js';
import { NavbarEventAdapter } from '../core/navbar.event-adapter.js';
import { NavbarRouter } from '../domain/navbar.router.js';
import { NavbarActiveState } from '../domain/navbar.activestate.js';
import { NavbarFocus } from '../accessibility/navbar.focus.js';
import { NavbarDrawer } from '../ui/navbar.drawer.js';
import { NavbarService } from '../service/navbar.service.js';

export class NavbarFactory {
    constructor(config = {}) {
        this.config = Object.freeze({ ...config });
    }

    /**
     * Creates and wires the single-instance application bundle.
     * @param {string|HTMLElement} containerSelector 
     * @returns {{ service: NavbarService, router: NavbarRouter, cache: NavbarCache }}
     */
    create(containerSelector = SELECTORS.HEADER) {
        const cache = new NavbarCache();
        const breakpoints = new NavbarBreakpoints();
        const focus = new NavbarFocus();
        const drawer = new NavbarDrawer();
        const router = new NavbarRouter(); // Single Router Instance
        const activeState = new NavbarActiveState(router);

        const service = new NavbarService(containerSelector, {
            cache,
            breakpoints,
            focus,
            drawer,
            router,
            activeState,
            config: this.config,
            eventAdapterFactory: (callbacks) => new NavbarEventAdapter(callbacks)
        });

        return {
            service,
            router,
            cache
        };
    }
}