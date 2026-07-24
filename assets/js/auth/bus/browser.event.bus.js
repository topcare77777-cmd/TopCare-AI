/**
 * TopCare AI Platform V2.0.0
 * Browser Event Bus implementation with accurate Map reference tracking for off()
 * Path: assets/js/auth/bus/browser.event.bus.js
 */

class BrowserEventBus extends EventBusInterface {
    constructor() {
        super();
        this.handlers = new Map();
    }

    dispatch(eventName, detail = {}) {
        if (typeof window === 'undefined') return;
        const event = new CustomEvent(eventName, { detail });
        window.dispatchEvent(event);
    }

    on(eventName, callback) {
        if (typeof window === 'undefined') return;
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
        if (typeof window === 'undefined') return;
        if (!this.handlers.has(eventName)) return;
        const eventMap = this.handlers.get(eventName);
        if (eventMap.has(callback)) {
            const wrapper = eventMap.get(callback);
            window.removeEventListener(eventName, wrapper);
            eventMap.delete(callback);
        }
    }
}

const globalAuthEventBus = new BrowserEventBus();