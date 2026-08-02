/**
 * TOPCARE AI PLATFORM V2 — AUTH ROUTE GUARD
 * Path: assets/js/auth/guards/auth-route.guard.js
 * Status: ACTIVE - BUILD 138 (AUTHENTICATION RUNTIME BRIDGE)
 * SRP: Security Layer Guard for Protected Route Authorization & Redirect Intent Tracking
 */

import { Core } from '../../core/index.js';
import sessionManager from '../session/session.manager.js';

export const AuthRouteGuard = (() => {
    // Protected Routes Registry SSOT
    const PROTECTED_ROUTES = new Set([
        '/personality',
        '/personality-test',
        '/coach',
        '/workspace/coach',
        '/workspace'
    ]);

    const REDIRECT_INTENT_KEY = 'topcare.auth.redirect_intent';

    /**
     * Memeriksa status sesi pengguna saat ini dari AuthService V2 / SessionManager / Storage SSOT V2.
     */
    function isAuthenticated() {
        try {
            // 1. Check active session model in SessionManager SSOT
            const currentSession = sessionManager.current();
            if (currentSession && !currentSession.isExpired()) {
                return true;
            }

            // 2. Check token / user presence in V2 Storage SSOT
            const token = localStorage.getItem('topcare.auth.token')
                       || sessionStorage.getItem('topcare.auth.token')
                       || localStorage.getItem('topcare_session');

            const userJson = localStorage.getItem('topcare.auth.user')
                          || sessionStorage.getItem('topcare.auth.user')
                          || localStorage.getItem('topcare_user');

            if (!token && !userJson) return false;

            if (userJson) {
                const user = typeof userJson === 'string' ? JSON.parse(userJson) : userJson;
                return Boolean(user && (user.id || user.userId || user.username));
            }

            return Boolean(token);
        } catch (err) {
            Core.Logger.error(`[AuthRouteGuard] Session validation error: ${err.message}`);
            return false;
        }
    }

    /**
     * Mengecek apakah rute yang dituju memerlukan autentikasi.
     */
    function isRouteProtected(path) {
        if (!path || typeof path !== 'string') return false;
        const cleanPath = path.split('?')[0].toLowerCase();

        for (const protectedPath of PROTECTED_ROUTES) {
            if (cleanPath === protectedPath || cleanPath.startsWith(`${protectedPath}/`)) {
                return true;
            }
        }
        return false;
    }

    /**
     * Menyimpan rute asal yang ingin diakses user unauthenticated untuk auto-redirect pasca login.
     */
    function setRedirectIntent(targetPath) {
        if (!targetPath || targetPath === '/login' || targetPath === '/register') return;
        try {
            sessionStorage.setItem(REDIRECT_INTENT_KEY, targetPath);
            Core.Logger.info(`[AuthRouteGuard] Saved redirect intent: ${targetPath}`);
        } catch (err) {
            Core.Logger.warn(`[AuthRouteGuard] Failed to save redirect intent: ${err.message}`);
        }
    }

    /**
     * Mengambil dan membersihkan rute asal untuk diproses pasca login sukses.
     */
    function consumeRedirectIntent() {
        try {
            const intent = sessionStorage.getItem(REDIRECT_INTENT_KEY);
            if (intent) {
                sessionStorage.removeItem(REDIRECT_INTENT_KEY);
                return intent;
            }
        } catch (err) {
            Core.Logger.warn(`[AuthRouteGuard] Failed to consume redirect intent: ${err.message}`);
        }
        return '/home';
    }

    /**
     * Mengeksekusi pemeriksaan keamanan (Guard Check).
     * @param {string} path - Rute yang akan diakses
     * @returns {Object} GuardDecisionDTO { allowed: boolean, redirect: string|null }
     */
    function check(path) {
        const cleanPath = path.startsWith('/') ? path : `/${path}`;

        if (!isRouteProtected(cleanPath)) {
            return Object.freeze({ allowed: true, redirect: null });
        }

        if (isAuthenticated()) {
            return Object.freeze({ allowed: true, redirect: null });
        }

        // Unauthenticated access to protected route: Trigger Security Redirect Intent
        Core.Logger.warn(`[AuthRouteGuard] Access denied to protected route: '${cleanPath}'. Redirecting to /login.`);
        setRedirectIntent(cleanPath);

        return Object.freeze({
            allowed: false,
            redirect: '/login'
        });
    }

    return Object.freeze({
        check,
        isAuthenticated,
        isRouteProtected,
        consumeRedirectIntent,
        setRedirectIntent
    });
})();

export default AuthRouteGuard;
