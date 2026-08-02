/**
 * TOPCARE AI PLATFORM V2 — PURE RULE EVALUATOR ENGINE
 * Path: assets/js/services/rule/rule.evaluator.js
 * Status: ACTIVE (BUILD AC-020 Phase 2 - LOCKED GOLDEN BASELINE)
 * Role: Evaluates Normalized Rules Against LayeredContextDTO
 */

import ContextResolver from '../../core/rule/rule.context.resolver.js';
import OperatorStrategy from '../../core/rule/rule.operator.strategy.js';
import { createRuleDecisionDTO } from '../../core/rule/rule.decision.dto.js';
import { deepFreezeDTO } from '../../core/utils/dto.js';

export const RuleEvaluator = Object.freeze({
    /**
     * Evaluates a single NormalizedRuleDTO against LayeredContextDTO.
     * Uses Short-Circuit Condition Evaluation.
     *
     * @param {Object} normalizedRuleDTO
     * @param {Object} contextDTO
     * @returns {Object} Immutable RuleDecisionDTO.
     */
    evaluateRule(normalizedRuleDTO, contextDTO) {
        if (!normalizedRuleDTO || !normalizedRuleDTO.enabled) {
            return createRuleDecisionDTO({ ruleId: normalizedRuleDTO?.ruleId || 'disabled', matched: false });
        }

        const matchedConditions = [];
        let failedCondition = null;
        let isMatch = true;

        for (const cond of normalizedRuleDTO.conditions) {
            const leftValue = ContextResolver.resolve(contextDTO, cond.canonicalField);
            const conditionPassed = OperatorStrategy.evaluate(cond.operator, leftValue, cond.value);

            if (conditionPassed) {
                matchedConditions.push({
                    canonicalField: cond.canonicalField,
                    operator: cond.operator,
                    leftValue,
                    rightValue: cond.value
                });
            } else {
                // Short-Circuit: Stop evaluating remaining conditions for this rule
                isMatch = false;
                failedCondition = {
                    canonicalField: cond.canonicalField,
                    operator: cond.operator,
                    leftValue,
                    rightValue: cond.value
                };
                break;
            }
        }

        return createRuleDecisionDTO({
            ruleId: normalizedRuleDTO.ruleId,
            matched: isMatch,
            numericPriority: normalizedRuleDTO.numericPriority,
            matchedConditions,
            failedCondition,
            effects: isMatch ? normalizedRuleDTO.effects : [],
            conflicts: []
        });
    },

    /**
     * Evaluates a list of NormalizedRuleDTOs with Stable Sorting (priority DESC, ruleId ASC).
     *
     * @param {Array<Object>} normalizedRuleList
     * @param {Object} contextDTO
     * @returns {Object} Frozen Array of RuleDecisionDTOs.
     */
    evaluateAll(normalizedRuleList = [], contextDTO = {}) {
        // 1. Filter enabled rules
        const activeRules = normalizedRuleList.filter(r => r && r.enabled);

        // 2. Deterministic Stable Sorting: priority DESC -> ruleId ASC
        const sortedRules = [...activeRules].sort((a, b) => {
            if (b.numericPriority !== a.numericPriority) {
                return b.numericPriority - a.numericPriority;
            }
            return a.ruleId.localeCompare(b.ruleId);
        });

        // 3. Evaluate each rule
        const decisions = sortedRules.map(rule => this.evaluateRule(rule, contextDTO));

        return deepFreezeDTO(decisions);
    }
});

export default RuleEvaluator;
