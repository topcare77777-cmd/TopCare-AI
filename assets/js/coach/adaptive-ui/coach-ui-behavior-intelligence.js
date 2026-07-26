// assets/js/coach/adaptive-ui/coach-ui-behavior-intelligence.js
/**
 * @file coach-ui-behavior-intelligence.js
 * @description Generates behavioral intelligence policies including pacing, feedback styles, navigation velocity, and proactive assistance thresholds.
 * @module Coach/AdaptiveUI/UIBehaviorIntelligence
 */

import { CoachAdaptiveComponentRenderer } from './coach-adaptive-component-renderer.js';

export const CoachUIBehaviorIntelligence = {
    resolveBehavior(componentPolicy = null, temperamentType = "balanced") {
        let policy = componentPolicy;
        if (!policy || typeof policy !== 'object') {
            try {
                policy = CoachAdaptiveComponentRenderer.renderComponents(null);
            } catch (e) {
                policy = { renderPolicy: { primaryComponent: "chat" } };
            }
        }

        const temperament = (temperamentType || "balanced").toLowerCase();
        const primaryComp = policy.renderPolicy?.primaryComponent || "chat";

        let pacing = "normal";
        let feedbackStyle = "supportive";
        let navigationVelocity = "balanced";
        let interventionThreshold = "medium";

        let autoAdvance = false;
        let detailedHints = true;
        let proactivePrompting = false;

        if (temperament === "koleris" || primaryComp === "quickActions") {
            pacing = "fast";
            feedbackStyle = "direct";
            navigationVelocity = "rapid";
            interventionThreshold = "low";
            autoAdvance = true;
            detailedHints = false;
            proactivePrompting = true;
        } else if (temperament === "sanguinis" || primaryComp === "cards") {
            pacing = "dynamic";
            feedbackStyle = "encouraging";
            navigationVelocity = "fluid";
            interventionThreshold = "medium";
            autoAdvance = true;
            detailedHints = true;
            proactivePrompting = true;
        } else if (temperament === "melankolis" || primaryComp === "analytics") {
            pacing = "methodical";
            feedbackStyle = "precise";
            navigationVelocity = "structured";
            interventionThreshold = "high";
            autoAdvance = false;
            detailedHints = true;
            proactivePrompting = false;
        } else if (temperament === "plegmatis" || primaryComp === "chat") {
            pacing = "comfortable";
            feedbackStyle = "gentle";
            navigationVelocity = "steady";
            interventionThreshold = "high";
            autoAdvance = false;
            detailedHints = true;
            proactivePrompting = false;
        }

        return {
            behaviorProfile: {
                pacing: pacing,
                feedbackStyle: feedbackStyle,
                navigationVelocity: navigationVelocity,
                interventionThreshold: interventionThreshold
            },
            interactionTraits: {
                autoAdvance: autoAdvance,
                detailedHints: detailedHints,
                proactivePrompting: proactivePrompting
            },
            generatedAt: new Date().toISOString()
        };
    }
};