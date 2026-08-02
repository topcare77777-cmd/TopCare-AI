/**
 * TOPCARE AI PLATFORM V2 — SAFETY VALIDATOR & NORMALIZER
 * Path: assets/js/core/safety/safety.validator.js & safety.normalizer.js
 */

import { RISK_LEVELS, SAFETY_CATEGORIES, SAFETY_ACTIONS, SAFETY_POLICY_PRIORITIES } from './risk.catalog.js';
import { deepFreezeDTO } from '../utils/dto.js';

export const SafetyValidator = Object.freeze({
    validate(policyDTO) {
        if (!policyDTO || typeof policyDTO !== 'object') {
            throw new Error('[SafetyValidator] Target must be a valid SafetyPolicyDTO object.');
        }
        if (!policyDTO.policyId || typeof policyDTO.policyId !== 'string') {
            throw new Error('[SafetyValidator] SafetyPolicyDTO must contain a non-empty policyId.');
        }
        if (!Object.values(SAFETY_CATEGORIES).includes(policyDTO.category)) {
            throw new Error(`[SafetyValidator] Uncataloged category: "${policyDTO.category}".`);
        }
        if (!Object.values(SAFETY_ACTIONS).includes(policyDTO.action)) {
            throw new Error(`[SafetyValidator] Uncataloged action: "${policyDTO.action}".`);
        }
        if (!Object.values(RISK_LEVELS).includes(policyDTO.riskLevel)) {
            throw new Error(`[SafetyValidator] Invalid riskLevel: "${policyDTO.riskLevel}".`);
        }
        return true;
    }
});

const CATEGORY_ALIASES = Object.freeze({
    'SELFHARM': SAFETY_CATEGORIES.SELF_HARM,
    'MED': SAFETY_CATEGORIES.MEDICAL,
    'FIN': SAFETY_CATEGORIES.FINANCIAL
});

export const SafetyNormalizer = Object.freeze({
    normalize(policyDTO) {
        if (!policyDTO || typeof policyDTO !== 'object') {
            throw new Error('[SafetyNormalizer] Cannot normalize invalid SafetyPolicyDTO.');
        }
        const canonicalCategory = CATEGORY_ALIASES[policyDTO.category] || policyDTO.category;
        const numericPriority = SAFETY_POLICY_PRIORITIES[policyDTO.priorityKey] || SAFETY_POLICY_PRIORITIES.NORMAL;

        return deepFreezeDTO({
            schemaVersion: policyDTO.schemaVersion,
            policyId: policyDTO.policyId,
            canonicalCategory,
            riskLevel: policyDTO.riskLevel,
            numericPriority,
            enabled: policyDTO.enabled,
            action: policyDTO.action,
            disclaimerRef: policyDTO.disclaimerRef,
            keywords: Object.freeze(policyDTO.keywords.map(k => String(k).toLowerCase().trim())),
            patterns: Object.freeze(policyDTO.patterns.map(p => String(p).trim())),
            metadata: policyDTO.metadata
        });
    }
});
