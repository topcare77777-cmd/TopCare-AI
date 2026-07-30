/**
 * file: assets/js/router/router.service.js
 */

import { RouterBase } from './router.base.js';
import { RouterManager } from './router.manager.js';

const engine = RouterManager.initialize(new RouterBase());

export const Router = Object.freeze({
    register(path, handler, options) {
        engine.register(path, handler, options);
        return this;
    },
    unregister(path) {
        engine.unregister(path);
        return this;
    },
    exists(path) {
        return engine.exists(path);
    },
    find(path) {
        return engine.find(path);
    },
    navigate(path) {
        engine.navigate(path);
        return this;
    },
    current() {
        return engine.current();
    },
    routes() {
        return engine.routes();
    },
    start() {
        engine.start();
        return this;
    }
});