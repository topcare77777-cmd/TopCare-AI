/**
 * TOPCARE AI PLATFORM V2 — ISOLATED LOCAL STORAGE PROVIDER
 * Path: assets/js/services/persistence/providers/local.storage.provider.js
 * Status: ACTIVE (HARDENED - LOCKED GOLDEN BASELINE)
 */

export class LocalStorageStorageProvider {
    constructor(prefix = 'topcare_v2_') {
        this.prefix = String(prefix);
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

    /**
     * Safely clears ONLY keys starting with topcare_v2_ prefix.
     * Prevents wiping other application data in same browser origin.
     */
    async clear() {
        const keysToRemove = [];
        for (let i = 0; i < localStorage.length; i++) {
            const k = localStorage.key(i);
            if (k && k.startsWith(this.prefix)) {
                keysToRemove.push(k);
            }
        }
        for (const k of keysToRemove) {
            localStorage.removeItem(k);
        }
        return true;
    }
}
