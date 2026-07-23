/**
 * @file router.js
 * @description Enterprise Single Page Application (SPA) Router acting as a pure route resolver and renderer,
 * delegating browser navigation event observation exclusively to RouterEngine.
 * @module Router/Router
 * @version 3.0.0
 * @status Production Ready
 */

import { routeGuard } from '../security/route.guard.js';
import { loginPage } from '../pages/login.page.js';
import { registerPage } from '../pages/register.page.js';
import { forgotPasswordPage } from '../pages/forgot-password.page.js';

export class Router {
    #routes;
    #currentPage;
    #rootElement;
    #initialized;

    /**
     * Creates an instance of Router.
     */
    constructor() {
        this.#routes = new Map([
            ['/login', loginPage],
            ['/register', registerPage],
            ['/forgot-password', forgotPasswordPage]
        ]);
        this.#currentPage = null;
        this.#rootElement = null;
        this.#initialized = false;
    }

    /**
     * Normalizes a route string into a standardized path format.
     * @private
     * @param {string} route - Raw route string.
     * @returns {string} Normalized route path.
     */
    #normalizeRoute(route) {
        if (!route || typeof route !== 'string') {
            return '/login';
        }

        let cleaned = route.trim();

        if (cleaned.startsWith('#/')) {
            cleaned = cleaned.substring(1);
        } else if (cleaned.startsWith('#')) {
            cleaned = `/${cleaned.substring(1)}`;
        }

        if (!cleaned.startsWith('/')) {
            cleaned = `/${cleaned}`;
        }

        if (cleaned.length > 1 && cleaned.endsWith('/')) {
            cleaned = cleaned.slice(0, -1);
        }

        return cleaned;
    }

    /**
     * Reads the current route from window.location.hash or returns default '/login'.
     * @private
     * @returns {string} Normalized current route.
     */
    #getRoute() {
        if (typeof window === 'undefined') {
            return '/login';
        }
        const hash = window.location.hash;
        if (!hash || hash === '#' || hash === '#/') {
            return '/login';
        }
        return this.#normalizeRoute(hash);
    }

    /**
     * Destroys the currently mounted page controller.
     * @private
     */
    #destroyCurrentPage() {
        if (this.#currentPage && typeof this.#currentPage.destroy === 'function') {
            try {
                this.#currentPage.destroy();
            } catch (error) {
                // Suppress teardown faults
            }
        }
        this.#currentPage = null;
    }

    /**
     * Resolves a normalized route to its corresponding page controller instance.
     * @private
     * @param {string} normalizedRoute - Normalized route path.
     * @returns {Object|null} Page controller instance or null if not found.
     */
    #resolvePage(normalizedRoute) {
        if (this.#routes.has(normalizedRoute)) {
            return this.#routes.get(normalizedRoute);
        }
        return null;
    }

    /**
     * Initializes the router, validates the root element, and triggers initial render.
     * @param {HTMLElement} rootElement - Root DOM container element.
     */
    init(rootElement) {
        if (!rootElement || !(rootElement instanceof HTMLElement)) {
            return;
        }

        if (this.#initialized) {
            return;
        }

        this.#rootElement = rootElement;
        this.#initialized = true;

        this.render();
    }

    /**
     * Navigates to a target route by updating window.location.hash.
     * @param {string} route - Target route path.
     */
    navigate(route) {
        const normalized = this.#normalizeRoute(route);
        if (typeof window !== 'undefined') {
            window.location.hash = `#${normalized}`;
        }
    }

    /**
     * Evaluates route guards, resolves the target page, and executes its lifecycle.
     */
    async render() {
        if (!this.#rootElement || !this.#initialized) {
            return;
        }

        try {
            const rawRoute = this.#getRoute();
            const normalizedRoute = this.#normalizeRoute(rawRoute);

            const allowed = await routeGuard.beforeEnter(normalizedRoute);
            if (!allowed) {
                return;
            }

            const pageInstance = this.#resolvePage(normalizedRoute);
            if (!pageInstance) {
                this.#destroyCurrentPage();
                this.navigate('/login');
                return;
            }

            this.#destroyCurrentPage();
            this.#currentPage = pageInstance;

            if (typeof this.#currentPage.init === 'function') {
                this.#currentPage.init();
            }

            if (typeof this.#currentPage.mount === 'function') {
                this.#currentPage.mount(this.#rootElement);
            }
        } catch (error) {
            this.#destroyCurrentPage();
            if (typeof window !== 'undefined') {
                window.location.hash = '#/login';
            }
        }
    }
}

export const router = new Router();