// assets/js/coach/memory/coach-memory-engine.js
/**
 * @file coach-memory-engine.js
 * @description Core business logic layer managing AI Coach long-term memory lifecycle.
 * @module Coach/Memory/Engine
 */

import { CoachMemoryStorage } from './coach-memory-storage.js';
import { CoachMemoryModel } from './coach-memory-model.js';

let memoryState = null;

export const CoachMemoryEngine = {

    initialize() {
        const stored = CoachMemoryStorage.load();

        if (stored && CoachMemoryModel.validate(stored)) {
            memoryState = stored;
        } else {
            memoryState = CoachMemoryModel.createDefault();
            CoachMemoryStorage.save(memoryState);
        }

        return true;
    },

    getMemory() {
        if (!memoryState) {
            this.initialize();
        }

        return {
            ...memoryState,
            memories: [...memoryState.memories],
            learningHistory: [...memoryState.learningHistory]
        };
    },

    addMemory(type, content, importance = "medium") {
        if (!memoryState) {
            this.initialize();
        }

        const entry = CoachMemoryModel.createEntry(
            type,
            content,
            importance
        );

        memoryState.memories.unshift(entry);
        memoryState.updatedAt = new Date().toISOString();

        CoachMemoryStorage.save(memoryState);

        return entry;
    },

    getAllMemories() {
        if (!memoryState) {
            this.initialize();
        }

        return [...memoryState.memories];
    },

    getMemoriesByType(type) {
        if (!memoryState) {
            this.initialize();
        }

        return memoryState.memories.filter(
            memory => memory.type === type
        );
    },

    updateMemory(id, updates = {}) {
        if (!memoryState) {
            this.initialize();
        }

        let updated = false;

        memoryState.memories = memoryState.memories.map(memory => {
            if (memory.id === id) {
                updated = true;

                return {
                    ...memory,
                    ...updates,
                    updatedAt: new Date().toISOString()
                };
            }

            return memory;
        });

        if (updated) {
            memoryState.updatedAt = new Date().toISOString();
            CoachMemoryStorage.save(memoryState);
        }

        return updated;
    },

    removeMemory(id) {
        if (!memoryState) {
            this.initialize();
        }

        const before = memoryState.memories.length;

        memoryState.memories =
            memoryState.memories.filter(
                memory => memory.id !== id
            );

        const removed =
            memoryState.memories.length !== before;

        if (removed) {
            memoryState.updatedAt = new Date().toISOString();
            CoachMemoryStorage.save(memoryState);
        }

        return removed;
    },

    addLearningHistory(record = {}) {
        if (!memoryState) {
            this.initialize();
        }

        memoryState.learningHistory.push({
            ...record,
            timestamp: new Date().toISOString()
        });

        memoryState.updatedAt = new Date().toISOString();

        CoachMemoryStorage.save(memoryState);

        return true;
    },

    clear() {
        memoryState = CoachMemoryModel.createDefault();

        CoachMemoryStorage.save(memoryState);

        return true;
    }
};