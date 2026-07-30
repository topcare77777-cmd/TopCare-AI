/**
 * file: assets/js/view/view.mount.manager.js
 */

import { ViewMountBase } from './view.mount.base.js';

export class ViewMountManager {
    static initialize(engine) {
        if (!(engine instanceof ViewMountBase)) {
            throw new TypeError("ViewMountManager requires an instance of ViewMountBase.");
        }
        return engine;
    }
}