/**
 * file: assets/js/plugins/plugin.bootstrap.js
 */

import { Core } from '../core/index.js';
import { PluginLoader } from './plugin.loader.js';
import { PluginActivator } from './plugin.activator.js';

export const PluginBootstrap = Object.freeze({
    async bootAndInitialize(pluginId, options = {}) {
        Core.Logger.info(`PluginBootstrap orchestrating lifecycle for: ${pluginId}`);

        // 1. Resolve wrapper & topological order via PluginLoader facade
        const { wrapper, order } = await PluginLoader.load(pluginId);

        // 2. Delegate activation & rollback handling to PluginActivator
        await PluginActivator.activateOrder(order, options);

        Core.Logger.info(`PluginBootstrap successfully orchestrated lifecycle for: ${pluginId}`);
        return wrapper;
    }
});