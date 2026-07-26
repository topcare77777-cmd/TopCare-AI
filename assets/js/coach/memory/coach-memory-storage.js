// assets/js/coach/memory/coach-memory-storage.js
/**
 * @file coach-memory-storage.js
 * @description LocalStorage persistence abstraction layer for AI Coach long-term memory and history records.
 * @module Coach/Memory/Storage
 */

const MEMORY_STORAGE_KEY = "topcare-ai-coach-memory-v1";

export const CoachMemoryStorage = {
    load() {
        try {
            const raw = localStorage.getItem(MEMORY_STORAGE_KEY);
            if (!raw) return null;
            return JSON.parse(raw);
        } catch (e) {
            console.error("Failed to load coach memory storage:", e);
            return null;
        }
    },

    save(memoryData) {
        try {
            localStorage.setItem(MEMORY_STORAGE_KEY, JSON.stringify(memoryData));
            return true;
        } catch (e) {
            console.error("Failed to save coach memory storage:", e);
            return false;
        }
    },

    exists() {
        try {
            return localStorage.getItem(MEMORY_STORAGE_KEY) !== null;
        } catch (e) {
            return false;
        }
    },

    clear() {
        try {
            localStorage.removeItem(MEMORY_STORAGE_KEY);
            return true;
        } catch (e) {
            console.error("Failed to clear coach memory storage:", e);
            return false;
        }
    }
};