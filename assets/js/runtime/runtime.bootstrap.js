/**
 * TOPCARE AI PLATFORM V2 — RUNTIME BOOTSTRAP
 * Path: assets/js/runtime/runtime.bootstrap.js
 * Status: APPROVED — UNIFIED RUNTIME INITIALIZATION
 */

export class RuntimeBootstrap {

    /**
     * Core platform runtime initialization.
     *
     * Routing is exclusively handled by:
     * index.js → appRouter.init()
     */
    static async initialize() {
        try {
            // Future core runtime services may be initialized here.
            // DO NOT initialize Router or RouteLoader here.

            return true;
        } catch (error) {
            console.error(
                '[RuntimeBootstrap] Initialization error:',
                error
            );

            throw error;
        }
    }

    /**
     * Backward-compatible alias.
     *
     * Keeps the historical init() API available without
     * changing the authoritative initialize() contract.
     */
    static async init() {
        return RuntimeBootstrap.initialize();
    }
}

export default RuntimeBootstrap;