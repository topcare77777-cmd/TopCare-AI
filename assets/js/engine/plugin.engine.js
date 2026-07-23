/**
 * TopCare AI Platform V2.0.0
 * Plugin Engine
 * Path: assets/js/core/plugin.engine.js
 */
import Logger from '../core/logger.js';

const PluginEngine = {
    plugins: new Map(),

    register(name, plugin) {
        this.plugins.set(name, plugin);
        if (typeof plugin.init === 'function') {
            plugin.init();
        }
        Logger.info(`[PluginEngine] Registered plugin: ${name}`);
    }
};

export default PluginEngine;