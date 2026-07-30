/**
 * file: assets/js/view/view.service.js
 */

import { ViewRegistry } from './view.registry.js';

export const ViewService = Object.freeze({
    registerView(name, component, options) {
        return ViewRegistry.register(name, component, options);
    },
    resolveView(name) {
        return ViewRegistry.resolve(name);
    },
    hasView(name) {
        return ViewRegistry.has(name);
    },
    async mountView(name, container, data) {
        return await ViewRegistry.mount(name, container, data);
    },
    async initialize() {
        // Initialization hook for View Service layer
        return true;
    }
});