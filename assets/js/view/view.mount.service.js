/**
 * file: assets/js/view/view.mount.service.js
 */

import { ViewMountRegistry } from './view.mount.registry.js';

export const ViewMountService = Object.freeze({
    initialize(rootSelector) {
        // Support initialization and starting via service layer
        return ViewMountRegistry.start();
    },
    start() {
        return ViewMountRegistry.start();
    },
    stop() {
        return ViewMountRegistry.stop();
    },
    isStarted() {
        return ViewMountRegistry.isStarted();
    }
});