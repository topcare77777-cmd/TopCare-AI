/**
 * file: assets/js/view/view.registry.js
 */

import { ViewBase } from './view.base.js';
import { ViewManager } from './view.manager.js';

const engine = ViewManager.initialize(new ViewBase());

export const ViewRegistry = Object.freeze({
    register(name, component, options) {
        return engine.register(name, component, options);
    },
    resolve(name) {
        return engine.resolve(name);
    },
    has(name) {
        return engine.has(name);
    },
    async mount(name, container, data) {
        return await engine.mount(name, container, data);
    }
});