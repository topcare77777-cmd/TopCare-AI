// assets/js/personality/personality-storage.js
/**
 * @file personality-storage.js
 * @description Storage layer for Personality Test V2.
 * @module Personality/Storage
 */

const PERSONALITY_STORAGE_KEY = "topcare-personality-test-v2";

export const PersonalityStorage = {
    save(data) {
        try {
            const payload = {
                userName: data.userName || "",
                ageGroup: data.ageGroup || "",
                answers: data.answers || {},
                report: data.report || null,
                timestamp: new Date().toISOString()
            };
            localStorage.setItem(PERSONALITY_STORAGE_KEY, JSON.stringify(payload));
            return true;
        } catch (e) {
            console.error("Failed to save personality assessment:", e);
            return false;
        }
    },

    load() {
        try {
            const raw = localStorage.getItem(PERSONALITY_STORAGE_KEY);
            if (!raw) return null;
            return JSON.parse(raw);
        } catch (e) {
            console.error("Failed to load personality assessment:", e);
            return null;
        }
    }
};