/**
 * TOPCARE AI PLATFORM V2 — NAVBAR ROUTER ADAPTER
 * Path: assets/js/components/navbar/domain/navbar.router.js
 * Version: 132.0.0 (BUILD 132.0 — CANONICAL BASELINE)
 * Status: APPROVED & LOCKED
 * SRP: Resolves active route metadata with prepared state tracking for future History API transition.
 */

export class NavbarRouter {
    constructor() {
        this.currentRoute = 'home';
        this.previousRoute = null;
    }

    /**
     * Resolves and updates active route tracking.
     * @returns {string} Primary route identifier
     */
    getActiveRoute() {
        const hash = window.location.hash.replace(/^#\/?/, '').trim().toLowerCase();
        const resolvedRoute = (!hash || hash === '' || hash === 'home') ? 'home' : hash.split('/')[0];

        if (this.currentRoute !== resolvedRoute) {
            this.previousRoute = this.currentRoute;
            this.currentRoute = resolvedRoute;
        }

        return this.currentRoute;
    }

    /**
     * Evaluates whether a route belongs to the Creator Submenu domain.
     * @param {string} route 
     * @returns {boolean}
     */
    isCreatorSubmenu(route) {
        return ['creator', 'prompt', 'ebook', 'artikel'].includes(route);
    }
}