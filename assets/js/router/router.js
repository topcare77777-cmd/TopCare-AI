/**
 * file: assets/js/router/router.js
 * Version: 131.0.0 (BUILD 130.0 — DEPRECATED ROUTER COMPATIBILITY STUB)
 * Status: DEPRECATED & STUBBED
 * SRP: Backward compatibility stub for legacy Router imports. All route registration,
 *      dispatching, and guard logic have been migrated to router.registry.js.
 */

export const Router = {
    init() {
        console.warn('[Legacy Router] Deprecated. Routing is now initialized by router.registry.js via Enterprise Router Service.');
    },

    navigate(path) {
        console.warn(`[Legacy Router] Deprecated navigate('${path}') called. Redirecting hash location...`);
        const targetHash = `#${path.startsWith('/') ? path : '/' + path}`;
        if (window.location.hash !== targetHash) {
            window.location.hash = targetHash;
        }
    },

    handleRoute() {
        console.warn('[Legacy Router] Deprecated handleRoute() called. Router Engine stub active.');
    }
};

export default Router;