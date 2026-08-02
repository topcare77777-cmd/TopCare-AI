/**
 * TOPCARE AI PLATFORM V2 — SAFETY DTO FACTORY
 * Path: assets/js/core/safety/safety.dto.js
 */

import { SAFETY_SCHEMA_VERSION, RISK_LEVELS, SAFETY_CATEGORIES, SAFETY_ACTIONS, SAFETY_POLICY_PRIORITIES } from './risk.catalog.js';
import TimeProvider from '../time/time.provider.js';
import { deepFreezeDTO } from '../utils/dto.js';

export function createRiskFlagsDTO({
    highestRisk = RISK_LEVELS.NONE,
    matchedCategories = [],
    matchedSignals = [],
    requiresDisclaimer = false,
    requiresBlock = false
}) {
    return deepFreezeDTO({
        schemaVersion: SAFETY_SCHEMA_VERSION,
        highestRisk: typeof highestRisk === 'number' ? highestRisk : RISK_LEVELS.NONE,
        matchedCategories: Object.freeze([...matchedCategories]),
        matchedSignals: Object.freeze([...matchedSignals]),
        requiresDisclaimer: Boolean(requiresDisclaimer),
        requiresBlock: Boolean(requiresBlock)
    });
}

export function createSafetyPolicyDTO({
    policyId,
    category = SAFETY_CATEGORIES.GENERAL,
    riskLevel = RISK_LEVELS.LOW,
    priorityKey = 'NORMAL',
    enabled = true,
    keywords = [],
    patterns = [],
    action = SAFETY_ACTIONS.DISCLAIMER,
    disclaimerRef = null,
    metadata = {}
}) {
    if (!policyId || typeof policyId !== 'string') {
        throw new Error('[SafetyDTO] Policy ID is required and must be a string.');
    }

    return deepFreezeDTO({
        schemaVersion: SAFETY_SCHEMA_VERSION,
        policyId: String(policyId).toLowerCase().trim(),
        category: String(category).toUpperCase().trim(),
        riskLevel: typeof riskLevel === 'number' ? riskLevel : RISK_LEVELS.LOW,
        priorityKey: String(priorityKey).toUpperCase().trim(),
        priorityWeight: SAFETY_POLICY_PRIORITIES[String(priorityKey).toUpperCase()] || SAFETY_POLICY_PRIORITIES.NORMAL,
        enabled: Boolean(enabled),
        keywords: Object.freeze([...keywords]),
        patterns: Object.freeze([...patterns]),
        action: String(action).toUpperCase().trim(),
        disclaimerRef: disclaimerRef ? String(disclaimerRef) : null,
        metadata: deepFreezeDTO({
            description: metadata.description || 'No description provided',
            author: metadata.author || 'Safety Governance',
            version: metadata.version || '1.0.0'
        })
    });
}

export function createSafetyExplanationDTO({
    explanationId,
    matchedPolicies = [],
    riskFactors = [],
    appliedPolicies = [],
    disclaimerReason = null,
    blockReason = null
}) {
    return deepFreezeDTO({
        schemaVersion: SAFETY_SCHEMA_VERSION,
        explanationId: explanationId || `exp_${TimeProvider.now().toString(36)}`,
        matchedPolicies: Object.freeze([...matchedPolicies]),
        riskFactors: Object.freeze([...riskFactors]),
        appliedPolicies: Object.freeze([...appliedPolicies]),
        disclaimerReason: disclaimerReason ? String(disclaimerReason) : null,
        blockReason: blockReason ? String(blockReason) : null
    });
}

export function createSafetyDecisionDTO({
    decisionId,
    riskLevel = RISK_LEVELS.NONE,
    categories = [],
    allowed = true,
    blocked = false,
    requiresDisclaimer = false,
    policyIds = [],
    disclaimers = [],
    explanationId = null
}) {
    return deepFreezeDTO({
        schemaVersion: SAFETY_SCHEMA_VERSION,
        decisionId: decisionId || `sec_${TimeProvider.now().toString(36)}`,
        riskLevel: typeof riskLevel === 'number' ? riskLevel : RISK_LEVELS.NONE,
        categories: Object.freeze([...categories]),
        allowed: Boolean(allowed),
        blocked: Boolean(blocked),
        requiresDisclaimer: Boolean(requiresDisclaimer),
        policyIds: Object.freeze([...policyIds]),
        disclaimers: Object.freeze([...disclaimers]),
        explanationId: explanationId ? String(explanationId) : null,
        evaluatedAt: TimeProvider.iso()
    });
}
