/**
 * TOPCARE AI PLATFORM V2 — NEWSLETTER VALIDATOR
 * Path: assets/js/newsletter/newsletter.validator.js
 * Status: APPROVED & LOCKED (BUILD 129.N)
 * SRP: Pure Email Syntax & Domain Validation.
 */

export const NewsletterValidator = {
    /**
     * Memeriksa sintaks email berdasarkan standar RFC 5322
     * @param {string} email 
     * @returns {boolean}
     */
    isValidEmail(email) {
        if (!email || typeof email !== 'string') return false;
        const cleanEmail = email.trim();
        if (cleanEmail.length === 0 || cleanEmail.length > 254) return false;

        // Standard Email Regex
        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        return emailRegex.test(cleanEmail);
    },

    /**
     * Sanitasi input email untuk mencegah XSS/Injection
     * @param {string} email 
     * @returns {string}
     */
    sanitizeEmail(email) {
        if (!email) return '';
        return email.trim().toLowerCase().replace(/[<>'"\\]/g, '');
    }
};

export default NewsletterValidator;