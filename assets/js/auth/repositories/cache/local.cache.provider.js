/**
 * TopCare AI Platform V2.0.0
 * Local Cache Provider implementation wrapping Storage abstraction
 * Path: assets/js/auth/repositories/cache/local.cache.provider.js
 */

class LocalCacheProvider extends CacheProviderInterface {
    constructor(storage) {
        super();
        this.storage = storage;
    }

    get(key) {
        return this.storage.getItem(key);
    }

    set(key, value) {
        return this.storage.setItem(key, value);
    }

    remove(key) {
        return this.storage.removeItem(key);
    }

    clear() {
        return this.storage.clear();
    }
}