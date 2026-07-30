/**
 * TOPCARE CORE RUNTIME (TCR) — REGISTRY.BASE.JS
 * Pure storage engine using Map(). Free of try...catch bloat, returning standard Result objects.
 */

import { RegistryInterface } from './registry.interface.js';
import { RegistryKeyError, RegistryItemError, RegistryError } from './registry.errors.js';

export class RegistryBase extends RegistryInterface {
    constructor(registryName = 'BaseRegistry') {
        super();
        this.registryName = registryName;
        this.items = new Map();
    }

    register(key, item) {
        if (!key || (typeof key !== 'string' && typeof key !== 'number')) {
            return { success: false, error: new RegistryKeyError(key, this.registryName) };
        }
        if (item === undefined || item === null) {
            return { success: false, error: new RegistryItemError(key, this.registryName) };
        }

        const isOverwrite = this.items.has(key);
        this.items.set(key, item);

        return {
            success: true,
            action: isOverwrite ? 'overwritten' : 'registered',
            key,
            item
        };
    }

    unregister(key) {
        return this.remove(key);
    }

    get(key) {
        return this.items.get(key) || null;
    }

    has(key) {
        return this.items.has(key);
    }

    remove(key) {
        if (!this.items.has(key)) {
            return { success: false, error: new RegistryError(`Key not found: "${key}"`, this.registryName) };
        }
        const item = this.items.get(key);
        this.items.delete(key);
        return { success: true, action: 'removed', key, item };
    }

    clear() {
        const count = this.items.size;
        this.items.clear();
        return { success: true, action: 'cleared', count };
    }

    keys() { return Array.from(this.items.keys()); }
    values() { return Array.from(this.items.values()); }
    entries() { return Array.from(this.items.entries()); }
    size() { return this.items.size; }
}