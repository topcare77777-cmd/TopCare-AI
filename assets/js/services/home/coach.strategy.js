/**
 * TOPCARE AI PLATFORM V2 — DECLARED COACH STRATEGY REASONING ENGINE
 * Path: assets/js/services/home/coach.strategy.js
 * Status: ACTIVE (BUILD AC-020 Phase 2 - LOCKED GOLDEN BASELINE)
 * Role: Resolves Strategy Result DTO via Rule Engine Facade Effects Execution
 */

import RuleEngineFacade from '../rule/rule.engine.facade.js';
import { deepFreezeDTO } from '../../core/utils/dto.js';

export const CoachStrategy = (() => {

    function resolve(layeredContextDTO, activeRuleList = []) {
        // 1. Delegate evaluation to RuleEngineFacade
        const ruleResult = RuleEngineFacade.processRules(activeRuleList, layeredContextDTO);
        const effects = ruleResult.aggregatedEffects || [];

        // 2. Baseline Defaults
        let tone = 'empathetic_professional';
        let verbosity = 'normal';
        let coachMode = 'ACTIVE_GUIDANCE';
        let questionStyle = 'OPEN_ENDED';
        let responseDepth = 'MODERATE';
        let encouragementLevel = 'STANDARD';
        const hintCodes = [];

        // 3. Apply EffectDTOs (Zero knowledge of Rule conditions or operators)
        for (const effect of effects) {
            switch (effect.type) {
                case 'SET_COMMUNICATION_TONE':
                    if (effect.payload?.tone) tone = effect.payload.tone;
                    if (effect.payload?.verbosity) verbosity = effect.payload.verbosity;
                    break;
                case 'SET_EXECUTION_MODE':
                    if (effect.payload?.coachMode) coachMode = effect.payload.coachMode;
                    if (effect.payload?.questionStyle) questionStyle = effect.payload.questionStyle;
                    if (effect.payload?.responseDepth) responseDepth = effect.payload.responseDepth;
                    if (effect.payload?.encouragementLevel) encouragementLevel = effect.payload.encouragementLevel;
                    break;
                case 'ADD_HINT_CODE':
                    if (effect.payload?.hintCode && !hintCodes.includes(effect.payload.hintCode)) {
                        hintCodes.push(effect.payload.hintCode);
                    }
                    break;
                default:
                    break;
            }
        }

        return deepFreezeDTO({
            schemaVersion: '2.0.0',
            coach: {
                id: 'coach-kael',
                persona: `AI Coach ${layeredContextDTO?.personalityProfile?.primaryType || 'Umum'}`
            },
            communication: {
                tone,
                verbosity,
                style: layeredContextDTO?.personalityProfile?.communicationStyle || 'structured'
            },
            executionMode: {
                coachMode,
                questionStyle,
                responseDepth,
                encouragementLevel
            },
            reasoningHints: Object.freeze(hintCodes),
            ruleStatistics: ruleResult.statistics
        });
    }

    return Object.freeze({
        resolve
    });
})();

export default CoachStrategy;
