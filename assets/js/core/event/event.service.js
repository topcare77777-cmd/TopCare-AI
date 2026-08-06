/**
 * file: assets/js/core/event/event.service.js
 * Version: 131.1.0
 * BUILD 131.1 — EVENT COMPATIBILITY BRIDGE
 * SRP: Public Event API with backward compatibility.
 */

import { EventBase } from './event.base.js';
import { EventManager } from './event.manager.js';

const engine = EventManager.initialize(
    new EventBase()
);

export const Event = Object.freeze({

    // -------------------------------------------------
    // Enterprise API
    // -------------------------------------------------

    subscribe(eventName, callback) {
        engine.subscribe(eventName, callback);
        return this;
    },

    unsubscribe(eventName, callback) {
        engine.unsubscribe(eventName, callback);
        return this;
    },

    dispatch(eventName, payload) {
        engine.dispatch(eventName, payload);
        return this;
    },

    clear(eventName) {
        engine.clear(eventName);
        return this;
    },

    hasListeners(eventName) {
        return engine.hasListeners(eventName);
    },

    // -------------------------------------------------
    // Legacy Compatibility API
    // -------------------------------------------------

    on(eventName, callback) {
        engine.subscribe(eventName, callback);
        return this;
    },

    off(eventName, callback) {
        engine.unsubscribe(eventName, callback);
        return this;
    },

    emit(eventName, payload) {
        engine.dispatch(eventName, payload);
        return this;
    },

    trigger(eventName, payload) {
        engine.dispatch(eventName, payload);
        return this;
    },

    publish(eventName, payload) {
        engine.dispatch(eventName, payload);
        return this;
    }

});

export default Event;