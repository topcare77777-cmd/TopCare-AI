// assets/js/coach/adaptive-ui/coach-adaptive-ui-integration.js
/**
 * @file coach-adaptive-ui-integration.js
 * @description Master integration facade combining personality adaptation, layout composition, component rendering policies, and behavioral intelligence.
 * @module Coach/AdaptiveUI/AdaptiveUIIntegration
 */

import { CoachUIPersonalityAdapter } from './coach-ui-personality-adapter.js';
import { CoachAdaptiveLayoutComposer } from './coach-adaptive-layout-composer.js';
import { CoachAdaptiveComponentRenderer } from './coach-adaptive-component-renderer.js';
import { CoachUIBehaviorIntelligence } from './coach-ui-behavior-intelligence.js';

export const CoachAdaptiveUIIntegration = {
    getAdaptiveExperience(userPersonality = null, deviceProfile = null) {
        let personalityData = {};
        try {
            personalityData = CoachUIPersonalityAdapter.resolveUIPersonality(userPersonality);
        } catch (e) {
            personalityData = { temperament: "balanced", uiRecommendation: { layout: "standard" } };
        }

        let layoutData = {};
        try {
            layoutData = CoachAdaptiveLayoutComposer.composeLayout(personalityData, deviceProfile);
        } catch (e) {
            layoutData = { layoutProfile: { structure: "dashboard", density: "normal" }, componentRules: { sidebar: true } };
        }

        let componentData = {};
        try {
            componentData = CoachAdaptiveComponentRenderer.renderComponents(layoutData);
        } catch (e) {
            componentData = { renderPolicy: { primaryComponent: "chat" }, visibility: { chat: true } };
        }

        let behaviorData = {};
        try {
            behaviorData = CoachUIBehaviorIntelligence.resolveBehavior(componentData, personalityData.temperament);
        } catch (e) {
            behaviorData = { behaviorProfile: { pacing: "normal", feedbackStyle: "supportive" } };
        }

        const adaptiveMode = personalityData.temperament || "balanced";

        return {
            personality: personalityData,
            layout: layoutData,
            components: componentData,
            behavior: behaviorData,
            adaptiveMode: adaptiveMode,
            generatedAt: new Date().toISOString()
        };
    }
};