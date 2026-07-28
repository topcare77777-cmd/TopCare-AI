/**
 * -----------------------------------------------------------------
 * TOPCARE AI PLATFORM - ARCHITECTURE METADATA
 * -----------------------------------------------------------------
 * File         : assets/js/auth/guards/protected.route.guard.js
 * Layer        : Route Guard Layer (BUILD 095.4)
 * Status       : ACTIVE
 * Version      : 1.0.0
 * Architecture : Development Constitution v1.1
 * Description  : Protects private routes using AuthObserver state.
 * -----------------------------------------------------------------
 */

import { authObserver } from "../runtime/auth.observer.js";

class ProtectedRouteGuard {
    canActivate() {
        const state = authObserver.getState();

        if (!state.initialized || !state.restored) {
            return {
                allowed: false,
                reason: "AUTH_NOT_READY"
            };
        }

        if (!state.authenticated) {
            return {
                allowed: false,
                reason: "AUTH_REQUIRED"
            };
        }

        return {
            allowed: true,
            reason: null
        };
    }
}

export const protectedRouteGuard = new ProtectedRouteGuard();
export default protectedRouteGuard;