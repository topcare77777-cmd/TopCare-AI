// assets/js/coach/personalization/coach-adaptive-response-model.js
/**
 * @file coach-adaptive-response-model.js
 * @description Response schema and validation rules for adaptive AI Coach behavior configurations.
 * @module Coach/Personalization/AdaptiveResponseModel
 */

export const CoachAdaptiveResponseModel = {
    createDefault() {
        return {
            coachStyle: "supportive",
            tone: "friendly",
            responseMode: "text",
            pacing: "balanced",
            encouragementLevel: "medium",
            suggestedAction: "continue",
            generatedAt: new Date().toISOString()
        };
    },

    validate(data) {
        if (!data || typeof data !== "object") return false;

        return Boolean(
            data.coachStyle &&
            data.responseMode
        );
    }
};