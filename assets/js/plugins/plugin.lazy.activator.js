/**
 * file: assets/js/plugins/plugin.lazy.activator.js
 */

import { Core } from '../core/index.js';
import { PluginRegistry } from './plugin.registry.js';
import { PluginContext } from './plugin.context.js';

export class PluginLazyActivator {
    static createLazyProxy(pluginId, options = {}) {
        let initializedInstance = null;
        let isActivated = false;

        return new Proxy({}, {
            get(target, prop) {
                const pWrapper = PluginRegistry.get(pluginId);
                if (!pWrapper) {
                    throw new Error(`Lazy plugin '${pluginId}' not found in registry.`);
                }

                if (!isActivated) {
                    Core.Logger.info(`Lazy activating dependency on demand: ${pluginId}`);
                    const context = new PluginContext(pWrapper.manifest, options);
                    // Synchronous/Asynchronous activation bridge
                    pWrapper.activate(context).catch(err => {
                        Core.Logger.error(`Failed lazy activating plugin '${pluginId}': ${err.message}`);
                    });
                    isActivated = true;
                    initializedInstance = pWrapper.instance;
                }

                const targetObj = initializedInstance || pWrapper.instance || pWrapper;
                const value = targetObj[prop];
                return typeof value === 'function' ? value.bind(targetObj) : value;
            }
        });
    }
}