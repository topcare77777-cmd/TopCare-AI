/**
 * TOPCARE AI PLATFORM V3 — URL SECURITY & NORMALIZATION UTILITY
 * Path: assets/js/core/utils/url.util.js
 */

export class UrlUtil {
    /**
     * Sanitasi dan validasi URL skema web
     * @param {string} rawUrl 
     * @param {string} fallback 
     * @returns {string} Safe validated URL
     */
    static sanitizeWebUrl(rawUrl, fallback = '#') {
        if (!rawUrl || typeof rawUrl !== 'string') return fallback;
        const trimmed = rawUrl.trim();
        try {
            const parsed = new URL(trimmed, window.location.origin);
            if (['https:', 'http:'].includes(parsed.protocol)) {
                return parsed.href;
            }
            return fallback;
        } catch {
            return fallback;
        }
    }

    /**
     * Sanitasi dan validasi email mailto
     * @param {string} rawEmail 
     * @param {string} fallback 
     * @returns {string} Safe mailto URL
     */
    static sanitizeMailto(rawEmail, fallback = '#') {
        if (!rawEmail || typeof rawEmail !== 'string') return fallback;
        const trimmed = rawEmail.trim();
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailPattern.test(trimmed) ? `mailto:${trimmed}` : fallback;
    }

    /**
     * Normalisasi nomor dan bentuk URL WhatsApp resmi
     * @param {string} rawPhone 
     * @returns {string} Safe WhatsApp Web URL
     */
    static formatWhatsAppUrl(rawPhone) {
        if (!rawPhone || typeof rawPhone !== 'string') return '#';
        let clean = rawPhone.replace(/[^0-9]/g, '');
        if (clean.startsWith('08')) {
            clean = '628' + clean.slice(2);
        }
        return clean.length >= 8 ? `https://wa.me/${clean}` : '#';
    }
}

export default UrlUtil;