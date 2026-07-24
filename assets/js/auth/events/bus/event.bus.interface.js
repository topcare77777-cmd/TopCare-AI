/**
 * TopCare AI Platform V2.0.0
 * Event Bus Interface Contract
 * Path: assets/js/auth/events/bus/event.bus.interface.js
 */

class EventBusInterface {
    publish(eventName, payload, options = {}) { throw new Error("Not implemented"); }
    subscribe(eventName, handler) { throw new Error("Not implemented"); }
    unsubscribe(eventName, handler) { throw new Error("Not implemented"); }
}