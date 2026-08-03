/**
 * TOPCARE AI PLATFORM V2 — AUTH ROUTE GUARD
 * Path: assets/js/auth/guards/auth-route.guard.js
 * Status: ACTIVE - MINIMAL WIRING FIX (BUILD 124.1)
 * SRP: Protects secured routes and preserves navigation intent in NavigationIntentService.
 */

import sessionManager from '../session/session.manager.js';
import { NavigationIntentService } from '../../runtime/navigation.intent.service.js';

export const AuthRouteGuard = Object.freeze({
    /**
     * Protected routes definition
     */
    protectedRoutes: [
        '/workspace',
        '/workspace/coach',
        '/personality-test',
        '/coach-selection',
        '/admin'
    ],

    /**
     * Checks route permission and saves intent if unauthorized
     */
    check(targetPath) {
        if (!targetPath) return { allowed: true };

        const isProtected = this.protectedRoutes.some(route => 
            targetPath === route || targetPath.startsWith(`${route}/`)
        );

        if (!isProtected) {
            return { allowed: true };
        }

        const currentSession = sessionManager.current();
        const isAuthenticated = currentSession !== null && !currentSession.isExpired();

        if (!isAuthenticated) {
            // Preserve intent using NavigationIntentService SSOT
            NavigationIntentService.saveIntent({
                route: targetPath,
                action: 'continue_journey',
                timestamp: Date.now()
            });

            return {
                allowed: false,
                redirect: '/login',
                reason: 'UNAUTHORIZED_ACCESS'
            };
        }

        return { allowed: true };
    }
});

export default AuthRouteGuard;