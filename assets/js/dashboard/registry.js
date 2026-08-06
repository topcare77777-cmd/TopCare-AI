/**
 * TOPCARE AI PLATFORM V2 — DASHBOARD REGISTRY SERVICE
 * Path: assets/js/dashboard/registry.js
 * Status: APPROVED & LOCKED (BUILD 129.0)
 * SRP: Central Dashboard Module Registration & Enterprise Router Binding.
 */

import { Router } from '../router/index.js';

export class DashboardRegistry {
    constructor() {
        this.modules = new Map();
    }

    register(name, moduleInstance) {
        if (!name || !moduleInstance) return;
        this.modules.set(name, moduleInstance);
    }

    navigateToModule(moduleName) {
        if (this.modules.has(moduleName)) {
            Router.navigate(`/dashboard/${moduleName}`);
        } else {
            Router.navigate('/dashboard');
        }
    }
}

export const dashboardRegistry = new DashboardRegistry();
export default dashboardRegistry;