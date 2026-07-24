/**
 * TopCare AI Platform V2.0.0
 * Provider-Based TransportFactory supporting pluggable provider registrations (OCP compliant)
 * Path: assets/js/auth/events/transport/factory/transport.factory.js
 */

class TransportProviderInterface {
    create(connectionOptions, logger, options) { throw new Error("Not implemented"); }
}

class TransportFactory {
    constructor(registry, logger) {
        this.registry = registry;
        this.logger = logger;
        this._providers = new Map();
    }

    registerProvider(name, provider) {
        if (!(provider instanceof TransportProviderInterface) && typeof provider.create !== 'function') {
            throw new ConfigurationException("Transport provider must implement create method.");
        }
        this._providers.set(name.toLowerCase(), provider);
    }

    create(name, connectionOptions, logger = this.logger, options = {}) {
        const provider = this._providers.get(name.toLowerCase());
        if (!provider) {
            throw new ConfigurationException(`No transport provider registered for name '${name}'.`);
        }
        const adapter = provider.create(connectionOptions, logger, options);
        this.registry.register(name, adapter);
        return adapter;
    }
}