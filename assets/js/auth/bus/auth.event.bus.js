/**
 * TopCare AI Platform V2.0.0
 * Centralized Auth Event Bus with reliable Map handler reference tracking for off()
 * Path: assets/js/auth/bus/auth.event.bus.js
 */

class AuthEventBus {
    constructor() {
        this.handlers = new Map();
    }

    dispatch(eventName, detail = {}) {
        const event = new CustomEvent(eventName, { detail });
        window.dispatchEvent(event);
    }

    on(eventName, callback) {
        if (!this.handlers.has(eventName)) {
            this.handlers.set(eventName, new Map());
        }
        const eventMap = this.handlers.get(eventName);
        if (!eventMap.has(callback)) {
            const wrapper = (e) => callback(e.detail);
            eventMap.set(callback, wrapper);
            window.addEventListener(eventName, wrapper);
        }
    }

    off(eventName, callback) {
        if (!this.handlers.has(eventName)) return;
        const eventMap = this.handlers.get(eventName);
        if (eventMap.has(callback)) {
            const wrapper = eventMap.get(callback);
            window.removeEventListener(eventName, wrapper);
            eventMap.delete(callback);
        }
    }
}

const globalAuthEventBus = new AuthEventBus();