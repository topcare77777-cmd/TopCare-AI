/**
 * TopCare AI Platform V2.0.0
 * Analytics Engine
 * Path: assets/js/core/analytics.engine.js
 */
import EventBus from './event.bus.js';
import Logger from './logger.js';

const AnalyticsEngine = {
    init() {
        EventBus.on('analytics:track', (eventData) => {
            this.track(eventData.category, eventData.action, eventData.label);
        });
        Logger.info("[AnalyticsEngine] Initialized.");
    },

    track(category, action, label = '') {
        const payload = { category, action, label, timestamp: Date.now() };
        Logger.info("[AnalyticsEngine] Tracked:", payload);
        EventBus.emit('analytics:recorded', payload);
    }
};

export default AnalyticsEngine;