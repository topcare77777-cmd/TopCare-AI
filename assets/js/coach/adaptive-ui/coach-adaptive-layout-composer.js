// assets/js/coach/adaptive-ui/coach-adaptive-layout-composer.js
/**
 * @file coach-adaptive-layout-composer.js
 * @description Synthesizes user personality traits and device experience metrics into customized layout configurations and component rules.
 * @module Coach/AdaptiveUI/AdaptiveLayoutComposer
 */

import { CoachUIPersonalityAdapter } from './coach-ui-personality-adapter.js';
import { CoachExperienceIntegration } from '../experience/coach-experience-integration.js';

export const CoachAdaptiveLayoutComposer = {
    composeLayout(userPersonality = null, deviceProfile = null) {
        let personality = userPersonality;
        if (!personality || typeof personality !== 'object') {
            personality = CoachUIPersonalityAdapter.resolveUIPersonality(null);
        } else if (!personality.uiRecommendation) {
            personality = CoachUIPersonalityAdapter.resolveUIPersonality(personality);
        }

        let experience = deviceProfile;
        if (!experience || typeof experience !== 'object') {
            try {
                experience = CoachExperienceIntegration.getDeviceProfile();
            } catch (e) {
                experience = { 
                    experienceMode: "desktop", 
                    device: { deviceType: "desktop" },
                    layout: { spacing: "expanded" } 
                };
            }
        }

        const temperament = (personality.temperament || "balanced").toLowerCase();
        const experienceMode = (experience.experienceMode || experience.device?.deviceType || "desktop").toLowerCase();

        let structure = "dashboard";
        let density = experience.layout?.spacing || "normal";
        let navigationStyle = "balanced";
        let contentPriority = "standard";

        let sidebar = true;
        let cards = true;
        let analytics = true;
        let quickActions = true;

        if (temperament === "koleris") {
            structure = experienceMode === "mobile" ? "streamlined" : "dashboard";
            navigationStyle = "fast";
            contentPriority = "goals";
            quickActions = true;
            analytics = experienceMode !== "mobile";
        } else if (temperament === "sanguinis") {
            structure = experienceMode === "mobile" ? "card_based" : "engaging_grid";
            navigationStyle = "visual";
            contentPriority = "engagement";
            cards = true;
            quickActions = true;
            sidebar = experienceMode === "desktop";
        } else if (temperament === "melankolis") {
            structure = experienceMode === "mobile" ? "detailed_list" : "workspace";
            navigationStyle = "organized";
            contentPriority = "analysis";
            analytics = true;
            sidebar = true;
            cards = false;
        } else if (temperament === "plegmatis") {
            structure = "guided";
            navigationStyle = "simple";
            contentPriority = "learning_flow";
            sidebar = experienceMode === "desktop";
            cards = true;
            analytics = false;
        } else {
            structure = "standard";
            navigationStyle = "standard";
            contentPriority = "standard";
        }

        if (experienceMode === "mobile") {
            sidebar = false;
            density = "compact";
        } else if (experienceMode === "tablet") {
            density = "comfortable";
        }

        return {
            layoutProfile: {
                structure: structure,
                density: density,
                navigationStyle: navigationStyle,
                contentPriority: contentPriority
            },
            componentRules: {
                sidebar: sidebar,
                cards: cards,
                analytics: analytics,
                quickActions: quickActions
            },
            generatedAt: new Date().toISOString()
        };
    }
};