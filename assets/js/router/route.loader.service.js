/**
 * file: assets/js/router/route.loader.service.js
 */

import { RouteLoaderBase } from './route.loader.base.js';
import { RouteLoaderManager } from './route.loader.manager.js';

const engine = RouteLoaderManager.initialize(new RouteLoaderBase());

export const RouteLoader = Object.freeze({
    async load(route) {
        return await engine.load(route);
    },
    async preload(route) {
        await engine.preload(route);
        return this;
    },
    clearCache() {
        engine.clearCache();
        return this;
    },
    isCached(path) {
        return engine.isCached(path);
    }
});