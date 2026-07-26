// assets/js/coach/runtime/coach-runtime-ui-controller.js
/**
 * @file coach-runtime-ui-controller.js
 * @description Coordinates runtime UI state changes, mapping adaptive experience configurations into actionable view directives.
 * @module Coach/Runtime/RuntimeUIController
 */

import { CoachAdaptiveUIIntegration } from '../adaptive-ui/coach-adaptive-ui-integration.js';

export const CoachRuntimeUIController = {
    syncRuntimeState(userPersonality = null, deviceProfile = null) {
        let adaptiveExp = null;
        try {
            adaptiveExp = CoachAdaptiveUIIntegration.getAdaptiveExperience(userPersonality, deviceProfile);
        } catch (e) {
            adaptiveExp = {
                personality: { temperament: "balanced" },
                layout: { layoutProfile: { structure: "dashboard", density: "normal" } },
                components: { visibility: { sidebar: true, cards: true, analytics: true, quickActions: true }, renderPolicy: { primaryComponent: "chat" } },
                behavior: { behaviorProfile: { pacing: "normal", feedbackStyle: "supportive" }, interactionTraits: { autoAdvance: false, detailedHints: true, proactivePrompting: false } }
            };
        }

        const temperament = adaptiveExp.personality?.temperament || "balanced";
        const layoutProfile = adaptiveExp.layout?.layoutProfile || {};
        const components = adaptiveExp.components || {};
        const visibility = components.visibility || {};
        const renderPolicy = components.renderPolicy || {};
        const behavior = adaptiveExp.behavior || {};
        const behaviorProfile = behavior.behaviorProfile || {};
        const interactionTraits = behavior.interactionTraits || {};

        return {
            runtimeState: {
                activeLayout: layoutProfile.structure || "dashboard",
                activeTheme: temperament,
                pacing: behaviorProfile.pacing || "normal",
                feedbackStyle: behaviorProfile.feedbackStyle || "supportive"
            },
            renderDirectives: {
                showSidebar: !!visibility.sidebar,
                showCards: !!visibility.cards,
                showAnalytics: !!visibility.analytics,
                showQuickActions: !!visibility.quickActions,
                primaryComponent: renderPolicy.primaryComponent || "chat"
            },
            runtimeFlags: {
                autoAdvance: !!interactionTraits.autoAdvance,
                detailedHints: !!interactionTraits.detailedHints,
                proactivePrompting: !!interactionTraits.proactivePrompting
            },
            generatedAt: new Date().toISOString()
        };
    }
};