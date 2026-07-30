/**
 * file: assets/js/core/event/event.interface.js
 */

export class EventInterface {
    subscribe(eventName, callback) { throw new Error("Not implemented"); }
    unsubscribe(eventName, callback) { throw new Error("Not implemented"); }
    dispatch(eventName, payload) { throw new Error("Not implemented"); }
    clear(eventName) { throw new Error("Not implemented"); }
    hasListeners(eventName) { throw new Error("Not implemented"); }
}