/**
 * TOPCARE CORE RUNTIME (TCR) — REGISTRY.ERRORS.JS
 * Structured Error Definitions for Registry Operations.
 */

export class RegistryError extends Error {
    constructor(message, registryName = 'Registry') {
        super(`[${registryName}] ${message}`);
        this.name = 'RegistryError';
    }
}

export class RegistryKeyError extends RegistryError {
    constructor(key, registryName) {
        super(`Invalid or empty registration key provided: "${String(key)}"`, registryName);
        this.name = 'RegistryKeyError';
    }
}

export class RegistryItemError extends RegistryError {
    constructor(key, registryName) {
        super(`Item registered under key "${String(key)}" cannot be null or undefined.`, registryName);
        this.name = 'RegistryItemError';
    }
}