// assets/js/coach/memory/coach-memory-model.js
/**
 * @file coach-memory-model.js
 * @description Defines the data structure schema, validation rules, and default templates for long-term coach memory.
 * @module Coach/Memory/Model
 */

export const CoachMemoryModel = {
    createDefault() {
        const timestamp = new Date().toISOString();
        return {
            version: "1.0",
            userId: null,
            memories: [],
            preferences: {},
            learningHistory: [],
            interactionPatterns: {},
            createdAt: timestamp,
            updatedAt: timestamp
        };
    },

    createEntry(type = "preference", content = {}, importance = "medium") {
        return {
            id: "mem_" + Date.now() + "_" + Math.floor(Math.random() * 1000),
            type: type, // 'preference' | 'learning' | 'behavior' | 'achievement'
            content: content,
            importance: importance, // 'low' | 'medium' | 'high'
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString()
        };
    },

    validate(data) {
        if (!data || typeof data !== "object") return false;
        if (!Array.isArray(data.memories)) return false;
        if (!data.preferences || typeof data.preferences !== "object") return false;
        if (!Array.isArray(data.learningHistory)) return false;
        return true;
    }
};