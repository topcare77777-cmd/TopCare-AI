/**
 * file: assets/js/plugins/plugin.repository.provider.js
 */

import { Core } from '../core/index.js';

export class RepositoryProvider {
    constructor() {
        this._repositories = new Map(); // repoId -> { name, url, priority, enabled }
        Object.seal(this);
    }

    registerRepository(id, config) {
        this._repositories.set(id, {
            id,
            name: config.name || id,
            url: config.url,
            priority: config.priority || 100,
            enabled: config.enabled !== false
        });
        Core.Logger.info(`Repository registered: ${id} (${config.url})`);
        return this;
    }

    unregisterRepository(id) {
        this._repositories.delete(id);
    }

    getRepositories() {
        return Array.from(this._repositories.values())
            .filter(r => r.enabled)
            .sort((a, b) => a.priority - b.priority);
    }
}

export const GlobalRepositoryProvider = Object.freeze(new RepositoryProvider());