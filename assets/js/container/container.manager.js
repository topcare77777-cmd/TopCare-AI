/**
 * file: assets/js/container/container.manager.js
 */

import { ContainerBase } from './container.base.js';

export class ContainerManager {
    static initialize(engine) {
        if (!(engine instanceof ContainerBase)) {
            throw new TypeError("ContainerManager requires ContainerBase instance.");
        }
        return engine;
    }
}