/**
 * TOPCARE AI PLATFORM V2 — RUNTIME ROUTER SERVICE ADAPTER
 * Path: assets/js/runtime/runtime.router.service.js
 * Status: MIGRATED TO AUTHORITATIVE APP-ROUTER
 * SRP: Safe migration adapter mapping legacy router calls to the core appRouter.
 */

import { appRouter } from '../core/router/app-router.js';

export const RuntimeRouterService = {
    /**
     * Programmatic navigation mapping
     */
    navigate: (path) => {
        appRouter.navigate(path);
    },

    /**
     * Dispatch mapped safely to navigate to utilize native hashchange transitions
     */
    dispatch: (path) => {
        appRouter.navigate(path);
    },

    /**
     * Dynamic route registration mapped to core router
     */
    register: (path, definition) => {
        appRouter.registerRoute(path, definition);
    }
};

export default RuntimeRouterService;