/**
 * TopCare AI Platform V2.0.0
 * Router V3
 * Path: assets/js/core/router.v3.js
 */
import Logger from '../core/logger.js';

const RouterV3 = {
    routes: new Map(),
    current: null,

    register(path, handler, guards = []) {
        this.routes.set(path, { handler, guards });
    },

    async navigate(path) {
        const route = this.routes.get(path) || this.routes.get('*');
        if (!route) return;

        for (const guard of route.guards) {
            if (!guard()) {
                Logger.warn(`[RouterV3] Guard blocked route: ${path}`);
                return;
            }
        }

        this.current = path;
        await route.handler(path);
    }
};

export default RouterV3;