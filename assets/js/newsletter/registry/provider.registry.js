/**
 * TOPCARE AI PLATFORM V2 — NEWSLETTER PROVIDER REGISTRY
 * Path: assets/js/newsletter/registry/provider.registry.js
 * Architecture: Registry Pattern / Open-Closed Principle
 * Status: APPROVED & LOCKED (BUILD 129.3)
 * SRP: Dynamic Registration and Resolution of Newsletter Provider Adapters.
 */

export class ProviderRegistry {
    constructor() {
        this._providers = new Map();
    }

    /**
     * Registers a new provider adapter constructor.
     * @param {string} key 
     * @param {Function} adapterClass 
     */
    register(key, adapterClass) {
        if (!key || typeof adapterClass !== 'function') {
            throw new Error(`[ProviderRegistry] Invalid registration for key: ${key}`);
        }
        this._providers.set(key.toLowerCase(), adapterClass);
    }

    /**
     * Resolves and instantiates a provider adapter by key.
     * @param {string} key 
     * @returns {import('../contracts/newsletter.provider.js').INewsletterProvider}
     */
    resolve(key) {
        const targetKey = (key || '').toLowerCase();
        const AdapterClass = this._providers.get(targetKey);

        if (!AdapterClass) {
            throw new Error(`[ProviderRegistry] No registered adapter found for provider: "${key}"`);
        }

        return new AdapterClass();
    }

    /**
     * Checks if a provider key is registered.
     * @param {string} key 
     * @returns {boolean}
     */
    has(key) {
        return this._providers.has((key || '').toLowerCase());
    }

    clear() {
        this._providers.clear();
    }
}

export const providerRegistryInstance = new ProviderRegistry();
export default providerRegistryInstance;