/**
 * -----------------------------------------------------------------
 * TOPCARE AI PLATFORM - ARCHITECTURE METADATA
 * -----------------------------------------------------------------
 * Layer        : Layer 5 - Service (IndexedDB Storage Adapter Implementation)
 * Status       : ACTIVE
 * Version      : 1.0.0
 * Architecture : Development Constitution v1.1
 * Owner        : Coach Intelligence Team
 * Created      : Sprint 50A.2
 * 
 * Description  : Concrete storage adapter implementing MemoryAdapter interface.
 *                Uses browser IndexedDB as primary persistence store with 
 *                safe fallback to LocalStorage if IndexedDB is unavailable or restricted.
 * -----------------------------------------------------------------
 */

import MemoryAdapter from './memory.adapter.js';

/**
 * Storage Configuration Constants.
 * @readonly
 */
const STORAGE_CONFIG = Object.freeze({
    DB_NAME: 'TopCareCoachDB',
    DB_VERSION: 1,
    STORE_NAME: 'memory_snapshots',
    RECORD_KEY: 'active_session_snapshot',
    FALLBACK_KEY: 'topcare_coach_memory_fallback'
});

/**
 * Concrete IndexedDB & LocalStorage Memory Storage Adapter.
 * Adheres strictly to MemoryAdapter interface contract.
 */
const MemoryStorage = (() => {

    /**
     * Opens or initializes the browser IndexedDB connection.
     * 
     * @returns {Promise<IDBDatabase|null>} Resolves to IDBDatabase instance or null if unsupported.
     * @private
     */
    function openDatabase() {
        return new Promise((resolve) => {
            if (typeof indexedDB === 'undefined') {
                resolve(null);
                return;
            }

            try {
                const request = indexedDB.open(STORAGE_CONFIG.DB_NAME, STORAGE_CONFIG.DB_VERSION);

                request.onerror = (event) => {
                    console.warn('[MemoryStorage] IndexedDB open error, falling back:', event.target.error);
                    resolve(null);
                };

                request.onupgradeneeded = (event) => {
                    const db = event.target.result;
                    if (!db.objectStoreNames.contains(STORAGE_CONFIG.STORE_NAME)) {
                        db.createObjectStore(STORAGE_CONFIG.STORE_NAME);
                    }
                };

                request.onsuccess = (event) => {
                    resolve(event.target.result);
                };
            } catch (err) {
                console.warn('[MemoryStorage] IndexedDB initialization exception:', err);
                resolve(null);
            }
        });
    }

    /**
     * Persists a memory snapshot state.
     * Tries IndexedDB first; falls back to LocalStorage if IndexedDB fails or is unavailable.
     * 
     * @param {Object} snapshot - Immutable memory snapshot object to store.
     * @returns {Promise<boolean>} Resolves to true if successful, false otherwise.
     */
    async function save(snapshot) {
        if (!snapshot || typeof snapshot !== 'object') {
            return false;
        }

        const serialized = JSON.stringify(snapshot);

        // Try IndexedDB primary storage
        try {
            const db = await openDatabase();
            if (db) {
                const success = await new Promise((resolve) => {
                    const transaction = db.transaction(STORAGE_CONFIG.STORE_NAME, 'readwrite');
                    const store = transaction.objectStore(STORAGE_CONFIG.STORE_NAME);
                    const request = store.put(serialized, STORAGE_CONFIG.RECORD_KEY);

                    request.onsuccess = () => resolve(true);
                    request.onerror = () => resolve(false);
                });

                db.close();
                if (success) return true;
            }
        } catch (err) {
            console.warn('[MemoryStorage] IndexedDB save failed, trying fallback:', err);
        }

        // Fallback to LocalStorage
        try {
            if (typeof localStorage !== 'undefined') {
                localStorage.setItem(STORAGE_CONFIG.FALLBACK_KEY, serialized);
                return true;
            }
        } catch (err) {
            console.error('[MemoryStorage] LocalStorage fallback save also failed:', err);
        }

        return false;
    }

    /**
     * Loads a persisted memory snapshot state from storage.
     * Checks IndexedDB first; falls back to LocalStorage if needed.
     * 
     * @returns {Promise<Object|null>} Resolves to the stored snapshot object or null if not found.
     */
    async function load() {
        // Try IndexedDB primary load
        try {
            const db = await openDatabase();
            if (db) {
                const result = await new Promise((resolve) => {
                    const transaction = db.transaction(STORAGE_CONFIG.STORE_NAME, 'readonly');
                    const store = transaction.objectStore(STORAGE_CONFIG.STORE_NAME);
                    const request = store.get(STORAGE_CONFIG.RECORD_KEY);

                    request.onsuccess = () => resolve(request.result || null);
                    request.onerror = () => resolve(null);
                });

                db.close();
                if (result) {
                    return JSON.parse(result);
                }
            }
        } catch (err) {
            console.warn('[MemoryStorage] IndexedDB load failed, trying fallback:', err);
        }

        // Fallback to LocalStorage load
        try {
            if (typeof localStorage !== 'undefined') {
                const raw = localStorage.getItem(STORAGE_CONFIG.FALLBACK_KEY);
                if (raw) {
                    return JSON.parse(raw);
                }
            }
        } catch (err) {
            console.error('[MemoryStorage] LocalStorage fallback load failed:', err);
        }

        return null;
    }

    /**
     * Removes/clears the persisted memory snapshot from both IndexedDB and LocalStorage.
     * 
     * @returns {Promise<boolean>} Resolves to true if successfully removed or cleared.
     */
    async function remove() {
        let cleared = false;

        // Clear IndexedDB store record
        try {
            const db = await openDatabase();
            if (db) {
                await new Promise((resolve) => {
                    const transaction = db.transaction(STORAGE_CONFIG.STORE_NAME, 'readwrite');
                    const store = transaction.objectStore(STORAGE_CONFIG.STORE_NAME);
                    const request = store.delete(STORAGE_CONFIG.RECORD_KEY);

                    request.onsuccess = () => resolve(true);
                    request.onerror = () => resolve(false);
                });
                db.close();
                cleared = true;
            }
        } catch (err) {
            console.warn('[MemoryStorage] IndexedDB remove error:', err);
        }

        // Clear LocalStorage fallback record
        try {
            if (typeof localStorage !== 'undefined') {
                localStorage.removeItem(STORAGE_CONFIG.FALLBACK_KEY);
                cleared = true;
            }
        } catch (err) {
            console.warn('[MemoryStorage] LocalStorage remove error:', err);
        }

        return cleared;
    }

    /**
     * Checks whether a persisted memory session exists in storage.
     * 
     * @returns {Promise<boolean>} Resolves to true if valid stored data exists, false otherwise.
     */
    async function exists() {
        const snapshot = await load();
        return snapshot !== null && typeof snapshot === 'object';
    }

    return Object.freeze({
        save,
        load,
        remove,
        exists
    });
})();

export default MemoryStorage;