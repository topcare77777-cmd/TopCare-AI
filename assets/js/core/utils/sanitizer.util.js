/**
 * TOPCARE AI PLATFORM V3 — DOM SANITIZER UTILITY
 * Path: assets/js/core/utils/sanitizer.util.js
 */

export class SanitizerUtil {
    /**
     * Escape special HTML characters to prevent XSS injection
     * @param {string|number|null|undefined} str 
     * @returns {string} Safe plain text string
     */
    static escapeHTML(str) {
        if (str === null || str === undefined) return '';
        return String(str)
            .replace(/&/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;')
            .replace(/"/g, '&quot;')
            .replace(/'/g, '&#039;');
    }
}

export default SanitizerUtil;