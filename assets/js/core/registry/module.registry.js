/**
 * TOPCARE CORE RUNTIME (TCR) — MODULE.REGISTRY.JS
 * Specialized Registry strictly for Modules.
 */

import { RegistryBase } from './registry.base.js';
import { RegistryError } from './registry.errors.js';

export class ModuleRegistry extends RegistryBase {
    constructor() {
        super('ModuleRegistry');
    }

    register(name, moduleInstance) {
        if (!moduleInstance) {
            return { success: false, error: new RegistryError(`Module "${name}" cannot be null/undefined.`, this.registryName) };
        }
        return super.register(name, moduleInstance);
    }
}