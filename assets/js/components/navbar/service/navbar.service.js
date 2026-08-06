/**
 * TOPCARE AI PLATFORM V2 — NAVBAR DOMAIN SERVICE
 * Path: assets/js/components/navbar/service/navbar.service.js
 * Version: 132.0.0 (BUILD 132.0 — CANONICAL BASELINE)
 * Status: APPROVED & LOCKED
 * SRP: Central Domain Service orchestrating business logic, route API exposure, and dependency integration.
 */

import { MOBILE_BREAKPOINT, CLASSES } from '../navbar.constants.js';

export class NavbarService {
    /**
     * Dependency Injected Constructor.
     * @param {string|HTMLElement} containerSelector 
     * @param {Object} dependencies 
     */
    constructor(containerSelector, dependencies = {}) {
        this.containerSelector = containerSelector;
        this._isMounted = false;

        this._cache = dependencies.cache;
        this._breakpoints = dependencies.breakpoints;
        this._focus = dependencies.focus;
        this._drawer = dependencies.drawer;
        this._router = dependencies.router; // Injected Single Router Instance
        this._activeState = dependencies.activeState;
        this._config = dependencies.config || {};

        this._eventAdapter = dependencies.eventAdapterFactory({
            onHamburger: () => this.handleHamburgerToggle(),
            onAccordion: (e) => this.handleAccordionToggle(e),
            onHashChange: () => this.handleHashChange(),
            onDocumentClick: (e) => this.handleOutsideClick(e),
            onKeyDown: (e) => this.handleKeyDown(e)
        });
    }

    mount() {
        if (typeof document === 'undefined' || this._isMounted) return;

        this._cache.init(this.containerSelector);
        if (!this._cache.get('header')) return;

        this._eventAdapter.bindPrimary(this._cache);
        this._breakpoints.watch(() => this.closeMobileMenu());
        this.updateActiveState();

        this._isMounted = true;
    }

    refreshCache(options) {
        this._cache.refresh(options);
        this.updateActiveState();
    }

    /**
     * Exposes active route resolution from the single router instance.
     * @returns {string}
     */
    getActiveRoute() {
        return this._router ? this._router.getActiveRoute() : 'home';
    }

    updateActiveState() {
        if (this._activeState) {
            this._activeState.update(this._cache);
        }
    }

    handleHamburgerToggle() {
        const isOpen = this._drawer.toggle(this._cache);
        if (isOpen) {
            this._eventAdapter.bindDynamicDocument();
            this._focus.placeInitialFocus(this._cache.get('nav'));
        } else {
            this._eventAdapter.unbindDynamicDocument();
            this._focus.restoreFocus(this._cache.get('button'));
        }
    }

    handleAccordionToggle(e) {
        if (window.innerWidth <= MOBILE_BREAKPOINT && e) {
            e.preventDefault();
            const creator = this._cache.get('creator');
            if (creator) {
                creator.classList.toggle(CLASSES.ACCORDION_OPEN);
            }
        }
    }

    handleHashChange() {
        this.updateActiveState();
        this.closeMobileMenu();
    }

    handleOutsideClick(e) {
        const nav = this._cache.get('nav');
        const button = this._cache.get('button');
        if (!nav || !button) return;

        const path = e.composedPath ? e.composedPath() : [];
        const isInsideNav = path.includes(nav);
        const isInsideBtn = path.includes(button);

        if (!isInsideNav && !isInsideBtn && nav.classList.contains(CLASSES.IS_OPEN)) {
            this.closeMobileMenu();
        }
    }

    handleKeyDown(e) {
        const nav = this._cache.get('nav');
        const button = this._cache.get('button');
        if (!nav || !nav.classList.contains(CLASSES.IS_OPEN)) return;

        if (e.key === 'Escape') {
            this.closeMobileMenu();
            return;
        }

        this._focus.trapFocus(e, nav, button);
    }

    closeMobileMenu() {
        const wasOpen = this._drawer.close(this._cache);
        this._eventAdapter.unbindDynamicDocument();
        if (wasOpen) {
            this._focus.restoreFocus(this._cache.get('button'));
        }
    }

    destroy() {
        if (!this._isMounted) return;

        this.closeMobileMenu();
        this._eventAdapter.unbindAll(this._cache);
        this._breakpoints.unwatch();

        this._cache.clear();
        this._isMounted = false;
    }
}