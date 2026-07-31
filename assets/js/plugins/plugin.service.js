/**
 * file: assets/js/plugins/plugin.service.js
 */

import { PluginManager } from './plugin.manager.js';

export const PluginService = Object.freeze({
    async registerPlugin(manifest) {
        return await PluginManager.register(manifest);
    },
    async loadPlugin(pluginId) {
        return await PluginManager.load(pluginId);
    },
    async bootPlugin(pluginId, options) {
        return await PluginManager.boot(pluginId, options);
    },
    async disposePlugin(pluginId) {
        return await PluginManager.dispose(pluginId);
    },
    getPlugin(pluginId) {
        return PluginManager.get(pluginId);
    },
    getRegisteredPlugins() {
        return PluginManager.getAll();
    }
});