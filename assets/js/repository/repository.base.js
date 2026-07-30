/**
 * file: assets/js/repository/repository.base.js
 */

import { Core } from '../core/index.js';
import { ApiClient } from '../api/index.js';
import { RepositoryInterface } from './repository.interface.js';
import { REPOSITORY_EVENTS } from './repository.types.js';
import { MockRepositoryProvider } from './repository.provider.mock.js';

export class RepositoryBase extends RepositoryInterface {
    constructor(provider = new MockRepositoryProvider()) {
        super();
        this._provider = provider;
        Object.seal(this);
    }

    setProvider(provider) {
        if (!provider || typeof provider.query !== 'function' || typeof provider.mutate !== 'function') {
            throw new TypeError("Repository provider must implement query() and mutate() methods.");
        }
        this._provider = provider;
        ApiClient.setProvider(provider);
        Core.Logger.info("Repository provider updated successfully.");
        return this;
    }

    async query(endpoint, options = {}) {
        if (!endpoint || typeof endpoint !== 'string') {
            throw new TypeError("Repository query endpoint must be a valid non-empty string.");
        }

        Core.Logger.info(`Repository querying: ${endpoint}`);
        Core.Event.emit(REPOSITORY_EVENTS.REQUEST, { type: 'query', endpoint, options });

        try {
            // Delegate through ApiClient pipeline instead of direct provider call
            const rawResponse = await ApiClient.get(endpoint, options);
            const response = Core.Utils.clone(rawResponse);

            Core.Logger.debug(`Repository query success: ${endpoint}`);
            Core.Event.emit(REPOSITORY_EVENTS.SUCCESS, { type: 'query', endpoint, response });

            return response;
        } catch (error) {
            Core.Logger.error(`Repository query failed: ${endpoint} - ${error.message}`);
            Core.Event.emit(REPOSITORY_EVENTS.ERROR, { type: 'query', endpoint, error });
            throw error;
        }
    }

    async mutate(endpoint, data = {}, options = {}) {
        if (!endpoint || typeof endpoint !== 'string') {
            throw new TypeError("Repository mutate endpoint must be a valid non-empty string.");
        }

        const method = options.method ? options.method.toUpperCase() : 'POST';

        Core.Logger.info(`Repository mutating [${method}]: ${endpoint}`);
        Core.Event.emit(REPOSITORY_EVENTS.REQUEST, { type: 'mutate', method, endpoint, data, options });

        try {
            // Delegate through ApiClient pipeline instead of direct provider call
            let rawResponse;
            if (method === 'PUT') {
                rawResponse = await ApiClient.put(endpoint, data, options);
            } else if (method === 'PATCH') {
                rawResponse = await ApiClient.patch(endpoint, data, options);
            } else if (method === 'DELETE') {
                rawResponse = await ApiClient.delete(endpoint, options);
            } else {
                rawResponse = await ApiClient.post(endpoint, data, options);
            }

            const response = Core.Utils.clone(rawResponse);

            Core.Logger.debug(`Repository mutate success: ${endpoint}`);
            Core.Event.emit(REPOSITORY_EVENTS.SUCCESS, { type: 'mutate', endpoint, response });

            return response;
        } catch (error) {
            Core.Logger.error(`Repository mutate failed: ${endpoint} - ${error.message}`);
            Core.Event.emit(REPOSITORY_EVENTS.ERROR, { type: 'mutate', endpoint, error });
            throw error;
        }
    }
}