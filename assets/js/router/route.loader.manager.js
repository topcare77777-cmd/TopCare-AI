/**
 * file: assets/js/router/route.loader.manager.js
 */

import { RouteLoaderBase } from './route.loader.base.js';

export class RouteLoaderManager {
    static initialize(engine) {
        if (!(engine instanceof RouteLoaderBase)) {
            throw new TypeError("RouteLoaderManager requires an instance of RouteLoaderBase.");
        }
        return engine;
    }
}