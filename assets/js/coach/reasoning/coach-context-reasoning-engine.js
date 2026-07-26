// assets/js/coach/reasoning/coach-context-reasoning-engine.js
/**
 * @file coach-context-reasoning-engine.js
 * @description Synthesizes conversation context, memory scoring insights, and personalization parameters into actionable reasoning decisions.
 * @module Coach/Reasoning/ContextReasoningEngine
 */

import { CoachMemoryScoring } from './coach-memory-scoring.js';

export const CoachContextReasoningEngine = {
    synthesizeContext(inputContext = {}) {
        const currentTopic = inputContext.topic || null;
        const conversationDepth = inputContext.conversationDepth || 1;
        const userSentiment = inputContext.sentiment || "neutral";
        const progressStatus = inputContext.progressStatus || "stable";

        // 1. Fetch prioritized memory insights using BUILD 117.1 scoring
        let prioritizedMemories = [];
        try {
            prioritizedMemories = CoachMemoryScoring.prioritizeMemories(currentTopic);
        } catch (e) {
            prioritizedMemories = [];
        }

        const highestPriority = prioritizedMemories.length > 0 ? prioritizedMemories[0] : null;
        const relevantMemories = prioritizedMemories.slice(0, 3);

        // 2. Derive tactical decision metrics based on combined context
        let responseDirection = "standard_guidance";
        let confidence = "medium";
        let suggestedApproach = "balanced_explanation";

        if (userSentiment === "struggling" || progressStatus === "declining") {
            responseDirection = "remediate_and_simplify";
            confidence = "high";
            suggestedApproach = "step_by_step_breakdown";
        } else if (userSentiment === "confident" || progressStatus === "accelerated") {
            responseDirection = "challenge_and_expand";
            confidence = "high";
            suggestedApproach = "advanced_application";
        }

        if (highestPriority && highestPriority.scoring && highestPriority.scoring.relevanceScore > 0.8) {
            confidence = "high";
        }

        // 3. Assemble structured reasoning payload
        return {
            reasoningId: "reason_" + Date.now() + "_" + Math.floor(Math.random() * 1000),
            context: {
                topic: currentTopic,
                conversationDepth: conversationDepth,
                sentiment: userSentiment,
                progressStatus: progressStatus
            },
            memoryInsights: {
                relevantMemories: relevantMemories.map(m => ({
                    id: m.id,
                    type: m.type,
                    relevanceScore: m.scoring ? m.scoring.relevanceScore : 0.5
                })),
                highestPriority: highestPriority ? {
                    id: highestPriority.id,
                    type: highestPriority.type,
                    relevanceScore: highestPriority.scoring ? highestPriority.scoring.relevanceScore : 0.5
                } : null
            },
            decision: {
                responseDirection: responseDirection,
                confidence: confidence,
                suggestedApproach: suggestedApproach
            },
            generatedAt: new Date().toISOString()
        };
    }
};