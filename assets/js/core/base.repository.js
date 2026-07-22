/**
 * TopCare AI Platform V2.0.0
 * Base Repository
 * Path: assets/js/core/base.repository.js
 */
import ApiEngine from './api.engine.js';
import CacheEngine from './cache.engine.js';
import RequestQueue from './request.queue.js';
import Logger from './logger.js';

export default class BaseRepository {
    constructor(endpoint) {
        this.endpoint = endpoint;
    }

    async fetch(id = '', useCache = true) {
        const cacheKey = `${this.endpoint}_${id}`;
        if (useCache) {
            const cached = CacheEngine.get(cacheKey);
            if (cached) return cached;
        }

        return new Promise((resolve, reject) => {
            RequestQueue.add(async () => {
                try {
                    const data = await ApiEngine.get(`${this.endpoint}/${id}`);
                    if (useCache) CacheEngine.set(cacheKey, data);
                    resolve(data);
                } catch (error) {
                    Logger.error(`[BaseRepository] Fetch failed for ${this.endpoint}`, error);
                    reject(error);
                }
            });
        });
    }

    async create(payload) {
        return await ApiEngine.post(this.endpoint, payload);
    }

    async update(id, payload) {
        return await ApiEngine.put(`${this.endpoint}/${id}`, payload);
    }

    async delete(id) {
        return await ApiEngine.delete(`${this.endpoint}/${id}`);
    }
}