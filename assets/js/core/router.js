/**
 * TopCare AI Platform V2.0.0
 * Router Foundation (Hash Routing & History API)
 * Path: assets/js/core/router.js
 */
import EventBus from './event.bus.js';

const Router = {
    routes: {},
    currentRoute: null,

    init() {
        window.addEventListener('hashchange', () => this.handleRoute());
        window.addEventListener('popstate', () => this.handleRoute());
        this.handleRoute();
    },

    addRoute(path, callback) {
        this.routes[path] = callback;
    },

    navigate(path) {
        window.location.hash = path;
    },

    handleRoute() {
        const path = window.location.hash.slice(1) || '/';
        this.currentRoute = path;
        const handler = this.routes[path] || this.routes['*'];
        if (handler) {
            handler(path);
        }
        EventBus.emit('route:changed', { path });
    }
};

export default Router;