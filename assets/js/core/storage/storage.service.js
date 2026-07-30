/**
 * file: assets/js/core/storage/storage.service.js
 */

import { StorageBase } from './storage.base.js';
import { StorageManager } from './storage.manager.js';

const engine = StorageManager.initialize(new StorageBase());

export const Storage = Object.freeze({
    set(key, value, driver) {
        engine.set(key, value, driver);
        return this;
    },
    get(key, driver) {
        return engine.get(key, driver);
    },
    has(key, driver) {
        return engine.has(key, driver);
    },
    remove(key, driver) {
        engine.remove(key, driver);
        return this;
    },
    clear(driver) {
        engine.clear(driver);
        return this;
    },
    keys(driver) {
        return engine.keys(driver);
    },
    length(driver) {
        return engine.length(driver);
    },
    driver() {
        return engine.driver();
    }
});