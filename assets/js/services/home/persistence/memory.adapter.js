/**
 * -----------------------------------------------------------------
 * TOPCARE AI PLATFORM - ARCHITECTURE METADATA
 * -----------------------------------------------------------------
 * Layer        : Layer 5 - Service (Persistence Adapter Contract)
 * Status       : ACTIVE
 * Version      : 1.0.0
 * Architecture : Development Constitution v1.1
 * Owner        : Coach Intelligence Team
 * Created      : Sprint 50A.1
 * 
 * Description  : Pure interface contract for memory persistence adapters.
 *                Defines standardized asynchronous methods (save, load, remove, exists)
 *                without coupling to any specific storage technology (IndexedDB, LocalStorage, API).
 * -----------------------------------------------------------------
 */

/**
 * Memory Adapter Interface Contract.
 * All concrete storage implementations must adhere to this structural signature.
 */
const MemoryAdapter = Object.freeze({

    /**
     * Persists a memory snapshot state.
     * 
     * @param {Object} snapshot - Immutable memory snapshot object to store.
     * @returns {Promise<boolean>} Resolves to true if successful, false otherwise.
     */
    async save(snapshot) {
        throw new Error('[MemoryAdapter] Method "save" not implemented.');
    },

    /**
     * Loads a persisted memory snapshot state from storage.
     * 
     * @returns {Promise<Object|null>} Resolves to the stored snapshot object or null if not found.
     */
    async load() {
        throw new Error('[MemoryAdapter] Method "load" not implemented.');
    },

    /**
     * Removes/clears the persisted memory snapshot from storage.
     * 
     * @returns {Promise<boolean>} Resolves to true if successfully removed or cleared.
     */
    async remove() {
        throw new Error('[MemoryAdapter] Method "remove" not implemented.');
    },

    /**
     * Checks whether a persisted memory session exists in storage.
     * 
     * @returns {Promise<boolean>} Resolves to true if valid stored data exists, false otherwise.
     */
    async exists() {
        throw new Error('[MemoryAdapter] Method "exists" not implemented.');
    }
});

export default MemoryAdapter;