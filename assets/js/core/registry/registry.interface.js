/**
 * TOPCARE CORE RUNTIME (TCR) — REGISTRY.INTERFACE.JS
 * Strict Contract Interface ensuring API consistency across all registries.
 */

export class RegistryInterface {
    register(key, item) { throw new Error('Method "register()" must be implemented.'); }
    unregister(key) { throw new Error('Method "unregister()" must be implemented.'); }
    get(key) { throw new Error('Method "get()" must be implemented.'); }
    has(key) { throw new Error('Method "has()" must be implemented.'); }
    remove(key) { throw new Error('Method "remove()" must be implemented.'); }
    clear() { throw new Error('Method "clear()" must be implemented.'); }
    keys() { throw new Error('Method "keys()" must be implemented.'); }
    values() { throw new Error('Method "values()" must be implemented.'); }
    entries() { throw new Error('Method "entries()" must be implemented.'); }
    size() { throw new Error('Method "size()" must be implemented.'); }
}