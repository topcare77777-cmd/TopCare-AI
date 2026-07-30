/**
 * TOPCARE CORE RUNTIME (TCR) — SERVICE.REGISTRY.JS
 * Specialized Registry strictly for Services.
 */

import { RegistryBase } from './registry.base.js';
import { RegistryError } from './registry.errors.js';

export class ServiceRegistry extends RegistryBase {
    constructor() {
        super('ServiceRegistry');
    }

    register(name, serviceInstance) {
        if (!serviceInstance) {
            return { success: false, error: new RegistryError(`Service "${name}" cannot be null/undefined.`, this.registryName) };
        }
        return super.register(name, serviceInstance);
    }
}