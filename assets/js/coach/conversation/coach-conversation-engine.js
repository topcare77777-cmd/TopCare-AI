// assets/js/coach/conversation/coach-conversation-engine.js
/**
 * @file coach-conversation-engine.js
 * @description Orchestrates active conversation flows by combining transient session context and granular style intelligence into a cohesive response strategy.
 * @module Coach/Conversation/Engine
 */

import { CoachConversationContext } from './coach-conversation-context.js';
import { CoachConversationStyle } from './coach-conversation-style.js';

export const CoachConversationEngine = {
    processInteraction(inputTopic = null, userAction = "continue") {
        // 1. Update session context if a topic or interaction is provided
        let currentSession = null;
        try {
            if (inputTopic) {
                CoachConversationContext.update({
                    lastTopic: inputTopic,
                    incrementDepth: true
                });
            }
            currentSession = CoachConversationContext.getSession();
        } catch (e) {
            currentSession = { sessionId: "sess_fallback", conversationDepth: 0 };
        }

        // 2. Resolve communication style configuration
        let resolvedStyle = null;
        try {
            resolvedStyle = CoachConversationStyle.resolveStyle();
        } catch (e) {
            resolvedStyle = {
                tone: "friendly",
                responseLength: "medium",
                explanationStyle: "example_based",
                interactionApproach: "interactive",
                encouragementLevel: "medium"
            };
        }

        // 3. Derive response strategy based on style and session depth
        const tone = resolvedStyle.tone || "friendly";
        const explanationStyle = resolvedStyle.explanationStyle || "example_based";
        const depth = currentSession.conversationDepth || 0;

        let openingText = "Mari kita lanjutkan pembahasan ini bersama.";
        if (explanationStyle === "structured") {
            openingText = "Berikut rincian langkah-langkah yang perlu kita perhatikan:";
        } else if (explanationStyle === "story_based") {
            openingText = "Wah, ini topik yang seru! Mari kita bedah bersama.";
        } else if (explanationStyle === "action_based") {
            openingText = "Mari kita fokus langsung pada target aksi utama kita.";
        } else if (explanationStyle === "simple") {
            openingText = "Kita pelajari secara bertahap dan santai ya.";
        }

        const guidanceLevel = depth > 4 ? "high" : "medium";
        const followUpRequired = userAction !== "complete";

        return {
            sessionId: currentSession.sessionId || "sess_unknown",
            topic: currentSession.lastTopic || inputTopic || "General Guidance",
            style: {
                tone: resolvedStyle.tone,
                responseLength: resolvedStyle.responseLength,
                explanationStyle: resolvedStyle.explanationStyle,
                interactionApproach: resolvedStyle.interactionApproach
            },
            responseStrategy: {
                opening: openingText,
                guidanceLevel: guidanceLevel,
                followUpRequired: followUpRequired
            },
            generatedAt: new Date().toISOString()
        };
    }
};