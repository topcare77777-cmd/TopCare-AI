/**
 * TOPCARE AI PLATFORM V2 — PROVIDER RESOLVER
 * Path: assets/js/services/llm/provider.resolver.js
 * Role: Resolves Target Provider Based on Priority Catalog (Pure Side-Effect Free)
 */

import CoachLLMProviderRegistry from './coach.llm.provider.registry.js';

export const ProviderResolver = (() => {

    /**
     * Resolves active operational provider adapter cleanly.
     * Pure Function: Does not mutate Registry state during resolution.
     *
     * @param {string} [requestedProviderId] - Target requested provider key.
     * @returns {Object} Operational Provider Adapter implementing LLMAdapterContract.
     */
    function resolve(requestedProviderId) {
        const primaryId = typeof requestedProviderId === 'string' ? requestedProviderId.toLowerCase() : '';

        // 1. Check if explicitly requested provider exists and is active
        if (primaryId && CoachLLMProviderRegistry.exists(primaryId)) {
            const adapter = CoachLLMProviderRegistry.get(primaryId);
            if (adapter && adapter.getStatus()?.active) {
                return adapter;
            }
        }

        // 2. Read priority-sorted catalog from Registry
        const registeredList = CoachLLMProviderRegistry.list();
        const sortedProviders = [...registeredList].sort((a, b) => (a.priority || 100) - (b.priority || 100));

        for (const item of sortedProviders) {
            if (CoachLLMProviderRegistry.exists(item.providerId)) {
                const adapter = CoachLLMProviderRegistry.get(item.providerId);
                if (adapter && adapter.getStatus()?.active) {
                    return adapter;
                }
            }
        }

        // 3. Fallback to registered offline adapter if available
        if (CoachLLMProviderRegistry.exists('offline')) {
            return CoachLLMProviderRegistry.get('offline');
        }

        throw new Error('[ProviderResolver] Critical: No active LLM Provider or Offline Adapter registered.');
    }

    return Object.freeze({
        resolve
    });
})();

export default ProviderResolver;
