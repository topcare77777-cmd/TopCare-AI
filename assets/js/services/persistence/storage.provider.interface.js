/**
 * TOPCARE AI PLATFORM V2 — STORAGE PROVIDER INTERFACE & IMPLEMENTATIONS
 * Path: assets/js/services/persistence/storage.provider.interface.js & providers/
 * Status: ACTIVE (SPRINT I - LOCKED GOLDEN BASELINE)
 */

import { deepFreezeDTO } from '../../core/utils/dto.js';

export const StorageProviderInterface = Object.freeze({
    validateContract(provider) {
        if (!provider || typeof provider !== 'object') {
            throw new Error('[StorageProviderInterface] Provider must be an object.');
        }
        const requiredMethods = ['getItem', 'setItem', 'removeItem', 'clear'];
        for (const method of requiredMethods) {
            if (typeof provider[method] !== 'function') {
                throw new Error(`[StorageProviderInterface] Provider missing required method: "${method}"`);
            }
        }
        return true;
    }
});

// Implementation 1: LocalStorage Adapter (I-03 Compliant)
export class LocalStorageStorageProvider {
    constructor(prefix = 'topcare_v2_') {
        this.prefix = prefix;
    }

    async getItem(key) {
        const raw = localStorage.getItem(this.prefix + key);
        return raw ? JSON.parse(raw) : null;
    }

    async setItem(key, dtoValue) {
        localStorage.setItem(this.prefix + key, JSON.stringify(dtoValue));
        return true;
    }

    async removeItem(key) {
        localStorage.removeItem(this.prefix + key);
        return true;
    }

    async clear() {
        localStorage.clear();
        return true;
    }
}

// Implementation 2: In-Memory Adapter (For Headless Testing)
export class MemoryStorageProvider {
    constructor() {
        this.store = new Map();
    }

    async getItem(key) {
        return this.store.get(key) || null;
    }

    async setItem(key, dtoValue) {
        this.store.set(key, deepFreezeDTO(dtoValue));
        return true;
    }

    async removeItem(key) {
        this.store.delete(key);
        return true;
    }

    async clear() {
        this.store.clear();
        return true;
    }
}
