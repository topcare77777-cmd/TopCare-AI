/**
 * TopCare AI Platform V2.0.0
 * Network Engine
 * Path: assets/js/core/network.engine.js
 */
import EventBus from '../core/event.bus.js';
import Logger from '../core/logger.js';

const NetworkEngine = {
    init() {
        window.addEventListener('online', () => {
            Logger.info("[NetworkEngine] Network online.");
            EventBus.emit('network:online', true);
        });
        window.addEventListener('offline', () => {
            Logger.info("[NetworkEngine] Network offline.");
            EventBus.emit('network:offline', true);
        });
    },

    isOnline() {
        return navigator.onLine;
    }
};

export default NetworkEngine;