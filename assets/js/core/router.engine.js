/**
 * TopCare AI Platform V2.0.0
 * Enterprise Router V2
 * Path: assets/js/core/router.engine.js
 */
import Logger from './logger.js';

const RouterEngine = {
    routes: {},

    init() {
        window.addEventListener('hashchange', () => this.handleRoute());
        window.addEventListener('popstate', () => this.handleRoute());
        this.handleRoute();
    },

    addRoute(path, handler) {
        this.routes[path] = handler;
    },

    navigate(path) {
        window.location.hash = path;
    },

    handleRoute() {
        const path = window.location.hash.slice(1) || '/';
        const handler = this.routes[path] || this.routes['*'];
        if (handler) {
            handler(path);
        } else {
            Logger.warn(`[RouterEngine] Route not found: ${path}`);
        }
    }
};

export default RouterEngine;