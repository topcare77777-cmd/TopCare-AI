/**
 * file: assets/js/view/view.manager.js
 */

import { ViewBase } from './view.base.js';

export class ViewManager {
    static initialize(engine) {
        if (!(engine instanceof ViewBase)) {
            throw new TypeError("ViewManager requires an instance of ViewBase.");
        }
        return engine;
    }
}