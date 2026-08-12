/**
 * TOPCARE AI PLATFORM V2 — FEATURE ROUTE LOADER
 * Path: assets/js/features/feature.route.loader.js
 * Status: OBSOLETE & NEUTRALIZED (Migrated to routes.registry.js SSOT)
 */

export class FeatureRouteLoader {
    /**
     * Obsolete dynamic manifest loader. 
     * Route registration is now strictly authoritatively defined in assets/js/core/router/routes.registry.js.
     */
    static loadRoutes() {
        // No-op to prevent duplicate or conflicting route registrations
        return true;
    }
}

export default FeatureRouteLoader;