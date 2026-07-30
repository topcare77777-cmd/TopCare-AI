/**
 * file: assets/js/core/event/event.manager.js
 */

import { EventBase } from './event.base.js';

export class EventManager {
    static initialize(engine) {
        if (!(engine instanceof EventBase)) {
            throw new TypeError("EventManager requires an instance of EventBase.");
        }
        return engine;
    }
}