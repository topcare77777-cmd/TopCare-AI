// assets/js/coach/personalization/coach-personalization-engine.js
/**
 * @file coach-personalization-engine.js
 * @description Core rule evaluation orchestrator combining user context, analytics, and personality states to output dynamic coaching configurations without side effects.
 * @module Coach/Personalization/Engine
 */

import { CoachContextEngine } from './coach-context-engine.js';
import { CoachPersonalizationRules } from './coach-personalization-rules.js';

export const CoachPersonalizationEngine = {
    evaluateCurrentProfile() {
        // 1. Gather user context and aggregated stats safely
        const aggregated = CoachContextEngine.getAggregatedUserProfile();
        const context = aggregated?.context || {};
        const stats = aggregated?.aggregatedStats || {};

        // 2. Safe read-only extraction of CoachPersonality if available
        let personalityData = null;
        try {
            if (typeof window !== 'undefined' && window.CoachPersonality) {
                personalityData = typeof window.CoachPersonality.getProfile === 'function'
                    ? window.CoachPersonality.getProfile()
                    : window.CoachPersonality;
            }
        } catch (e) {
            personalityData = null;
        }

        // 3. Evaluate rules through rule catalog
        const evaluationResult = CoachPersonalizationRules.evaluate(context, stats, personalityData);

        return {
            timestamp: new Date().toISOString(),
            profileInput: {
                preferences: context.preferences || {},
                statsSummary: {
                    achievementsUnlocked: stats.achievementsUnlocked || 0,
                    lessonsCompleted: stats.progress?.lessonsCompleted || 0
                },
                personalityTemperament: personalityData?.temperament || 'unknown'
            },
            recommendation: evaluationResult
        };
    }
};