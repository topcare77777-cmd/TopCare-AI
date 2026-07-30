/**
 * file: assets/js/core/event/event.base.js
 */

import { EventInterface } from './event.interface.js';

export class EventBase extends EventInterface {
    constructor() {
        super();
        this._listeners = new Map();
        Object.seal(this);
    }

    _validateEventName(eventName) {
        if (!eventName || typeof eventName !== 'string') {
            throw new TypeError("Event name must be a valid non-empty string.");
        }
    }

    _validateCallback(callback) {
        if (typeof callback !== 'function') {
            throw new TypeError("Event listener callback must be a valid function.");
        }
    }

    subscribe(eventName, callback) {
        this._validateEventName(eventName);
        this._validateCallback(callback);

        if (!this._listeners.has(eventName)) {
            this._listeners.set(eventName, new Set());
        }

        this._listeners.get(eventName).add(callback);
        return this;
    }

    unsubscribe(eventName, callback) {
        this._validateEventName(eventName);
        this._validateCallback(callback);

        if (this._listeners.has(eventName)) {
            const callbacks = this._listeners.get(eventName);
            callbacks.delete(callback);
            if (callbacks.size === 0) {
                this._listeners.delete(eventName);
            }
        }
        return this;
    }

    dispatch(eventName, payload = null) {
        this._validateEventName(eventName);

        if (this._listeners.has(eventName)) {
            const callbacks = this._listeners.get(eventName);
            for (const callback of callbacks) {
                try {
                    callback(payload);
                } catch (err) {
                    // Internal core event execution boundary isolation
                    // Silent isolation per architectural spec to prevent bubbling across core subsystems
                }
            }
        }
        return this;
    }

    clear(eventName) {
        if (eventName) {
            this._validateEventName(eventName);
            this._listeners.delete(eventName);
        } else {
            this._listeners.clear();
        }
        return this;
    }

    hasListeners(eventName) {
        this._validateEventName(eventName);
        if (!this._listeners.has(eventName)) {
            return false;
        }
        return this._listeners.get(eventName).size > 0;
    }
}