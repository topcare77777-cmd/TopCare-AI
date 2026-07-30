/**
 * TOPCARE CORE RUNTIME (TCR) — REGISTRY INDEX.JS
 * Single Entry Point (SSOT) Public Export for Registry Subsystem.
 */

export { RegistryInterface } from './registry.interface.js';
export { RegistryBase } from './registry.base.js';
export { REGISTRY_TYPES, REGISTRY_ACTIONS } from './registry.types.js';
export { RegistryError, RegistryKeyError, RegistryItemError } from './registry.errors.js';
export { ComponentRegistry } from './component.registry.js';
export { ServiceRegistry } from './service.registry.js';
export { PageRegistry } from './page.registry.js';
export { ModuleRegistry } from './module.registry.js';
export { Registry } from './registry.service.js';