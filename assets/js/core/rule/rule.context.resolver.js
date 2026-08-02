/**
 * TOPCARE AI PLATFORM V2 — RULE CONTEXT RESOLVER
 * Path: assets/js/core/rule/rule.context.resolver.js
 * Status: ACTIVE (BUILD AC-020 Phase 2 - LOCKED GOLDEN BASELINE)
 * Role: Isolated Canonical Field Value Resolver for LayeredContextDTO
 */

export const ContextResolver = Object.freeze({
    /**
     * Resolves value from LayeredContextDTO using canonical path string.
     * @param {Object} contextDTO - Standard LayeredContextDTO.
     * @param {string} canonicalField - Dot-notated path string (e.g., 'personalityProfile.primaryType').
     * @returns {*} Resolved value or null if undefined.
     */
    resolve(contextDTO = {}, canonicalField = '') {
        if (!canonicalField || typeof canonicalField !== 'string') return null;

        const pathParts = canonicalField.split('.');
        let current = contextDTO;

        for (const part of pathParts) {
            if (current === null || current === undefined || typeof current !== 'object') {
                return null;
            }
            current = current[part];
        }

        return current !== undefined ? current : null;
    }
});

export default ContextResolver;
