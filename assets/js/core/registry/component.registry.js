/**
 * TOPCARE CORE RUNTIME (TCR) — COMPONENT.REGISTRY.JS
 * Specialized Registry strictly for UI Components.
 */

import { RegistryBase } from './registry.base.js';
import { RegistryError } from './registry.errors.js';

export class ComponentRegistry extends RegistryBase {
    constructor() {
        super('ComponentRegistry');
    }

    register(name, componentClass) {
        if (typeof componentClass !== 'function' && typeof componentClass !== 'object') {
            return { success: false, error: new RegistryError(`Component "${name}" must be a valid class or factory object.`, this.registryName) };
        }
        return super.register(name, componentClass);
    }
}