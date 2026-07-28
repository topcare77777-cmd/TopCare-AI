/**
 * -----------------------------------------------------------------
 * TOPCARE AI PLATFORM - ARCHITECTURE METADATA
 * -----------------------------------------------------------------
 * Layer        : Layer 5 - Service (LLM Provider Registry)
 * Status       : ACTIVE
 * Version      : 1.0.0
 * Architecture : Development Constitution v1.1
 * Owner        : Coach Intelligence Team
 * Created      : Sprint 53A.2
 * 
 * Description  : Centralized registry catalog for LLM adapter implementations.
 *                Validates adapter contracts, manages provider registration,
 *                and exposes health/status monitoring without making external API calls.
 * -----------------------------------------------------------------
 */

import { LLMAdapterContract } from './llm.adapter.contract.js';

/**
 * Registry Schema Version.
 * @type {string}
 */
const REGISTRY_SCHEMA_VERSION = '1.0.0';

/**
 * Coach LLM Provider Registry Singleton Service.
 * Manages the catalog of available LLM provider adapters.
 */
const CoachLLMProviderRegistry = (() => {

    /**
     * Internal map storing registered adapter instances indexed by provider ID.
     * @type {Map<string, Object>}
     */
    const registeredAdapters = new Map();

    /**
     * Normalizes a provider identifier string.
     * @param {string} providerId - Raw provider key.
     * @returns {string} Cleaned key string.
     * @private
     */
    function sanitizeId(providerId) {
        return typeof providerId === 'string' ? providerId.trim().toLowerCase() : '';
    }

    /**
     * Validates if a given object conforms structurally to the LLMAdapterContract signature.
     * 
     * @param {Object} adapter - Candidate adapter object.
     * @returns {boolean} True if valid, false otherwise.
     * @private
     */
    function validateContract(adapter) {
        if (!adapter || typeof adapter !== 'object') {
            return false;
        }

        // Verify mandatory contract methods exist and are functions
        const requiredMethods = ['getId', 'getMetadata', 'initialize', 'complete', 'stream', 'shutdown', 'getStatus'];
        for (const method of requiredMethods) {
            if (typeof adapter[method] !== 'function') {
                console.warn(`[CoachLLMProviderRegistry] Contract validation failed: Missing method "${method}".`);
                return false;
            }
        }

        return true;
    }

    /**
     * Registers a new LLM provider adapter into the catalog after structural validation.
     * 
     * @param {Object} adapter - Concrete adapter instance implementing LLMAdapterContract.
     * @returns {boolean} True if successfully registered, false otherwise.
     */
    function register(adapter) {
        if (!validateContract(adapter)) {
            console.error('[CoachLLMProviderRegistry] Attempted to register invalid adapter contract.');
            return false;
        }

        try {
            const providerId = sanitizeId(adapter.getId());
            if (!providerId) {
                console.error('[CoachLLMProviderRegistry] Adapter returned empty provider ID.');
                return false;
            }

            registeredAdapters.set(providerId, adapter);
            return true;
        } catch (err) {
            console.error('[CoachLLMProviderRegistry] Exception during adapter registration:', err);
            return false;
        }
    }

    /**
     * Retrieves a registered adapter instance by provider identifier.
     * 
     * @param {string} providerId - Unique provider identifier.
     * @returns {Object|null} Adapter instance or null if not found.
     */
    function get(providerId) {
        const id = sanitizeId(providerId);
        return registeredAdapters.has(id) ? registeredAdapters.get(id) : null;
    }

    /**
     * Checks whether a specific provider adapter is registered in the catalog.
     * 
     * @param {string} providerId - Unique provider identifier to verify.
     * @returns {boolean} True if registered, false otherwise.
     */
    function exists(providerId) {
        const id = sanitizeId(providerId);
        return registeredAdapters.has(id);
    }

    /**
     * Returns a list of summary status profiles for all registered adapters.
     * 
     * @returns {Array<Object>} List of immutable adapter status summaries.
     */
    function list() {
        const listCollection = [];
        for (const [id, adapter] of registeredAdapters.entries()) {
            let status = { status: 'unknown' };
            let metadata = { name: id, version: '0.0.0' };

            try {
                if (typeof adapter.getStatus === 'function') {
                    status = adapter.getStatus();
                }
                if (typeof adapter.getMetadata === 'function') {
                    metadata = adapter.getMetadata();
                }
            } catch (_) {
                // Ignore retrieval issues during status listing
            }

            listCollection.push(Object.freeze({
                providerId: id,
                name: metadata.name || id,
                version: metadata.version || '1.0.0',
                status: status.status || 'registered',
                active: !!status.active
            }));
        }
        return Object.freeze(listCollection);
    }

    /**
     * Unregisters and removes an adapter from the registry catalog.
     * 
     * @param {string} providerId - Unique provider identifier to remove.
     * @returns {boolean} True if successfully removed, false if not found.
     */
    function remove(providerId) {
        const id = sanitizeId(providerId);
        return registeredAdapters.delete(id);
    }

    /**
     * Returns operational status and health statistics of the registry service.
     * 
     * @returns {Object} Immutable status snapshot.
     */
    function getStatus() {
        return Object.freeze({
            version: REGISTRY_SCHEMA_VERSION,
            totalRegisteredProviders: registeredAdapters.size,
            providerIds: Object.freeze(Array.from(registeredAdapters.keys()))
        });
    }

    return Object.freeze({
        register,
        get,
        exists,
        list,
        remove,
        getStatus
    });
})();

export default CoachLLMProviderRegistry;