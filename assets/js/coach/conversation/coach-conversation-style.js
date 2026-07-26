// assets/js/coach/conversation/coach-conversation-style.js
/**
 * @file coach-conversation-style.js
 * @description Evaluates personalization configurations, user personality temperaments, and conversation context to produce a granular conversational style configuration.
 * @module Coach/Conversation/Style
 */

import { CoachPersonalizationIntegration } from '../personalization/coach-personalization-integration.js';
import { CoachConversationContext } from './coach-conversation-context.js';

export const CoachConversationStyle = {
    resolveStyle() {
        // 1. Gather personalization configurations via safe integration facade
        let personalizationProfile = null;
        try {
            if (typeof CoachPersonalizationIntegration.getProfile === 'function') {
                personalizationProfile = CoachPersonalizationIntegration.getProfile();
            }
        } catch (e) {
            personalizationProfile = null;
        }

        const config = personalizationProfile?.personalization || {};
        const baseStyle = (config.style || "supportive").toLowerCase();

        // 2. Safely read personality temperament if available globally or through window
        let temperament = "unknown";
        try {
            if (typeof window !== 'undefined' && window.CoachPersonality) {
                const pProfile = typeof window.CoachPersonality.getProfile === 'function'
                    ? window.CoachPersonality.getProfile()
                    : window.CoachPersonality;
                temperament = (pProfile?.temperament || "").toLowerCase();
            }
        } catch (e) {
            temperament = "unknown";
        }

        // 3. Gather session conversation context
        let session = null;
        try {
            session = CoachConversationContext.getSession();
        } catch (e) {
            session = {};
        }

        // 4. Map temperament and base style into detailed communication parameters
        let resolvedStyle = {
            tone: config.tone || "friendly",
            responseLength: "medium",
            explanationStyle: "example_based",
            encouragementLevel: config.encouragement || "medium",
            interactionApproach: "interactive",
            confidence: "adaptive",
            generatedAt: new Date().toISOString()
        };

        if (temperament.includes("melankolis") || baseStyle === "analytical") {
            resolvedStyle.tone = "calm";
            resolvedStyle.responseLength = "detailed";
            resolvedStyle.explanationStyle = "structured";
            resolvedStyle.interactionApproach = "analytical";
        } else if (temperament.includes("sanguinis")) {
            resolvedStyle.tone = "energetic";
            resolvedStyle.responseLength = "short-medium";
            resolvedStyle.explanationStyle = "story_based";
            resolvedStyle.interactionApproach = "interactive";
        } else if (temperament.includes("koleris")) {
            resolvedStyle.tone = "direct";
            resolvedStyle.responseLength = "concise";
            resolvedStyle.explanationStyle = "action_based";
            resolvedStyle.interactionApproach = "goal_oriented";
        } else if (temperament.includes("plegmatis") || baseStyle === "relaxed") {
            resolvedStyle.tone = "warm";
            resolvedStyle.responseLength = "step_by_step";
            resolvedStyle.explanationStyle = "simple";
            resolvedStyle.interactionApproach = "supportive";
        }

        // Adapt based on conversation depth if necessary
        if (session && session.conversationDepth > 3) {
            resolvedStyle.encouragementLevel = "high";
        }

        return resolvedStyle;
    }
};