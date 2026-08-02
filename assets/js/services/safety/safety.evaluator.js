/**
 * TOPCARE AI PLATFORM V2 — PURE SAFETY EVALUATOR ENGINE
 * Path: assets/js/services/safety/safety.evaluator.js
 * Status: ACTIVE (BUILD AC-021 Phase 2 - LOCKED GOLDEN BASELINE)
 * Role: Evaluates Normalized Safety Policies Against Message Text
 */

import { RISK_LEVELS, SAFETY_ACTIONS } from '../../core/safety/risk.catalog.js';
import { DISCLAIMER_CATALOG } from '../../core/safety/disclaimer.catalog.js';
import { createSafetyDecisionDTO, createSafetyExplanationDTO, createRiskFlagsDTO } from '../../core/safety/safety.dto.js';
import { deepFreezeDTO } from '../../core/utils/dto.js';

export const SafetyEvaluator = Object.freeze({
    /**
     * Evaluates normalized policies against text.
     * Deterministic Sorting: numericPriority DESC -> canonicalCategory ASC -> policyId ASC
     *
     * @param {string} rawText
     * @param {Array<Object>} normalizedPolicies
     * @returns {Object} Composite Result { decisionDTO, explanationDTO, riskFlagsDTO }
     */
    evaluateText(rawText = '', normalizedPolicies = []) {
        const textLower = String(rawText).toLowerCase().trim();
        const activePolicies = normalizedPolicies.filter(p => p && p.enabled);

        // Deterministic 3-Tier Sorting
        const sortedPolicies = [...activePolicies].sort((a, b) => {
            if (b.numericPriority !== a.numericPriority) return b.numericPriority - a.numericPriority;
            if (a.canonicalCategory !== b.canonicalCategory) return a.canonicalCategory.localeCompare(b.canonicalCategory);
            return a.policyId.localeCompare(b.policyId);
        });

        const matchedPolicies = [];
        const matchedCategories = new Set();
        const appliedDisclaimers = new Set();
        let highestRisk = RISK_LEVELS.NONE;
        let isBlocked = false;
        let requiresDisclaimer = false;
        let blockReason = null;

        for (const policy of sortedPolicies) {
            let matched = false;

            // Keyword Matching
            for (const kw of policy.keywords) {
                if (kw && textLower.includes(kw)) {
                    matched = true;
                    break;
                }
            }

            if (matched) {
                matchedPolicies.push(policy.policyId);
                matchedCategories.add(policy.canonicalCategory);
                if (policy.riskLevel > highestRisk) highestRisk = policy.riskLevel;

                if (policy.action === SAFETY_ACTIONS.BLOCK) {
                    isBlocked = true;
                    blockReason = `Triggered critical safety block policy: ${policy.policyId}`;
                } else if (policy.action === SAFETY_ACTIONS.DISCLAIMER) {
                    requiresDisclaimer = true;
                    if (policy.disclaimerRef && DISCLAIMER_CATALOG[policy.disclaimerRef]) {
                        appliedDisclaimers.add(DISCLAIMER_CATALOG[policy.disclaimerRef].text);
                    }
                }
            }
        }

        // Create Explanation DTO
        const explanationDTO = createSafetyExplanationDTO({
            matchedPolicies,
            riskFactors: Array.from(matchedCategories),
            appliedPolicies: matchedPolicies,
            disclaimerReason: requiresDisclaimer ? 'Triggered safety notice disclaimers.' : null,
            blockReason
        });

        // Create Decision DTO
        const decisionDTO = createSafetyDecisionDTO({
            riskLevel: highestRisk,
            categories: Array.from(matchedCategories),
            allowed: !isBlocked,
            blocked: isBlocked,
            requiresDisclaimer,
            policyIds: matchedPolicies,
            disclaimers: Array.from(appliedDisclaimers),
            explanationId: explanationDTO.explanationId
        });

        // Create Generic RiskFlags DTO
        const riskFlagsDTO = createRiskFlagsDTO({
            highestRisk,
            matchedCategories: Array.from(matchedCategories),
            matchedSignals: matchedPolicies,
            requiresDisclaimer,
            requiresBlock: isBlocked
        });

        return deepFreezeDTO({
            decisionDTO,
            explanationDTO,
            riskFlagsDTO
        });
    }
});

export default SafetyEvaluator;
