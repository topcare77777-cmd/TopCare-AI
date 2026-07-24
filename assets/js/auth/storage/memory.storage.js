/**
 * TopCare AI Platform V2.0.0
 * Memory Storage Implementation for Testing
 * Path: assets/js/auth/storage/memory.storage.js
 */

class MemoryStorage extends AuthStorageInterface {
    constructor(config) {
        super();
        this.config = config || {};
        this.prefix = this.config.STORAGE_PREFIX || "topcare_auth_";
        this.store = new Map();
    }

    setItem(key, value) {
        try {
            this.store.set(this.prefix + key, JSON.stringify(value));
            return true;
        } catch (e) {
            return false;
        }
    }

    getItem(key) {
        try {
            const item = this.store.get(this.prefix + key);
            return item ? JSON.parse(item) : null;
        } catch (e) {
            return null;
        }
    }

    removeItem(key) {
        try {
            this.store.delete(this.prefix + key);
            return true;
        } catch (e) {
            return false;
        }
    }

    clear() {
        try {
            for (const k of this.store.keys()) {
                if (k.startsWith(this.prefix)) this.store.delete(k);
            }
            return true;
        } catch (e) {
            return false;
        }
    }

    has(key) {
        return this.store.has(this.prefix + key);
    }

    keys() {
        const found = [];
        for (const k of this.store.keys()) {
            if (k.startsWith(this.prefix)) {
                found.push(k.substring(this.prefix.length));
            }
        }
        return found;
    }

    size() {
        return this.keys().length;
    }
}