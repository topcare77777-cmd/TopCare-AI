/**
 * TOPCARE AI PLATFORM V2
 * Path: assets/js/dashboard/registry.js
 * Status: MIGRATED TO AUTHORITATIVE APP-ROUTER
 */
import { appRouter } from '../core/router/app-router.js';

export const DashboardRegistry = {
    init() {
        console.log('[DashboardRegistry] Initialized');
    },
    openDashboard() {
        appRouter.navigate('/home');
    }
};
export default DashboardRegistry;