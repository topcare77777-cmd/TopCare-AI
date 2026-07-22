/**
 * TopCare AI Platform V2.0.0
 * Cache Engine
 * Path: assets/js/core/cache.engine.js
 */
import Logger from './logger.js';

const CacheEngine = {
    cache: new Map(),
    maxSize: 100,

    set(key, value, ttl = 300000) {
        if (this.cache.size >= this.maxSize) {
            const oldestKey = this.cache.keys().next().value;
            this.cache.delete(oldestKey);
        }
        const expiry = Date.now() + ttl;
        this.cache.set(key, { value, expiry });
        Logger.info(`[CacheEngine] Cached key: ${key}`);
    },

    get(key) {
        const item = this.cache.get(key);
        if (!item) return null;
        if (Date.now() > item.expiry) {
            this.cache.delete(key);
            return null;
        }
        return item.value;
    },

    clear() {
        this.cache.clear();
        Logger.info("[CacheEngine] Cache cleared.");
    }
};

export default CacheEngine;