/**
 * file: assets/js/core/constants/constants.service.js
 */

import { ConstantsBase } from './constants.base.js';
import { ConstantsManager } from './constants.manager.js';

const engine = ConstantsManager.initialize(new ConstantsBase());

export const Constants = Object.freeze({
    get(domain, key) {
        return engine.get(domain, key);
    },
    has(domain, key) {
        return engine.has(domain, key);
    },
    getAll() {
        return engine.getAll();
    }
});