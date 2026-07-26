// assets/js/coach/adaptive-ui/coach-adaptive-component-renderer.js
/**
 * @file coach-adaptive-component-renderer.js
 * @description Translates adaptive layout profiles into concrete component visibility policies, rendering orders, and action weights.
 * @module Coach/AdaptiveUI/AdaptiveComponentRenderer
 */

import { CoachAdaptiveLayoutComposer } from './coach-adaptive-layout-composer.js';

export const CoachAdaptiveComponentRenderer = {
    renderComponents(layoutProfile = null) {
        let layout = layoutProfile;
        if (!layout || typeof layout !== 'object' || !layout.componentRules) {
            try {
                layout = CoachAdaptiveLayoutComposer.composeLayout(null, null);
            } catch (e) {
                layout = {
                    layoutProfile: { structure: "dashboard", contentPriority: "standard" },
                    componentRules: { sidebar: true, cards: true, analytics: true, quickActions: true }
                };
            }
        }

        const rules = layout.componentRules || {};
        const profile = layout.layoutProfile || {};
        const priority = profile.contentPriority || "standard";

        let primaryComponent = "chat";
        let renderOrder = ["chat", "cards", "analytics", "quickActions"];
        let actionWeights = { primary: "chat", secondary: "quickActions" };

        if (priority === "goals") {
            primaryComponent = "quickActions";
            renderOrder = ["quickActions", "chat", "analytics", "cards"];
            actionWeights = { primary: "quickActions", secondary: "chat" };
        } else if (priority === "engagement") {
            primaryComponent = "cards";
            renderOrder = ["cards", "chat", "quickActions", "analytics"];
            actionWeights = { primary: "cards", secondary: "quickActions" };
        } else if (priority === "analysis") {
            primaryComponent = "analytics";
            renderOrder = ["analytics", "chat", "cards", "quickActions"];
            actionWeights = { primary: "analytics", secondary: "chat" };
        } else if (priority === "learning_flow") {
            primaryComponent = "chat";
            renderOrder = ["chat", "cards", "quickActions", "analytics"];
            actionWeights = { primary: "chat", secondary: "cards" };
        }

        const visibility = {
            chat: true,
            sidebar: !!rules.sidebar,
            cards: !!rules.cards,
            analytics: !!rules.analytics,
            quickActions: !!rules.quickActions
        };

        return {
            renderPolicy: {
                primaryComponent: primaryComponent,
                renderOrder: renderOrder,
                actionWeights: actionWeights
            },
            visibility: visibility,
            generatedAt: new Date().toISOString()
        };
    }
};