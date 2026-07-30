/**
 * file: assets/js/repository/repository.service.js
 */

import { RepositoryBase } from './repository.base.js';
import { RepositoryManager } from './repository.manager.js';

const engine = RepositoryManager.initialize(new RepositoryBase());

export const Repository = Object.freeze({
    async query(endpoint, options) {
        return await engine.query(endpoint, options);
    },
    async mutate(endpoint, data, options) {
        return await engine.mutate(endpoint, data, options);
    },
    setProvider(provider) {
        engine.setProvider(provider);
        return this;
    }
});