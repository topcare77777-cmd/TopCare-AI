// assets/js/coach/personalization/coach-context-model.js
/**
 * @file coach-context-model.js
 * @description Defines the structural schema and default values for user personalization context.
 * @module Coach/Personalization/Model
 */

export const CoachContextModel = {
    createDefault() {
        return {
            version: "1.0",
            updatedAt: new Date().toISOString(),
            preferences: {
                learningPace: "balanced", // 'relaxed', 'balanced', 'intensive'
                preferredTone: "supportive", // 'supportive', 'direct', 'analytical'
                reminderEnabled: true,
                themeMode: "light"
            },
            profileAttributes: {
                experienceLevel: "beginner",
                focusArea: "general"
            },
            customMetadata: {}
        };
    },

    validate(data) {
        if (!data || typeof data !== 'object') return false;
        if (!data.preferences || typeof data.preferences !== 'object') return false;
        return true;
    }
};