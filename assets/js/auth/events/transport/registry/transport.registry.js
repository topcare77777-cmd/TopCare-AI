/**
 * TopCare AI Platform V2.0.0
 * Lifecycle-Enabled TransportRegistry supporting priorities, hot-reload, health checks, and metadata
 * Path: assets/js/auth/events/transport/registry/transport.registry.js
 */

class TransportRegistryEntry {
    constructor(name, instance, metadata = {}) {
        this.name = name.toLowerCase();
        this.instance = instance;
        this.version = metadata.version || '1.0.0';
        this.priority = metadata.priority || 100;
        this.supportedChannels = metadata.supportedChannels || ['*'];
        this.healthFn = metadata.healthFn || (async () => ({ status: 'UP' }));
        this.reloadFn = metadata.reloadFn || (async () => {});
        this.disposeFn = metadata.disposeFn || (async () => { await instance.disconnect?.(); });
        if (typeof deepFreeze === 'function') deepFreeze(this);
    }

    supports(channel) {
        return this.supportedChannels.includes('*') || this.supportedChannels.includes(channel);
    }
}

class TransportRegistry {
    constructor() {
        this._entries = new Map();
    }

    register(name, instance, metadata = {}) {
        if (!name || !instance) {
            throw new ConfigurationException("Transport name and instance are required.");
        }
        const entry = new TransportRegistryEntry(name, instance, metadata);
        this._entries.set(entry.name, entry);
    }

    async unregister(name) {
        const key = name.toLowerCase();
        const entry = this._entries.get(key);
        if (entry) {
            await entry.disposeFn();
            return this._entries.delete(key);
        }
        return false;
    }

    resolve(name) {
        const entry = this._entries.get(name.toLowerCase());
        if (!entry) {
            throw new ConfigurationException(`Transport adapter '${name}' is not registered.`);
        }
        return entry.instance;
    }

    resolveBestFor(channel) {
        const matches = Array.from(this._entries.values())
            .filter(entry => entry.supports(channel))
            .sort((a, b) => a.priority - b.priority); // Lower priority number = higher precedence
        
        if (matches.length === 0) {
            throw new ConfigurationException(`No suitable transport found supporting channel '${channel}'.`);
        }
        return matches[0].instance;
    }

    async reloadAll() {
        for (const entry of this._entries.values()) {
            await entry.reloadFn();
        }
    }

    discoverNames() {
        return Array.from(this._entries.keys());
    }

    metadata(name) {
        const entry = this._entries.get(name.toLowerCase());
        if (!entry) throw new ConfigurationException(`Transport '${name}' not found.`);
        return { name: entry.name, version: entry.version, priority: entry.priority };
    }

    async disposeAll() {
        for (const entry of this._entries.values()) {
            await entry.disposeFn();
        }
        this._entries.clear();
    }
}