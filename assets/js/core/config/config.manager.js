/**
 * file: assets/js/core/config/config.manager.js
 */

import { ConfigBase } from './config.base.js';

export class ConfigManager {
    static initialize(engine) {
        if (!(engine instanceof ConfigBase)) {
            throw new TypeError("ConfigManager requires an instance of ConfigBase.");
        }
        return engine;
    }
}