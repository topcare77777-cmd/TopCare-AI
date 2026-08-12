/**
 * TOPCARE AI PLATFORM V2
 * Path: assets/js/runtime/runtime.router.base.js
 * Status: REMOVED DUPLICATE ROUTER STARTUP
 */

export class RuntimeRouterBase {
    constructor() {
        this.isInitialized = false;
    }
    init() {
        // Router startup is handled authoritatively by index.js -> appRouter.init()
        this.isInitialized = true;
        console.log('[RuntimeRouterBase] Base initialized. Routing deferred to Core AppRouter.');
    }
}
export default RuntimeRouterBase;