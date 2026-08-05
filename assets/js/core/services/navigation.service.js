/**
 * TOPCARE AI PLATFORM V2 — NAVIGATION STATE MANAGER (SSOT)
 * Path: assets/js/core/services/navigation.service.js
 * Status: APPROVED & LOCKED (BUILD 128.3 — ROUTE SYNCHRONIZER FIX)
 * SRP: Centralized active navigation indicator state synchronization.
 */

export class NavigationService {
    static instance = null;

    constructor() {
        if (NavigationService.instance) {
            return NavigationService.instance;
        }
        NavigationService.instance = this;
        this._initListeners();
    }

    /**
     * Extracts normalized active route key from window location
     * @returns {string} active route key
     */
    getActiveRouteKey() {
        const hash = window.location.hash.replace(/^#\/?/, '').trim();
        if (!hash || hash === '' || hash === 'home') {
            return 'home';
        }

        const baseRoute = hash.split('/')[0].toLowerCase();

        // Normalisasi alias rute
        if (baseRoute === 'about' || baseRoute === 'about-us' || baseRoute === 'tentang') return 'about';
        if (baseRoute === 'community' || baseRoute === 'komunitas') return 'community';
        if (baseRoute === 'learning' || baseRoute === 'belajar') return 'learning';
        if (baseRoute === 'creator') return 'creator';
        if (baseRoute === 'dashboard') return 'dashboard';
        if (baseRoute === 'assistant' || baseRoute === 'coach') return 'assistant';

        return baseRoute;
    }

    /**
     * Synchronizes active classes on all navbar links
     */
    updateActiveState() {
        const activeRoute = this.getActiveRouteKey();
        const navLinks = document.querySelectorAll('.tc-nav-link, .tc-navbar-link, .tc-navbar-menu a');

        if (!navLinks || navLinks.length === 0) return;

        navLinks.forEach((link) => {
            const dataRoute = link.getAttribute('data-route');
            const hrefRoute = link.getAttribute('href')?.replace(/^#\/?/, '').split('/')[0].toLowerCase();
            const routeTarget = dataRoute || hrefRoute;

            if (!routeTarget) return;

            // Pencocokan ketat untuk mencegah ganda aktif pada 'home'
            const isMatch = (routeTarget === activeRoute);

            if (isMatch) {
                link.classList.add('active');
                link.setAttribute('aria-current', 'page');
            } else {
                link.classList.remove('active');
                link.removeAttribute('aria-current');
            }
        });
    }

    /**
     * Binds global state change events
     * @private
     */
    _initListeners() {
        window.addEventListener('hashchange', () => this.updateActiveState());
        window.addEventListener('popstate', () => this.updateActiveState());
        document.addEventListener('DOMContentLoaded', () => this.updateActiveState());
    }
}

export const navigationService = new NavigationService();
export default navigationService;