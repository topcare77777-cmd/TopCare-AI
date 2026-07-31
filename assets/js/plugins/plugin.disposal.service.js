/**
 * file: assets/js/plugins/plugin.disposal.service.js
 */

import { Core } from '../core/index.js';
import { PluginContext } from './plugin.context.js';

export const PluginDisposalService = Object.freeze({
    async disposeWrapper(pluginWrapper) {
        if (!pluginWrapper) return;
        const manifest = pluginWrapper.manifest || {};
        
        // Offload disposal auditing and execution to non-blocking microtask queue
        queueMicrotask(async () => {
            const context = new PluginContext(manifest);
            try {
                await pluginWrapper.dispose(context);
                Core.Logger.info(`PluginDisposalService successfully disposed plugin asynchronously: ${manifest.id}`);
                Core.Event.emit('plugin.disposed.success', { id: manifest.id });
            } catch (err) {
                Core.Logger.error(`PluginDisposalService disposal warning for '${manifest.id}': ${err.message}`);
                Core.Event.emit('plugin.disposal.failed', { id: manifest.id, error: err.message });
            }
        });
    }
});