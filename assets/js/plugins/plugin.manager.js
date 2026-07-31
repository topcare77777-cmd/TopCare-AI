/**
 * file: assets/js/plugins/plugin.manager.js
 * PluginManager murni sebagai Public API Surface yang mengdelegasikan tugas ke engine terkait.
 */
import { PluginMarketplaceClient } from './plugin.marketplace.client.js';
import { PluginTransactionManager } from './plugin.transaction.manager.js';
import { PluginActivator } from './plugin.activator.js';
import { PluginUpdateEngine } from './plugin.update.engine.js';
import { PluginRegistry } from './plugin.registry.js';

export const PluginManager = Object.freeze({
    async install(pluginId, options = {}) {
        return await PluginMarketplaceClient.downloadAndInstall(pluginId, options);
    },

    async remove(pluginId) {
        return await PluginTransactionManager.removePluginAtomic(pluginId, PluginRegistry._plugins);
    },

    async activate(order, options = {}) {
        return await PluginActivator.activateOrder(order, options);
    },

    async update(pluginId, options = {}) {
        return await PluginUpdateEngine.executeUpdate(pluginId, options);
    },

    async checkUpdates() {
        return await PluginUpdateEngine.checkAllUpdates();
    }
});