/**
 * -----------------------------------------------------------------
 * TOPCARE AI PLATFORM - ARCHITECTURE METADATA
 * -----------------------------------------------------------------
 * File         : assets/js/auth/guards/guest.route.guard.js
 * Layer        : Route Guard Layer (BUILD 095.4)
 * Status       : ACTIVE
 * Version      : 1.0.0
 * Architecture : Development Constitution v1.1
 * Description  : Prevents authenticated users entering guest routes.
 * -----------------------------------------------------------------
 */

import { authObserver } from "../runtime/auth.observer.js";

class GuestRouteGuard {
    canActivate() {
        const state = authObserver.getState();

        if (!state.initialized || !state.restored) {
            return {
                allowed: false,
                reason: "AUTH_NOT_READY"
            };
        }

        if (state.authenticated) {
            return {
                allowed: false,
                reason: "ALREADY_AUTHENTICATED"
            };
        }

        return {
            allowed: true,
            reason: null
        };
    }
}

export const guestRouteGuard = new GuestRouteGuard();
export default guestRouteGuard;