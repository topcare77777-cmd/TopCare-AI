/**
 * file: assets/js/plugins/plugin.loader.js
 * PluginLoader murni berperan sebagai Facade tanpa logika internal.
 */
import { PluginLoadOrchestrator } from './plugin.load.orchestrator.js';

class PluginLoaderFacade {
    constructor() {
        this._orchestrator = new PluginLoadOrchestrator();
        Object.seal(this);
    }

    async load(pluginId) {
        return await this._orchestrator.loadPluginWithOrchestration(pluginId);
    }

    evict(pluginId) {
        this._orchestrator.evict(pluginId);
    }
}

export const PluginLoader = Object.freeze(new PluginLoaderFacade());