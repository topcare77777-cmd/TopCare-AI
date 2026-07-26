// assets/js/coach/adaptive-ui/coach-ui-personality-adapter.js
/**
 * @file coach-ui-personality-adapter.js
 * @description Bridges personality profiles and device experience layers to generate tailored UI layout and interaction recommendations.
 * @module Coach/AdaptiveUI/UIPersonalityAdapter
 */

export const CoachUIPersonalityAdapter = {
    resolveUIPersonality(userPersonality = null) {
        const temperament = (userPersonality && userPersonality.temperament)
            ? userPersonality.temperament.toLowerCase()
            : "balanced";

        let uiRecommendation = {
            layout: "standard",
            navigation: "balanced",
            dashboard: "standard",
            feedbackStyle: "supportive"
        };

        switch (temperament) {
            case "koleris":
                uiRecommendation = {
                    layout: "action",
                    navigation: "fast",
                    dashboard: "goal-focused",
                    feedbackStyle: "direct"
                };
                break;
            case "sanguinis":
                uiRecommendation = {
                    layout: "visual",
                    navigation: "dynamic",
                    dashboard: "engaging",
                    feedbackStyle: "encouraging"
                };
                break;
            case "melankolis":
                uiRecommendation = {
                    layout: "structured",
                    navigation: "detailed",
                    dashboard: "analytical",
                    feedbackStyle: "precise"
                };
                break;
            case "plegmatis":
                uiRecommendation = {
                    layout: "simple",
                    navigation: "comfortable",
                    dashboard: "calm",
                    feedbackStyle: "gentle"
                };
                break;
            default:
                uiRecommendation = {
                    layout: "balanced",
                    navigation: "standard",
                    dashboard: "standard",
                    feedbackStyle: "supportive"
                };
                break;
        }

        return {
            temperament: temperament,
            uiRecommendation: uiRecommendation,
            generatedAt: new Date().toISOString()
        };
    }
};