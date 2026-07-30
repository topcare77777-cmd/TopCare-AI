/**
 * file: assets/js/core/constants/constants.manager.js
 */

import { ConstantsBase } from './constants.base.js';

export class ConstantsManager {
    static initialize(engine) {
        if (!(engine instanceof ConstantsBase)) {
            throw new TypeError("ConstantsManager requires an instance of ConstantsBase.");
        }
        return engine;
    }
}