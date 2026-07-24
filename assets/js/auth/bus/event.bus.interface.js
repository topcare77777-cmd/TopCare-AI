/**
 * TopCare AI Platform V2.0.0
 * EventBus Interface Contract
 * Path: assets/js/auth/bus/event.bus.interface.js
 */

class EventBusInterface {
    dispatch(eventName, detail = {}) { throw new Error("Not implemented"); }
    on(eventName, callback) { throw new Error("Not implemented"); }
    off(eventName, callback) { throw new Error("Not implemented"); }
}