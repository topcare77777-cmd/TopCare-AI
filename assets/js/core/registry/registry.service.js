/**
 * TOPCARE CORE RUNTIME (TCR) — REGISTRY.SERVICE.JS
 * Immutable Facade Service for Core Registries. 
 * Fixed import bug pointing strictly to './registry.types.js'.
 */

import { ComponentRegistry } from './component.registry.js';
import { ServiceRegistry } from './service.registry.js';
import { PageRegistry } from './page.registry.js';
import { ModuleRegistry } from './module.registry.js';
import { REGISTRY_TYPES } from './registry.types.js';

class RegistryFacade {
    constructor() {
        this.registries = {
            [REGISTRY_TYPES.COMPONENT]: new ComponentRegistry(),
            [REGISTRY_TYPES.SERVICE]: new ServiceRegistry(),
            [REGISTRY_TYPES.PAGE]: new PageRegistry(),
            [REGISTRY_TYPES.MODULE]: new ModuleRegistry()
        };
    }

    registerComponent(key, component) {
        return this.registries[REGISTRY_TYPES.COMPONENT].register(key, component);
    }
    getComponent(key) { return this.registries[REGISTRY_TYPES.COMPONENT].get(key); }

    registerService(key, service) {
        return this.registries[REGISTRY_TYPES.SERVICE].register(key, service);
    }
    getService(key) { return this.registries[REGISTRY_TYPES.SERVICE].get(key); }

    registerPage(key, page) {
        return this.registries[REGISTRY_TYPES.PAGE].register(key, page);
    }
    getPage(key) { return this.registries[REGISTRY_TYPES.PAGE].get(key); }

    registerModule(key, mod) {
        return this.registries[REGISTRY_TYPES.MODULE].register(key, mod);
    }
    getModule(key) { return this.registries[REGISTRY_TYPES.MODULE].get(key); }

    clearAll() {
        Object.values(this.registries).forEach(reg => reg.clear());
        return { success: true, action: 'cleared_all' };
    }
}

export const Registry = new RegistryFacade();