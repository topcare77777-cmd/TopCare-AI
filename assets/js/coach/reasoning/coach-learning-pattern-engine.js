// assets/js/coach/reasoning/coach-learning-pattern-engine.js
/**
 * @file coach-learning-pattern-engine.js
 * @description Detects user learning patterns, preferred paces, and consistency trends from read-only memory and learning history.
 * @module Coach/Reasoning/LearningPatternEngine
 */

import { CoachMemoryIntegration } from '../memory/coach-memory-integration.js';

export const CoachLearningPatternEngine = {
    detectPatterns() {
        let memoryContext = null;
        let learningHistory = [];

        try {
            memoryContext = CoachMemoryIntegration.getMemoryContext();
        } catch (e) {
            memoryContext = { memorySnapshot: { memories: [] }, memoryProfile: { learningHistory: [] } };
        }

        try {
            learningHistory = CoachMemoryIntegration.getRecentLearningContext(20);
        } catch (e) {
            learningHistory = [];
        }

        const memories = memoryContext?.memorySnapshot?.memories || [];
        const profileHistory = memoryContext?.memoryProfile?.learningHistory || [];
        const combinedHistory = [...learningHistory, ...profileHistory];

        // 1. Analyze consistency based on frequency of recent entries
        let consistencyLevel = "medium";
        let engagementLevel = "medium";
        let preferredPace = "balanced";

        if (combinedHistory.length > 10) {
            consistencyLevel = "high";
            engagementLevel = "high";
            preferredPace = "intensive";
        } else if (combinedHistory.length < 3) {
            consistencyLevel = "low";
            engagementLevel = "low";
            preferredPace = "gradual";
        }

        // 2. Identify specific behavior/learning patterns
        const detectedPatterns = [];

        if (combinedHistory.length >= 5) {
            detectedPatterns.push({
                type: "consistent_engagement",
                confidence: "high"
            });
        } else {
            detectedPatterns.push({
                type: "sporadic_engagement",
                confidence: "medium"
            });
        }

        // Check for repeated struggle tags in memories
        const struggleMemories = memories.filter(m =>
            m.type === "learning" &&
            JSON.stringify(m.content).toLowerCase().includes("struggle")
        );

        if (struggleMemories.length > 0) {
            detectedPatterns.push({
                type: "needs_reinforcement",
                confidence: "high"
            });
        }

        // 3. Derive recommended learning strategy
        let suggestedStrategy = "standard_progression";
        if (preferredPace === "intensive") {
            suggestedStrategy = "accelerated_modules";
        } else if (struggleMemories.length > 0) {
            suggestedStrategy = "remedial_breakdown";
        }

        // 4. Assemble output contract
        return {
            patternId: "pattern_" + Date.now() + "_" + Math.floor(Math.random() * 1000),
            learningProfile: {
                preferredPace: preferredPace,
                consistencyLevel: consistencyLevel,
                engagementLevel: engagementLevel
            },
            detectedPatterns: detectedPatterns,
            recommendations: {
                suggestedStrategy: suggestedStrategy
            },
            generatedAt: new Date().toISOString()
        };
    }
};