/**
 * TopCare AI Platform V2.0.0
 * Storage Engine (Enterprise Hardened)
 * Path: assets/js/core/storage.engine.js
 */
const StorageEngine = {
    set(key, value, ttl = null, storage = localStorage) {
        try {
            const item = {
                value,
                expiry: ttl ? Date.now() + ttl : null
            };
            storage.setItem(key, JSON.stringify(item));
        } catch (error) {
            console.error('[StorageEngine] Set failed:', error);
        }
    },

    get(key, storage = localStorage) {
        try {
            const itemStr = storage.getItem(key);
            if (!itemStr) return null;
            const item = JSON.parse(itemStr);
            if (item.expiry && Date.now() > item.expiry) {
                storage.removeItem(key);
                return null;
            }
            return item.value;
        } catch (error) {
            console.error('[StorageEngine] Get failed:', error);
            return null;
        }
    },

    remove(key, storage = localStorage) {
        try {
            storage.removeItem(key);
        } catch (error) {
            console.error('[StorageEngine] Remove failed:', error);
        }
    },

    clear(storage = localStorage) {
        try {
            storage.clear();
        } catch (error) {
            console.error('[StorageEngine] Clear failed:', error);
        }
    }
};

export default StorageEngine;