/**
 * @file personality-utils.js
 * @description Utility helpers for formatting, strings, security, and time delays.
 * @module Personality/Utils
 */

export const PersonalityUtils = {
    /**
     * Escapes HTML characters to prevent XSS.
     * @param {string} str 
     * @returns {string}
     */
    escapeHtml(str) {
        if (!str) return "";
        return String(str)
            .replace(/&/g, "&amp;")
            .replace(/</g, "&lt;")
            .replace(/>/g, "&gt;")
            .replace(/"/g, "&quot;")
            .replace(/'/g, "&#039;");
    },

    /**
     * Pauses execution for a specified duration.
     * @param {number} ms 
     * @returns {Promise<void>}
     */
    delay(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    },

    /**
     * Formats a number to a percentage string.
     * @param {number} value 
     * @returns {string}
     */
    formatPercentage(value) {
        return `${Number(value).toFixed(1)}%`;
    },

    /**
     * Generates a pseudo-unique identifier string.
     * @returns {string}
     */
    createUUID() {
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, c => {
            const r = Math.random() * 16 | 0;
            const v = c === 'x' ? r : (r & 0x3 | 0x8);
            return v.toString(16);
        });
    }
};