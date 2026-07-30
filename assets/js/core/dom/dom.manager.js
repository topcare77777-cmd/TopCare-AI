/**
 * file: assets/js/core/dom/dom.manager.js
 */

import { DomBase } from './dom.base.js';

export class DomManager {
    static initialize(engine) {
        if (!(engine instanceof DomBase)) {
            throw new TypeError("DomManager requires an instance of DomBase.");
        }
        return engine;
    }
}