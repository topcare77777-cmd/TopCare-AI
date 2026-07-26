// assets/js/coach/memory/coach-memory-integration.js
/**
 * @file coach-memory-integration.js
 * @description Integration facade exposing AI Coach memory capabilities through a stable read-only contract.
 * @module Coach/Memory/Integration
 */

import { CoachMemoryAdapter } from './coach-memory-adapter.js';

export const CoachMemoryIntegration = {

    getMemoryContext() {
        let snapshot = null;
        let profile = null;
        let summary = null;
        let recent = [];

        try {
            snapshot = CoachMemoryAdapter.getSnapshot();
        } catch (e) {
            snapshot = {
                memories: [],
                preferences: {},
                learningHistory: [],
                interactionPatterns: {}
            };
        }

        try {
            profile = CoachMemoryAdapter.getUserMemoryProfile();
        } catch (e) {
            profile = {
                preferences: {},
                learningHistory: [],
                behaviors: [],
                achievements: []
            };
        }

        try {
            summary = CoachMemoryAdapter.getMemorySummary();
        } catch (e) {
            summary = {
                totalMemories: 0,
                highImportance: 0,
                latestMemory: null
            };
        }

        try {
            recent = CoachMemoryAdapter.getLatestMemories(5);
        } catch (e) {
            recent = [];
        }

        return {
            memorySnapshot: snapshot,
            memoryProfile: profile,
            recentMemories: recent,
            summary: summary,
            ready: true,
            generatedAt: new Date().toISOString()
        };
    },

    getRecentLearningContext(limit = 5) {
        try {
            return CoachMemoryAdapter
                .getLatestMemories(limit)
                .filter(memory =>
                    memory.type === "learning"
                );
        } catch (e) {
            return [];
        }
    },

    getBehaviorProfile() {
        try {
            return CoachMemoryAdapter
                .getUserMemoryProfile()
                .behaviors;
        } catch (e) {
            return [];
        }
    },

    getAchievementHistory() {
        try {
            return CoachMemoryAdapter
                .getUserMemoryProfile()
                .achievements;
        } catch (e) {
            return [];
        }
    }
};