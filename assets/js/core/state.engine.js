/**
 * TopCare AI Platform V2.0.0
 * State Engine
 * Path: assets/js/core/state.engine.js
 */
import Logger from './logger.js';
import StorageEngine from './storage.engine.js';

const StateEngine = {
    state: {},
    listeners: new Map(),

    init(initialState = {}, persist = false) {
        this.state = persist ? (StorageEngine.get('topcare_state') || initialState) : initialState;
        Logger.info("[StateEngine] Initialized.");
    },

    get(key) {
        return key ? this.state[key] : this.state;
    },

    set(key, value, persist = false) {
        this.state[key] = value;
        if (persist) {
            StorageEngine.set('topcare_state', this.state);
        }
        this.notify(key, value);
    },

    subscribe(key, callback) {
        if (!this.listeners.has(key)) {
            this.listeners.set(key, new Set());
        }
        this.listeners.get(key).add(callback);
        return () => this.unsubscribe(key, callback);
    },

    unsubscribe(key, callback) {
        if (this.listeners.has(key)) {
            this.listeners.get(key).delete(callback);
        }
    },

    notify(key, value) {
        if (this.listeners.has(key)) {
            this.listeners.get(key).forEach(cb => cb(value));
        }
    }
};

export default StateEngine;