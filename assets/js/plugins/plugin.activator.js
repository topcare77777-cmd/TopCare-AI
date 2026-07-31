/**
 * file: assets/js/plugins/plugin.activator.js
 */

import { Core } from '../core/index.js';
import { PluginRegistry } from './plugin.registry.js';
import { PluginContext } from './plugin.context.js';
import { PluginLoader } from './plugin.loader.js';

export class PluginActivator {
    static async activateOrder(order, options = {}) {
        const activatedWrappers = [];

        try {
            for (const pId of order) {
                const pWrapper = PluginRegistry.get(pId);
                if (pWrapper) {
                    const pluginContext = new PluginContext(pWrapper.manifest, options);
                    await pWrapper.activate(pluginContext);
                    activatedWrappers.push(pWrapper);
                }
            }
        } catch (err) {
            Core.Logger.error(`Plugin activation chain failed. Initiating full activation & cache rollback: ${err.message}`);

            // 1. Rollback activated lifecycle states in reverse order
            for (let i = activatedWrappers.length - 1; i >= 0; i--) {
                const wrapper = activatedWrappers[i];
                try {
                    const rollbackContext = new PluginContext(wrapper.manifest, options);
                    await wrapper.deactivate(rollbackContext);
                    PluginLoader.evict(wrapper.manifest.id); // Rollback cache
                    Core.Logger.info(`Rollback successfully deactivated and evicted plugin: ${wrapper.manifest.id}`);
                } catch (rollbackErr) {
                    Core.Logger.error(`Rollback failed for plugin '${wrapper.manifest.id}': ${rollbackErr.message}`);
                }
            }
            throw err;
        }
    }
}