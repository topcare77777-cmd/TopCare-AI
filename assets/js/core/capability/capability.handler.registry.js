/**
 * TOPCARE AI PLATFORM V2 — CAPABILITY HANDLER REGISTRY
 * Path: assets/js/core/capability/capability.handler.registry.js
 * Status: ACTIVE (BUILD 123.1 - REVISION 2)
 * Role: Thread-safe, Singleton Registry for Capability Handler Implementations
 */

class CapabilityHandlerRegistryEngine {
    constructor() {
        if (CapabilityHandlerRegistryEngine._instance) {
            return CapabilityHandlerRegistryEngine._instance;
        }

        this._handlers = new Map();
        this._isLocked = false;

        CapabilityHandlerRegistryEngine._instance = this;
    }

    register(capabilityId, handler) {
        if (this._isLocked) {
            throw new Error(`[CapabilityHandlerRegistry] Cannot register '${capabilityId}'. Registry is locked.`);
        }

        if (!capabilityId || typeof capabilityId !== 'string') {
            throw new Error('[CapabilityHandlerRegistry] Invalid capabilityId provided for registration.');
        }

        if (!handler || (typeof handler !== 'function' && typeof handler !== 'object')) {
            throw new Error(`[CapabilityHandlerRegistry] Invalid handler provided for capabilityId '${capabilityId}'.`);
        }

        this._handlers.set(capabilityId, handler);
        return this;
    }

    get(capabilityId) {
        if (!capabilityId || typeof capabilityId !== 'string') {
            return null;
        }
        return this._handlers.get(capabilityId) || null;
    }

    has(capabilityId) {
        if (!capabilityId || typeof capabilityId !== 'string') {
            return false;
        }
        return this._handlers.has(capabilityId);
    }

    list() {
        return Array.from(this._handlers.keys());
    }

    lock() {
        this._isLocked = true;
        return this;
    }

    isLocked() {
        return this._isLocked;
    }

    clear() {
        if (this._isLocked) {
            throw new Error('[CapabilityHandlerRegistry] Cannot clear registry. Registry is locked.');
        }
        this._handlers.clear();
    }
}

export const CapabilityHandlerRegistry = new CapabilityHandlerRegistryEngine();
export default CapabilityHandlerRegistry;