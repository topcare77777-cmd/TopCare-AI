// assets/js/coach/coach-event-bus.js
/**
 * @file coach-event-bus.js
 * @description Centralized decoupled pub/sub event bus enabling cross-module communication without direct dependencies.
 * @module Coach/EventBus
 */

const subscribers = new Map();

export const CoachEventBus = {
    on(eventName, handler) {
        if (typeof eventName !== 'string' || typeof handler !== 'function') {
            return () => { };
        }

        if (!subscribers.has(eventName)) {
            subscribers.set(eventName, new Set());
        }
        subscribers.get(eventName).add(handler);

        return () => this.off(eventName, handler);
    },

    once(eventName, handler) {
        if (typeof eventName !== 'string' || typeof handler !== 'function') {
            return () => { };
        }

        const wrapper = (payload) => {
            this.off(eventName, wrapper);
            try {
                handler(payload);
            } catch (e) {
                console.error(`Error in once handler for event "${eventName}":`, e);
            }
        };

        return this.on(eventName, wrapper);
    },

    off(eventName, handler) {
        if (!subscribers.has(eventName)) return;
        const handlers = subscribers.get(eventName);
        handlers.delete(handler);
        if (handlers.size === 0) {
            subscribers.delete(eventName);
        }
    },

    emit(eventName, payload = {}) {
        if (!subscribers.has(eventName)) return;
        const handlers = subscribers.get(eventName);

        const timestampedPayload = {
            ...payload,
            timestamp: new Date().toISOString()
        };

        for (const handler of handlers) {
            try {
                handler(timestampedPayload);
            } catch (e) {
                console.error(`Error executing handler for event "${eventName}":`, e);
            }
        }
    },

    clear() {
        subscribers.clear();
    }
};