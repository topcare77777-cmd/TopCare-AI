/**
 * TOPCARE AI PLATFORM V2 — RULE NORMALIZER
 * Path: assets/js/core/rule/rule.normalizer.js
 * Status: ACTIVE (BUILD AC-020 Phase 1 - LOCKED GOLDEN BASELINE)
 * Role: Pre-Evaluation Normalization of RuleDTO into Internal Standard Form
 */

import { RULE_PRIORITIES } from './rule.catalog.js';
import { deepFreezeDTO } from '../utils/dto.js';

/**
 * Field Alias Dictionary for Canonical Path Alignment.
 */
const FIELD_ALIASES = Object.freeze({
    'personality.primary': 'personalityProfile.primaryType',
    'personality.type': 'personalityProfile.primaryType',
    'memory.count': 'conversationContext.historyCount',
    'intent.id': 'currentIntent.intentId'
});

export const RuleNormalizer = Object.freeze({
    /**
     * Normalizes a validated RuleDTO for optimal evaluation in Phase 2.
     * @param {Object} ruleDTO
     * @returns {Object} Deep-frozen Normalized RuleDTO.
     */
    normalize(ruleDTO) {
        if (!ruleDTO || typeof ruleDTO !== 'object') {
            throw new Error('[RuleNormalizer] Cannot normalize invalid RuleDTO.');
        }

        const numericPriority = RULE_PRIORITIES[ruleDTO.priorityKey] || RULE_PRIORITIES.NORMAL;

        const normalizedConditions = ruleDTO.conditions.map(cond => {
            const canonicalField = FIELD_ALIASES[cond.field] || cond.field;
            return Object.freeze({
                canonicalField,
                originalField: cond.field,
                operator: String(cond.operator).toUpperCase(),
                value: cond.value
            });
        });

        return deepFreezeDTO({
            ruleId: ruleDTO.ruleId,
            numericPriority,
            group: ruleDTO.group,
            enabled: ruleDTO.enabled,
            conditions: Object.freeze(normalizedConditions),
            effects: ruleDTO.effects,
            metadata: ruleDTO.metadata
        });
    }
});

export default RuleNormalizer;
