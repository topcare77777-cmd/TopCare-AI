// assets/js/coach/personalization/coach-personalization-adapter.js
/**
 * @file coach-personalization-adapter.js
 * @description Normalizes adaptive personalization output into a stable, clean contract for external consumers.
 * @module Coach/Personalization/Adapter
 */

import { CoachAdaptiveResponseEngine } from './coach-adaptive-response-engine.js';

export const CoachPersonalizationAdapter = {
    getConfiguration() {
        let response = null;
        try {
            response = CoachAdaptiveResponseEngine.generate();
        } catch (e) {
            response = null;
        }

        const safeResponse = response || {};

        return {
            style: safeResponse.coachStyle || "supportive",
            tone: safeResponse.tone || "friendly",
            mode: safeResponse.responseMode || "text",
            pace: safeResponse.pacing || "balanced",
            encouragement: safeResponse.encouragementLevel || "medium",
            action: safeResponse.suggestedAction || "continue",
            timestamp: safeResponse.generatedAt || new Date().toISOString()
        };
    }
};