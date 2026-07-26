// assets/js/coach/memory/coach-memory-adapter.js
/**
 * @file coach-memory-adapter.js
 * @description Safe read-only access layer exposing structured memory data to external AI Coach modules.
 * @module Coach/Memory/Adapter
 */

import { CoachMemoryEngine } from './coach-memory-engine.js';

export const CoachMemoryAdapter = {

    getSnapshot() {
        let memory = null;

        try {
            memory = CoachMemoryEngine.getMemory();
        } catch (e) {
            memory = null;
        }

        const safeMemory = memory || {
            memories: [],
            preferences: {},
            learningHistory: [],
            interactionPatterns: {}
        };

        return {
            memories: [...safeMemory.memories],
            preferences: {
                ...safeMemory.preferences
            },
            learningHistory: [
                ...safeMemory.learningHistory
            ],
            interactionPatterns: {
                ...safeMemory.interactionPatterns
            },
            retrievedAt: new Date().toISOString()
        };
    },

    getRelevantMemories(filter = {}) {
        const memories = this.getSnapshot().memories;

        return memories.filter(memory => {
            if (filter.type && memory.type !== filter.type) {
                return false;
            }

            if (filter.importance && memory.importance !== filter.importance) {
                return false;
            }

            return true;
        });
    },

    getLatestMemories(limit = 5) {
        return this
            .getSnapshot()
            .memories
            .slice(0, limit);
    },

    getMemorySummary() {
        const memories = this.getSnapshot().memories;

        return {
            totalMemories: memories.length,
            highImportance: memories.filter(m => m.importance === "high").length,
            latestMemory: memories.length > 0 ? memories[0] : null
        };
    },

    getUserMemoryProfile() {
        const snapshot = this.getSnapshot();

        return {
            preferences: snapshot.preferences,
            learningHistory: snapshot.learningHistory,
            behaviors: snapshot.memories.filter(m => m.type === "behavior"),
            achievements: snapshot.memories.filter(m => m.type === "achievement")
        };
    }
};