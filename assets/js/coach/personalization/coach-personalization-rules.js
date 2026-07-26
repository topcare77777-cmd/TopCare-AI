// assets/js/coach/personalization/coach-personalization-rules.js
/**
 * @file coach-personalization-rules.js
 * @description Catalog of evaluation rules mapping user context, personality temperaments, and performance stats to dynamic coaching parameters.
 * @module Coach/Personalization/Rules
 */

export const CoachPersonalizationRules = {
    rules: [
        {
            id: 'rule_melankolis_analytical',
            condition: (context, stats, personality) => {
                const temp = (personality?.temperament || '').toLowerCase();
                const pace = context?.preferences?.learningPace || 'balanced';
                return temp.includes('melankolis') || pace === 'intensive';
            },
            recommendation: {
                coachStyle: 'analytical',
                recommendedMode: 'text',
                recommendedPace: 'intensive',
                nextAction: 'review_details'
            }
        },
        {
            id: 'rule_sanguinis_supportive',
            condition: (context, stats, personality) => {
                const temp = (personality?.temperament || '').toLowerCase();
                return temp.includes('sanguinis') || temp.includes('koleris');
            },
            recommendation: {
                coachStyle: 'energetic',
                recommendedMode: 'voice',
                recommendedPace: 'balanced',
                nextAction: 'continue_lesson'
            }
        },
        {
            id: 'rule_plegmatis_relaxed',
            condition: (context, stats, personality) => {
                const pace = context?.preferences?.learningPace || 'balanced';
                return pace === 'relaxed';
            },
            recommendation: {
                coachStyle: 'supportive',
                recommendedMode: 'text',
                recommendedPace: 'relaxed',
                nextAction: 'step_by_step'
            }
        }
    ],

    evaluate(context, stats, personality) {
        // Find matching rule or fall back to default profile
        for (const rule of this.rules) {
            try {
                if (typeof rule.condition === 'function' && rule.condition(context, stats, personality)) {
                    return {
                        ruleId: rule.id,
                        ...rule.recommendation
                    };
                }
            } catch (e) {
                // Fail-safe per rule evaluation
            }
        }

        // Default baseline recommendation profile
        return {
            ruleId: 'rule_default_balanced',
            coachStyle: context?.preferences?.preferredTone || 'supportive',
            recommendedMode: 'text',
            recommendedPace: context?.preferences?.learningPace || 'balanced',
            nextAction: 'continue_lesson'
        };
    }
};