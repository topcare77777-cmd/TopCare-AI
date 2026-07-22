/**
 * TopCare AI Platform V2.0.0
 * Event Manager V3
 * Path: assets/js/core/event.manager.v3.js
 */
const EventManagerV3 = {
    listeners: new Map(),

    on(event, callback, priority = 0) {
        if (!this.listeners.has(event)) this.listeners.set(event, []);
        this.listeners.get(event).push({ callback, priority });
        this.listeners.get(event).sort((a, b) => b.priority - a.priority);
    },

    emit(event, data) {
        const list = this.listeners.get(event) || [];
        list.forEach(({ callback }) => callback(data));
    }
};

export default EventManagerV3;