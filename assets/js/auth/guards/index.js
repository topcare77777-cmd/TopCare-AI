/**
 * -----------------------------------------------------------------
 * TOPCARE AI PLATFORM - ARCHITECTURE METADATA
 * -----------------------------------------------------------------
 * File         : assets/js/auth/guards/index.js
 * Layer        : Route Guard Barrel Export
 * Status       : ACTIVE
 * Version      : 1.0.0
 * -----------------------------------------------------------------
 */

import { protectedRouteGuard } from "./protected.route.guard.js";
import { guestRouteGuard } from "./guest.route.guard.js";

export {
    protectedRouteGuard,
    guestRouteGuard
};

export default {
    protectedRouteGuard,
    guestRouteGuard
};