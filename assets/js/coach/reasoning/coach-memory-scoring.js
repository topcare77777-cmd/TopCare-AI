// assets/js/coach/reasoning/coach-memory-scoring.js
/**
 * @file coach-memory-scoring.js
 * @description Evaluates memory relevance, calculates dynamic importance weights, and prioritizes memories for reasoning.
 * @module Coach/Reasoning/MemoryScoring
 */

import { CoachMemoryIntegration } from '../memory/coach-memory-integration.js';

export const CoachMemoryScoring = {
    scoreMemoryEntry(memoryEntry, currentTopic = null) {
        if (!memoryEntry || typeof memoryEntry !== 'object') {
            return null;
        }

        let relevanceScore = 0.5;
        let frequencyLevel = "medium";
        let confidence = "medium";

        // 1. Evaluate baseline importance weight
        const importance = (memoryEntry.importance || "medium").toLowerCase();
        if (importance === "high") {
            relevanceScore += 0.3;
            confidence = "high";
        } else if (importance === "low") {
            relevanceScore -= 0.2;
            confidence = "low";
        }

        // 2. Evaluate topic relevance match if currentTopic is provided
        if (currentTopic && memoryEntry.content) {
            const topicStr = currentTopic.toLowerCase();
            const contentStr = JSON.stringify(memoryEntry.content).toLowerCase();

            if (contentStr.includes(topicStr)) {
                relevanceScore += 0.2;
            }
        }

        // 3. Recency factor based on updatedAt or createdAt
        const timestamp = memoryEntry.updatedAt || memoryEntry.createdAt;
        if (timestamp) {
            const ageInDays = (Date.now() - new Date(timestamp).getTime()) / (1000 * 60 * 60 * 24);
            if (ageInDays < 3) {
                relevanceScore += 0.1;
                frequencyLevel = "high";
            } else if (ageInDays > 30) {
                relevanceScore -= 0.1;
                frequencyLevel = "low";
            }
        }

        // Clamp score between 0.0 and 1.0
        relevanceScore = Math.max(0.0, Math.min(1.0, Number(relevanceScore.toFixed(2))));

        return {
            memoryId: memoryEntry.id || "unknown",
            relevanceScore: relevanceScore,
            frequencyLevel: frequencyLevel,
            confidence: confidence,
            scoredAt: new Date().toISOString()
        };
    },

    prioritizeMemories(currentTopic = null) {
        let memoryContext = null;
        try {
            memoryContext = CoachMemoryIntegration.getMemoryContext();
        } catch (e) {
            memoryContext = { memorySnapshot: { memories: [] } };
        }

        const memories = memoryContext?.memorySnapshot?.memories || [];

        const scoredMemories = memories.map(entry => {
            const evaluation = this.scoreMemoryEntry(entry, currentTopic);
            return {
                ...entry,
                scoring: evaluation
            };
        });

        // Sort descending by relevance score
        scoredMemories.sort((a, b) => b.scoring.relevanceScore - a.scoring.relevanceScore);

        return scoredMemories.map((entry, index) => ({
            ...entry,
            scoring: {
                ...entry.scoring,
                priorityRank: index + 1
            }
        }));
    }
};