/**
 * file: assets/js/core/config/config.service.js
 */

import { ConfigBase } from './config.base.js';
import { ConfigManager } from './config.manager.js';

const engine = ConfigManager.initialize(new ConfigBase());

export const Config = Object.freeze({
    set(key, value) {
        engine.set(key, value);
        return this;
    },
    get(key) {
        return engine.get(key);
    },
    has(key) {
        return engine.has(key);
    },
    remove(key) {
        engine.remove(key);
        return this;
    },
    clear() {
        engine.clear();
        return this;
    },
    keys() {
        return engine.keys();
    }
});