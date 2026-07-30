/**
 * TOPCARE CORE RUNTIME (TCR) — PAGE.REGISTRY.JS
 * Specialized Registry strictly for Pages.
 */

import { RegistryBase } from './registry.base.js';
import { RegistryError } from './registry.errors.js';

export class PageRegistry extends RegistryBase {
    constructor() {
        super('PageRegistry');
    }

    register(path, pageModule) {
        if (!pageModule) {
            return { success: false, error: new RegistryError(`Page module for path "${path}" cannot be null/undefined.`, this.registryName) };
        }
        return super.register(path, pageModule);
    }
}