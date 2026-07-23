/**
 * TopCare AI Platform V2.0.0
 * Enterprise Event Manager V2
 * Path: assets/js/core/event.manager.js
 */
import Logger from '../core/logger.js';

const EventManager = {
    events: new Map(),

    on(namespace, event, callback, priority = 0) {
        const key = `${namespace}:${event}`;
        if (!this.events.has(key)) {
            this.events.set(key, []);
        }
        this.events.get(key).push({ callback, priority });
        this.events.get(key).sort((a, b) => b.priority - a.priority);
    },

    emit(namespace, event, data) {
        const key = `${namespace}:${event}`;
        const listeners = this.events.get(key) || [];
        listeners.forEach(({ callback }) => {
            try {
                callback(data);
            } catch (error) {
                Logger.error(`[EventManager] Error in event ${key}:`, error);
            }
        });
    },

    once(namespace, event, callback) {
        const wrapper = (data) => {
            callback(data);
            // unsubscribe logic if needed
        };
        this.on(namespace, event, wrapper);
    }
};

export default EventManager;