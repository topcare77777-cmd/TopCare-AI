/**
 * file: assets/js/router/router.manager.js
 */

import { RouterBase } from './router.base.js';

export class RouterManager {
    static initialize(engine) {
        if (!(engine instanceof RouterBase)) {
            throw new TypeError("RouterManager requires an instance of RouterBase.");
        }
        return engine;
    }
}