/**
 * @file route.guard.js
 * @description Enterprise SPA Route Guard acting as the sole security gateway between the router 
 * and page controllers. Enforces strict fail-closed routing policies, guest versus protected route 
 * segregation, and delegation to AuthModule.
 * @module Security/RouteGuard
 * @version 3.0.0
 * @status Production Ready
 */

import { guard } from './guard.js';
import { authModule } from '../modules/auth.module.js';

export class RouteGuard {
    #guestRoutes;
    #protectedRoutes;

    /**
     * Creates an instance of RouteGuard.
     */
    constructor() {
        this.#guestRoutes = new Set([
            '/login',
            '/register',
            '/forgot-password'
        ]);

        this.#protectedRoutes = new Set([
            '/dashboard',
            '/profile',
            '/settings',
            '/admin',
            '/cms'
        ]);
    }

    /**
     * Normalizes a route string into a standardized path format (e.g., 'dashboard', '#/dashboard', '/dashboard' -> '/dashboard').
     * @private
     * @param {string} route - Raw route string.
     * @returns {string} Normalized route path.
     */
    #normalizeRoute(route) {
        if (!route || typeof route !== 'string') {
            return '/';
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
     * Performs hash-based redirection using window.location.hash without mutating history states.
     * @private
     * @param {string} route - Target route path.
     */
    #redirect(route) {
        if (typeof window !== 'undefined') {
            const cleanRoute = route.startsWith('/') ? route.substring(1) : route;
            window.location.hash = `#${cleanRoute.startsWith('/') ? cleanRoute : `/${cleanRoute}`}`;
        }
    }

    /**
     * Determines if a normalized route belongs to the guest-only set.
     * @private
     * @param {string} normalizedRoute - Normalized route path.
     * @returns {boolean} True if guest route.
     */
    #isGuestRoute(normalizedRoute) {
        return this.#guestRoutes.has(normalizedRoute);
    }

    /**
     * Determines if a normalized route belongs to the protected set.
     * @private
     * @param {string} normalizedRoute - Normalized route path.
     * @returns {boolean} True if protected route.
     */
    #isProtectedRoute(normalizedRoute) {
        if (this.#protectedRoutes.has(normalizedRoute)) {
            return true;
        }

        for (const protectedPath of this.#protectedRoutes) {
            if (normalizedRoute.startsWith(`${protectedPath}/`)) {
                return true;
            }
        }

        return false;
    }

    /**
     * Evaluates security constraints before entering a route.
     * @param {string} route - Target route path.
     * @returns {Promise<boolean>} True if access is permitted, false if redirected/denied.
     */
    async beforeEnter(route) {
        try {
            const normalized = this.#normalizeRoute(route);

            if (this.#isGuestRoute(normalized)) {
                try {
                    const authenticated = await authModule.isAuthenticated();
                    if (authenticated) {
                        this.#redirect('/dashboard');
                        return false;
                    }
                } catch (error) {
                    // Fail closed: treat error as unauthenticated
                }
                return true;
            }

            if (this.#isProtectedRoute(normalized)) {
                try {
                    const sessionValid = await authModule.verifySession();
                    if (!sessionValid || !sessionValid.success) {
                        this.#redirect('/login');
                        return false;
                    }
                } catch (error) {
                    this.#redirect('/login');
                    return false;
                }
                return true;
            }

            return true;
        } catch (error) {
            // Fail closed security rule on any unexpected exception
            this.#redirect('/login');
            return false;
        }
    }

    /**
     * Determines whether navigation into a route can be activated.
     * @param {string} route - Target route path.
     * @returns {Promise<boolean>} True if activation is allowed.
     */
    async canActivate(route) {
        return await this.beforeEnter(route);
    }

    /**
     * Determines whether the current route can be deactivated.
     * @param {string} route - Current route path.
     * @returns {boolean} True for Build 036.
     */
    canDeactivate(route) {
        return true;
    }
}

export const routeGuard = new RouteGuard();