/**
 * file: assets/js/core/event/event.service.js
 */

import { EventBase } from './event.base.js';
import { EventManager } from './event.manager.js';

const engine = EventManager.initialize(new EventBase());

export const Event = Object.freeze({
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
    }
});