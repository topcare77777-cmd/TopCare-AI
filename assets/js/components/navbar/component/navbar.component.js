/**
 * TOPCARE AI PLATFORM V2 — NAVBAR FACADE COMPONENT
 * Path: assets/js/components/navbar/component/navbar.component.js
 * Version: 132.0.0 (BUILD 132.0 — CANONICAL BASELINE)
 * Status: APPROVED & LOCKED
 * SRP: Pure Public Facade implementing Platform Universal Contract (~75 lines).
 */

import { SELECTORS } from '../navbar.constants.js';
import { NavbarFactory } from '../factory/navbar.factory.js';

export class NavbarComponent {
    constructor(containerSelector = SELECTORS.HEADER, factoryConfig = {}) {
        this.containerSelector = containerSelector;

        // Assembly via Instantiable Factory (Single Composition Root)
        this._factory = new NavbarFactory(factoryConfig);
        const bundle = this._factory.create(containerSelector);

        this._service = bundle.service;
    }

    /**
     * Universal Contract API: Mounts the component via Service Layer.
     */
    mount() {
        this._service.mount();
    }

    /**
     * Universal Contract API: Refreshes cached DOM references.
     * @param {Object} options 
     */
    refreshCache(options) {
        this._service.refreshCache(options);
    }

    /**
     * Universal Contract API Alias: Alias for refreshCache().
     * @param {Object} options 
     */
    refresh(options) {
        this.refreshCache(options);
    }

    /**
     * Public API: Resolves current route from domain service.
     * @returns {string}
     */
    getActiveRoute() {
        return this._service.getActiveRoute();
    }

    /**
     * Universal Contract API: Updates active visual states across navigation links.
     */
    updateActiveState() {
        this._service.updateActiveState();
    }

    /**
     * Universal Contract API Alias: Alias for updateActiveState().
     */
    update() {
        this.updateActiveState();
    }

    /**
     * Universal Contract API: Exposes Public Service Contract.
     * @returns {Object}
     */
    getPublicAPI() {
        return {
            mount: () => this.mount(),
            update: () => this.update(),
            refresh: (options) => this.refresh(options),
            refreshCache: (options) => this.refreshCache(options),
            destroy: () => this.destroy(),
            getActiveRoute: () => this.getActiveRoute()
        };
    }

    /**
     * Universal Contract Lifecycle Cleanup.
     */
    unmount() {
        this.destroy();
    }

    /**
     * Universal Contract API: Idempotent destroy execution.
     */
    destroy() {
        this._service.destroy();
    }
}

export default NavbarComponent;