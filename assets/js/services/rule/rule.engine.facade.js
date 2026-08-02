/**
 * TOPCARE AI PLATFORM V2 — RULE ENGINE FACADE
 * Path: assets/js/services/rule/rule.engine.facade.js
 * Status: ACTIVE (BUILD AC-020 Phase 2 - LOCKED GOLDEN BASELINE)
 * Role: Subsystem Facade Orchestrating Rule Normalization, Evaluation, and Statistics
 */

import { RuleValidator } from '../../core/rule/rule.validator.js';
import { RuleNormalizer } from '../../core/rule/rule.normalizer.js';
import RuleEvaluator from './rule.evaluator.js';
import { deepFreezeDTO } from '../../core/utils/dto.js';

export const RuleEngineFacade = Object.freeze({
    /**
     * Processes raw RuleDTO list against context and returns matching Decisions & Statistics.
     *
     * @param {Array<Object>} rawRuleList - Raw RuleDTO array.
     * @param {Object} contextDTO - Standard LayeredContextDTO.
     * @returns {Object} Composite Result { decisions, aggregatedEffects, statistics }.
     */
    processRules(rawRuleList = [], contextDTO = {}) {
        const startTime = Date.now();
        let skippedCount = 0;

        // 1. Validate & Normalize
        const normalizedList = [];
        for (const rawRule of rawRuleList) {
            try {
                RuleValidator.validate(rawRule);
                const normalized = RuleNormalizer.normalize(rawRule);
                if (normalized.enabled) {
                    normalizedList.push(normalized);
                } else {
                    skippedCount += 1;
                }
            } catch (err) {
                skippedCount += 1;
                console.warn(`[RuleEngineFacade] Rule validation failed for ${rawRule?.ruleId}:`, err.message);
            }
        }

        // 2. Batch Evaluate
        const decisions = RuleEvaluator.evaluateAll(normalizedList, contextDTO);

        // 3. Aggregate Effects from Matched Decisions
        const matchedDecisions = decisions.filter(d => d.matched);
        const aggregatedEffects = matchedDecisions.flatMap(d => d.effects);

        const executionTimeMs = Date.now() - startTime;

        const statistics = deepFreezeDTO({
            schemaVersion: '2.0.0',
            evaluated: normalizedList.length,
            matched: matchedDecisions.length,
            skipped: skippedCount,
            executionTimeMs,
            averageRuleTimeMs: normalizedList.length > 0 ? (executionTimeMs / normalizedList.length) : 0
        });

        return deepFreezeDTO({
            decisions,
            aggregatedEffects: Object.freeze(aggregatedEffects),
            statistics
        });
    }
});

export default RuleEngineFacade;
