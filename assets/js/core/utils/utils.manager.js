/**
 * file: assets/js/core/utils/utils.manager.js
 */

import { UtilsBase } from './utils.base.js';

export class UtilsManager {
    static initialize(engine) {
        if (!(engine instanceof UtilsBase)) {
            throw new TypeError("UtilsManager requires an instance of UtilsBase.");
        }
        return engine;
    }
}