/**
 * TopCare AI Platform V2.0.0
 * ProviderRegistry class implementing Open-Closed Principle
 * Path: assets/js/auth/factories/provider.registry.js
 */

class ProviderRegistry {
    constructor() {
        this.providers = new Map();
    }

    register(type, builderFn) {
        if (!type || typeof builderFn !== 'function') {
            throw new Error("Invalid provider registration parameters.");
        }
        this.providers.set(type, builderFn);
    }

    unregister(type) {
        return this.providers.delete(type);
    }

    resolve(type) {
        if (!this.exists(type)) {
            throw new ProviderError(`Provider '${type}' is not registered.`);
        }
        const builder = this.providers.get(type);
        return builder();
    }

    exists(type) {
        return this.providers.has(type);
    }

    keys() {
        return Array.from(this.providers.keys());
    }

    clear() {
        this.providers.clear();
    }
}