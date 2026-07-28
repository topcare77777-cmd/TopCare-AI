/**
 * -----------------------------------------------------------------
 * TOPCARE AI PLATFORM - ARCHITECTURE METADATA
 * -----------------------------------------------------------------
 * Layer        : Router Layer (Enterprise Router Engine)
 * Status       : ACTIVE
 * Version      : 3.2.0
 * Architecture : Development Constitution v1.1
 * Owner        : Router Conductor
 * Created      : BUILD 091 Router Runtime Hardening
 * 
 * Description  : Enterprise Router Engine acting as the SINGLE owner 
 *                of browser hashchange events, delegating execution 
 *                exclusively to the Router conductor.
 * -----------------------------------------------------------------
 */

export class RouterEngine {
    #currentRoute;
    #previousRoute;
    #listeners;
    #routerInstance;
    #initialized;

    constructor() {
        this.#currentRoute = '';
        this.#previousRoute = '';
        this.#listeners = new Set();
        this.#routerInstance = null;
        this.#initialized = false;
    }

    #normalizeRoute(route) {
        if (!route || typeof route !== 'string') {
            return '/home';
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

    attachRouter(routerInstance) {
        if (routerInstance) {
            this.#routerInstance = routerInstance;
        }
    }

    init() {
        if (this.#initialized || typeof window === 'undefined') {
            return;
        }
        this.#initialized = true;

        const initialHash = window.location.hash;
        const initialRoute = this.#normalizeRoute(initialHash || '/home');

        this.#currentRoute = initialRoute;
        this.#previousRoute = initialRoute;

        window.addEventListener('hashchange', () => {
            const newHash = window.location.hash;
            const targetRoute = this.#normalizeRoute(newHash || '/home');

            if (targetRoute !== this.#currentRoute) {
                this.#previousRoute = this.#currentRoute;
                this.#currentRoute = targetRoute;
                this.#notify(this.#currentRoute);
            }

            if (this.#routerInstance && typeof this.#routerInstance.handleRouting === 'function') {
                this.#routerInstance.handleRouting();
            }
        });
    }

    navigate(route) {
        const normalized = this.#normalizeRoute(route);
        if (typeof window !== 'undefined') {
            window.location.hash = `#${normalized}`;
        }
    }

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

    back() {
        if (typeof window !== 'undefined' && window.history) {
            window.history.back();
        }
    }

    forward() {
        if (typeof window !== 'undefined' && window.history) {
            window.history.forward();
        }
    }

    reload() {
        if (this.#routerInstance && typeof this.#routerInstance.handleRouting === 'function') {
            this.#routerInstance.handleRouting();
        }
    }

    getCurrentRoute() {
        if (typeof window !== 'undefined') {
            const hash = window.location.hash;
            if (hash && hash !== '#' && hash !== '#/') {
                this.#currentRoute = this.#normalizeRoute(hash);
            }
        }
        return this.#currentRoute;
    }

    getPreviousRoute() {
        return this.#previousRoute;
    }

    subscribe(callback) {
        if (typeof callback === 'function') {
            this.#listeners.add(callback);
        }
    }

    unsubscribe(callback) {
        if (callback) {
            this.#listeners.delete(callback);
        }
    }
}

export const routerEngine = new RouterEngine();
export default routerEngine;