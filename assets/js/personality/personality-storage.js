/**
 * @file personality-storage.js
 * @description Local storage persistence manager and history state queries.
 * @module Personality/Storage
 */

const STORAGE_KEY = "topcare-personality-test-v2";

export const PersonalityStorage = {
    /**
     * Saves quiz result object to localStorage.
     * @param {Object} resultObject 
     */
    save(resultObject) {
        try {
            localStorage.setItem(STORAGE_KEY, JSON.stringify(resultObject));
        } catch (error) {
            console.error("PersonalityStorage save error:", error);
        }
    },

    /**
     * Loads raw result object from localStorage.
     * @returns {Object|null}
     */
    load() {
        try {
            const data = localStorage.getItem(STORAGE_KEY);
            return data ? JSON.parse(data) : null;
        } catch (error) {
            console.error("PersonalityStorage load error:", error);
            return null;
        }
    },

    /**
     * Clears stored results from localStorage.
     */
    clear() {
        try {
            localStorage.removeItem(STORAGE_KEY);
        } catch (error) {
            console.error("PersonalityStorage clear error:", error);
        }
    },

    /**
     * Checks if a result record exists in storage.
     * @returns {boolean}
     */
    exists() {
        return this.load() !== null;
    },

    /**
     * Validates if test has been successfully completed.
     * @returns {boolean}
     */
    hasCompleted() {
        const data = this.load();
        return data !== null && Boolean(data.primaryType);
    },

    /**
     * Retrieves the last saved test result report.
     * @returns {Object|null}
     */
    getLastResult() {
        return this.load();
    }
};