/**
 * TOPCARE AI PLATFORM V2 — SAFETY ENGINE FACADE
 * Path: assets/js/services/safety/safety.engine.facade.js
 * Status: ACTIVE (BUILD AC-021 Phase 2 - LOCKED GOLDEN BASELINE)
 * Role: Subsystem Facade Orchestrating Normalization & Evaluator Execution
 */

import { SafetyValidator } from '../../core/safety/safety.validator.js';
import { SafetyNormalizer } from '../../core/safety/safety.normalizer.js';
import SafetyEvaluator from './safety.evaluator.js';
import TimeProvider from '../../core/time/time.provider.js';
import { deepFreezeDTO } from '../../core/utils/dto.js';

export const SafetyEngineFacade = Object.freeze({
    /**
     * Evaluates user input or LLM response text against policy catalog.
     * @param {string} textPayload
     * @param {Array<Object>} rawPolicies
     * @returns {Object} Composite Safety Result
     */
    evaluate(textPayload = '', rawPolicies = []) {
        const startTime = TimeProvider.now();

        const normalizedPolicies = [];
        for (const raw of rawPolicies) {
            try {
                SafetyValidator.validate(raw);
                normalizedPolicies.push(SafetyNormalizer.normalize(raw));
            } catch (err) {
                console.warn(`[SafetyEngineFacade] Validation skipped for ${raw?.policyId}:`, err.message);
            }
        }

        const evaluation = SafetyEvaluator.evaluateText(textPayload, normalizedPolicies);
        const executionTimeMs = TimeProvider.now() - startTime;

        return deepFreezeDTO({
            ...evaluation,
            statistics: deepFreezeDTO({
                evaluatedPolicies: normalizedPolicies.length,
                matchedPolicies: evaluation.decisionDTO.policyIds.length,
                executionTimeMs,
                blockedCount: evaluation.decisionDTO.blocked ? 1 : 0,
                disclaimerInjected: evaluation.decisionDTO.disclaimers.length
            })
        });
    }
});

export default SafetyEngineFacade;
