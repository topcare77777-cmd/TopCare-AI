// assets/js/coach/personalization/coach-context-storage.js
/**
 * @file coach-context-storage.js
 * @description LocalStorage persistence layer for user personalization context and preferences.
 * @module Coach/Personalization/Storage
 */

const CONTEXT_STORAGE_KEY = "topcare-ai-context-v1";

export const CoachContextStorage = {
    load() {
        try {
            const raw = localStorage.getItem(CONTEXT_STORAGE_KEY);
            if (!raw) return null;
            return JSON.parse(raw);
        } catch (e) {
            console.error("Failed to load coach context storage:", e);
            return null;
        }
    },

    save(contextData) {
        try {
            localStorage.setItem(CONTEXT_STORAGE_KEY, JSON.stringify(contextData));
            return true;
        } catch (e) {
            console.error("Failed to save coach context storage:", e);
            return false;
        }
    },

    clear() {
        try {
            localStorage.removeItem(CONTEXT_STORAGE_KEY);
            return true;
        } catch (e) {
            console.error("Failed to clear coach context storage:", e);
            return false;
        }
    }
};