// assets/js/coach/reasoning/coach-reasoning-integration.js
/**
 * @file coach-reasoning-integration.js
 * @description Single reasoning integration facade combining memory scoring, context reasoning, and learning pattern analytics into a unified cognitive profile.
 * @module Coach/Reasoning/ReasoningIntegration
 */

import { CoachMemoryScoring } from './coach-memory-scoring.js';
import { CoachContextReasoningEngine } from './coach-context-reasoning-engine.js';
import { CoachLearningPatternEngine } from './coach-learning-pattern-engine.js';

export const CoachReasoningIntegration = {
    getUnifiedCognitiveProfile(inputContext = {}) {
        const currentTopic = inputContext.topic || null;

        // 1. Gather outputs from isolated reasoning sub-modules with graceful fallback handling
        let memoryInsights = {};
        try {
            const prioritized = CoachMemoryScoring.prioritizeMemories(currentTopic);
            memoryInsights = {
                totalScored: prioritized.length,
                topPriority: prioritized.length > 0 ? prioritized[0] : null
            };
        } catch (e) {
            memoryInsights = { error: "Unavailable" };
        }

        let contextDecision = {};
        try {
            contextDecision = CoachContextReasoningEngine.synthesizeContext(inputContext);
        } catch (e) {
            contextDecision = { error: "Unavailable" };
        }

        let learningPatterns = {};
        try {
            learningPatterns = CoachLearningPatternEngine.detectPatterns();
        } catch (e) {
            learningPatterns = { error: "Unavailable" };
        }

        // 2. Synthesize final unified recommendations
        const responseStrategy = contextDecision?.decision?.responseDirection || "standard_guidance";
        const learningStrategy = learningPatterns?.recommendations?.suggestedStrategy || "standard_progression";
        const confidence = contextDecision?.decision?.confidence || "medium";

        // 3. Assemble final unified cognitive profile contract
        return {
            profileId: "profile_" + Date.now() + "_" + Math.floor(Math.random() * 1000),
            reasoningProfile: {
                contextDecision: contextDecision,
                memoryInsights: memoryInsights,
                learningPatterns: learningPatterns
            },
            finalRecommendation: {
                responseStrategy: responseStrategy,
                learningStrategy: learningStrategy,
                confidence: confidence
            },
            generatedAt: new Date().toISOString()
        };
    }
};