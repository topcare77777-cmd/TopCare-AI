// assets/js/coach/personalization/coach-adaptive-response-engine.js
/**
 * @file coach-adaptive-response-engine.js
 * @description Generates adaptive AI Coach response configurations from personalization profile evaluation and safe read-only context integrations.
 * @module Coach/Personalization/AdaptiveResponseEngine
 */

import { CoachPersonalizationEngine } from './coach-personalization-engine.js';
import { CoachAdaptiveResponseModel } from './coach-adaptive-response-model.js';

export const CoachAdaptiveResponseEngine = {
    generate() {
        let evaluation = null;
        try {
            evaluation = CoachPersonalizationEngine.evaluateCurrentProfile();
        } catch (e) {
            evaluation = null;
        }

        const recommendation = evaluation?.recommendation || {};

        const response = {
            coachStyle: recommendation.coachStyle || "supportive",
            tone: (recommendation.coachStyle === "analytical") ? "structured" : "friendly",
            responseMode: recommendation.recommendedMode || "text",
            pacing: recommendation.recommendedPace || "balanced",
            encouragementLevel: (recommendation.nextAction === "continue_lesson") ? "high" : "medium",
            suggestedAction: recommendation.nextAction || "continue",
            generatedAt: new Date().toISOString()
        };

        if (!CoachAdaptiveResponseModel.validate(response)) {
            return CoachAdaptiveResponseModel.createDefault();
        }

        return response;
    }
};