/**
 * TOPCARE AI PLATFORM V2 — SAFETY NORMALIZER
 * Path: assets/js/core/safety/safety.normalizer.js
 * Status: ACTIVE (BUILD AC-021 Phase 1 - LOCKED GOLDEN BASELINE)
 * Role: Pre-Evaluation Normalization of SafetyPolicyDTO into Canonical Internal Form
 */

import { SAFETY_POLICY_PRIORITIES } from './risk.catalog.js';
import { deepFreezeDTO } from '../utils/dto.js';

export const SafetyNormalizer = Object.freeze({
    /**
     * Normalizes a validated SafetyPolicyDTO for evaluation in Phase 2.
     * @param {Object} policyDTO
     * @returns {Object} Deep-frozen Normalized SafetyPolicyDTO.
     */
    normalize(policyDTO) {
        if (!policyDTO || typeof policyDTO !== 'object') {
            throw new Error('[SafetyNormalizer] Cannot normalize invalid SafetyPolicyDTO.');
        }

        const numericPriority = SAFETY_POLICY_PRIORITIES[policyDTO.priorityKey] || SAFETY_POLICY_PRIORITIES.NORMAL;

        const normalizedKeywords = policyDTO.keywords.map(k => String(k).toLowerCase().trim());
        const normalizedPatterns = policyDTO.patterns.map(p => String(p).trim());

        return deepFreezeDTO({
            schemaVersion: policyDTO.schemaVersion,
            policyId: policyDTO.policyId,
            category: policyDTO.category,
            riskLevel: policyDTO.riskLevel,
            numericPriority,
            enabled: policyDTO.enabled,
            action: policyDTO.action,
            disclaimerRef: policyDTO.disclaimerRef,
            keywords: Object.freeze(normalizedKeywords),
            patterns: Object.freeze(normalizedPatterns),
            metadata: policyDTO.metadata
        });
    }
});

export default SafetyNormalizer;
