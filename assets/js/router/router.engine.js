/**
 * @file router.engine.js
 * @description Enterprise Router Engine managing Single Page Application navigation history,
 * state tracking, hash synchronization, subscription listeners, and router instance orchestration.
 * @module Router/RouterEngine
 * @version 3.0.0
 * @status Production Ready
 */

export class RouterEngine {
    #currentRoute;
    #previousRoute;
    #listeners;
    #routerInstance;

    /**
     * Creates an instance of RouterEngine.
     */
    constructor() {
        this.#currentRoute = '';
        this.#previousRoute = '';
        this.#listeners = new Set();
        this.#routerInstance = null;
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
     * Notifies all registered subscription listeners of a route change.
     * @private
     * @param {string} route - Current route path.
     */
    #notify(route) {
        for (const callback of this.#listeners) {
            try {
                if (typeof callback === 'function') {
                    callback(route);
                }
            } catch (error) {
                // Suppress listener notification faults
            }
        }
    }

    /**
     * Attaches the Router instance to the RouterEngine.
     * @param {Object} routerInstance - Router instance.
     */
    attachRouter(routerInstance) {
        if (routerInstance) {
            this.#routerInstance = routerInstance;
        }
    }

    /**
     * Initializes the router engine, reads initial hash state, and binds the sole hashchange listener.
     */
    init() {
        if (typeof window === 'undefined') {
            return;
        }

        const initialHash = window.location.hash;
        const initialRoute = this.#normalizeRoute(initialHash || '/login');

        this.#currentRoute = initialRoute;
        this.#previousRoute = initialRoute;

        window.addEventListener('hashchange', () => {
            const newHash = window.location.hash;
            const targetRoute = this.#normalizeRoute(newHash || '/login');

            if (targetRoute !== this.#currentRoute) {
                this.#previousRoute = this.#currentRoute;
                this.#currentRoute = targetRoute;
                this.#notify(this.#currentRoute);
            }

            if (this.#routerInstance && typeof this.#routerInstance.render === 'function') {
                this.#routerInstance.render();
            }
        });
    }

    /**
     * Navigates to a target route by normalizing and updating the location hash.
     * @param {string} route - Target route path.
     */
    navigate(route) {
        const normalized = this.#normalizeRoute(route);
        if (typeof window !== 'undefined') {
            window.location.hash = `#${normalized}`;
        }
    }

    /**
     * Replaces the current history entry hash without creating a new history state stack record.
     * @param {string} route - Target route path.
     */
    replace(route) {
        const normalized = this.#normalizeRoute(route);
        if (typeof window !== 'undefined' && window.location) {
            const newUrl = `${window.location.pathname}${window.location.search}#${normalized}`;
            if (typeof window.location.replace === 'function') {
                window.location.replace(newUrl);
            } else {
                window.location.hash = `#${normalized}`;
            }
        }
    }

    /**
     * Navigates backward in the browser history stack.
     */
    back() {
        if (typeof window !== 'undefined' && window.history) {
            window.history.back();
        }
    }

    /**
     * Navigates forward in the browser history stack.
     */
    forward() {
        if (typeof window !== 'undefined' && window.history) {
            window.history.forward();
        }
    }

    /**
     * Triggers a manual reload/re-render of the current route through the attached router.
     */
    reload() {
        if (this.#routerInstance && typeof this.#routerInstance.render === 'function') {
            this.#routerInstance.render();
        }
    }

    /**
     * Retrieves the current active route.
     * @returns {string} Current route path.
     */
    getCurrentRoute() {
        if (typeof window !== 'undefined') {
            const hash = window.location.hash;
            if (hash && hash !== '#' && hash !== '#/') {
                this.#currentRoute = this.#normalizeRoute(hash);
            }
        }
        return this.#currentRoute;
    }

    /**
     * Retrieves the previously active route.
     * @returns {string} Previous route path.
     */
    getPreviousRoute() {
        return this.#previousRoute;
    }

    /**
     * Subscribes a callback function to route change events.
     * @param {Function} callback - Callback function receiving the new route string.
     */
    subscribe(callback) {
        if (typeof callback === 'function') {
            this.#listeners.add(callback);
        }
    }

    /**
     * Unsubscribes a callback function from route change events.
     * @param {Function} callback - Registered callback function.
     */
    unsubscribe(callback) {
        if (callback) {
            this.#listeners.delete(callback);
        }
    }
}

export const routerEngine = new RouterEngine();