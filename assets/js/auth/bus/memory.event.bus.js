/**
 * TopCare AI Platform V2.0.0
 * Memory Event Bus implementation for non-browser unit testing
 * Path: assets/js/auth/bus/memory.event.bus.js
 */

class MemoryEventBus extends EventBusInterface {
    constructor() {
        super();
        this.listeners = new Map();
    }

    dispatch(eventName, detail = {}) {
        if (!this.listeners.has(eventName)) return;
        const callbacks = this.listeners.get(eventName);
        callbacks.forEach(cb => cb(detail));
    }

    on(eventName, callback) {
        if (!this.listeners.has(eventName)) {
            this.listeners.set(eventName, new Set());
        }
        this.listeners.get(eventName).add(callback);
    }

    off(eventName, callback) {
        if (!this.listeners.has(eventName)) return;
        this.listeners.get(eventName).delete(callback);
    }
}