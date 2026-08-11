/**
 * TOPCARE AI PLATFORM V2 — RUNTIME ROUTER ADAPTER
 * Path: assets/js/runtime/runtime.router.service.js
 * Status: APPROVED & ADAPTED TO CORE ROUTER SERVICE
 */

import { Router } from '../router/router.service.js';

export const RuntimeRouter = Object.freeze({
    initialize() {
        Router.start();
        return true;
    },
    isInitialized() {
        return !!window.__TC_ROUTER_INSTANCE__;
    }
});

export default RuntimeRouter;