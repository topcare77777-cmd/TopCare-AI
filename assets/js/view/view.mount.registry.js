/**
 * file: assets/js/view/view.mount.registry.js
 * Status: APPROVED & LOCKED
 */

import { ViewMountBase } from './view.mount.base.js';
import { ViewMountManager } from './view.mount.manager.js';

const engine = ViewMountManager.initialize(new ViewMountBase());

export const ViewMountRegistry = Object.freeze({
    start() {
        return engine.start();
    },
    stop() {
        return engine.stop();
    },
    isStarted() {
        return engine.isStarted();
    }
});

export default ViewMountRegistry;