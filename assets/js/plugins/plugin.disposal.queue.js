/**
 * file: assets/js/plugins/plugin.disposal.queue.js
 */

import { Core } from '../core/index.js';
import { PluginContext } from './plugin.context.js';

class DisposalQueueManager {
    constructor(concurrencyLimit = 5) {
        this._queue = [];
        this._activeCount = 0;
        this._concurrencyLimit = concurrencyLimit;
        Object.seal(this);
    }

    enqueue(pluginWrapper) {
        return new Promise((resolve, reject) => {
            this._queue.push({ pluginWrapper, resolve, reject });
            this._processNext();
        });
    }

    _processNext() {
        if (this._activeCount >= this._concurrencyLimit || this._queue.length === 0) {
            return;
        }

        this._activeCount++;
        const { pluginWrapper, resolve, reject } = this._queue.shift();

        (async () => {
            const manifest = pluginWrapper.manifest || {};
            const context = new PluginContext(manifest);
            try {
                await pluginWrapper.dispose(context);
                Core.Logger.info(`DisposalQueue successfully disposed: ${manifest.id}`);
                Core.Event.emit('plugin.disposed.success', { id: manifest.id });
                resolve(true);
            } catch (err) {
                Core.Logger.error(`DisposalQueue error disposing '${manifest.id}': ${err.message}`);
                Core.Event.emit('plugin.disposed.failed', { id: manifest.id, error: err.message });
                reject(err);
            } finally {
                this._activeCount--;
                this._processNext();
            }
        })();
    }
}

export const DisposalQueue = Object.freeze(new DisposalQueueManager(5));