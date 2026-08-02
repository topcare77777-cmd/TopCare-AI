/**
 * TOPCARE AI PLATFORM V2 — CONTEXT PROVIDER CONTRACT INTERFACE
 * Path: assets/js/core/context/context.provider.interface.js
 * Status: ACTIVE (BUILD AC-023 - LOCKED GOLDEN BASELINE)
 * Role: Defines Contract Interface for Isolated Context Layer Providers
 */

export const ContextProviderInterface = Object.freeze({
    /**
     * Validates that a candidate provider object satisfies the interface contract.
     * @param {Object} providerCandidate
     * @returns {boolean} True if compliant.
     */
    validateContract(providerCandidate) {
        if (!providerCandidate || typeof providerCandidate !== 'object') {
            throw new Error('[ContextProviderInterface] Provider candidate must be a non-null object.');
        }
        if (!providerCandidate.key || typeof providerCandidate.key !== 'string') {
            throw new Error('[ContextProviderInterface] Provider candidate must specify a non-empty string "key".');
        }
        if (typeof providerCandidate.provideContext !== 'function') {
            throw new Error(`[ContextProviderInterface] Provider "${providerCandidate.key}" must implement provideContext().`);
        }
        return true;
    }
});

export default ContextProviderInterface;
