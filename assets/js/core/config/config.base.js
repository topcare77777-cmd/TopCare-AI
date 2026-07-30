/**
 * file: assets/js/core/config/config.base.js
 */

import { ConfigInterface } from './config.interface.js';

export class ConfigBase extends ConfigInterface {
    constructor() {
        super();
        this._storage = new Map();
        Object.seal(this);
    }

    _validateKey(key) {
        if (!key || typeof key !== 'string') {
            throw new TypeError("Config key must be a valid non-empty string.");
        }
    }

    set(key, value) {
        this._validateKey(key);
        this._storage.set(key, value);
        return this;
    }

    get(key) {
        this._validateKey(key);
        return this._storage.get(key);
    }

    has(key) {
        this._validateKey(key);
        return this._storage.has(key);
    }

    remove(key) {
        this._validateKey(key);
        this._storage.delete(key);
        return this;
    }

    clear() {
        this._storage.clear();
        return this;
    }

    keys() {
        return Array.from(this._storage.keys());
    }
}