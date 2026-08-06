/**
 * TOPCARE AI PLATFORM V2 — NEWSLETTER SERVICE
 * Path: assets/js/newsletter/newsletter.service.js
 * Status: APPROVED & LOCKED (BUILD 129.N)
 * SRP: Asynchronous Fetch Client for Newsletter Subscriptions.
 */

import { NEWSLETTER_CONFIG } from './newsletter.config.js';
import { NewsletterValidator } from './newsletter.validator.js';

export const NewsletterService = {
    /**
     * Mengirimkan DTO email subscriber ke Endpoint Provider External
     * @param {string} rawEmail 
     * @param {string} source 
     * @returns {Promise<{success: boolean, message: string}>}
     */
    async subscribe(rawEmail, source = 'footer') {
        const email = NewsletterValidator.sanitizeEmail(rawEmail);

        // 1. Validasi Sintaks Email
        if (!NewsletterValidator.isValidEmail(email)) {
            return {
                success: false,
                message: NEWSLETTER_CONFIG.messages.invalidEmail
            };
        }

        // 2. Persiapan Payload DTO
        const payload = {
            email: email,
            subscribedAt: new Date().toISOString(),
            source: source,
            locale: navigator.language || 'id'
        };

        // 3. Eksekusi Request Fetch dengan Timeout
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), NEWSLETTER_CONFIG.timeoutMs);

        try {
            const response = await fetch(NEWSLETTER_CONFIG.apiEndpoint, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify(payload),
                signal: controller.signal
            });

            clearTimeout(timeoutId);

            if (response.ok) {
                return {
                    success: true,
                    message: NEWSLETTER_CONFIG.messages.success
                };
            } else {
                return {
                    success: false,
                    message: NEWSLETTER_CONFIG.messages.serverError
                };
            }
        } catch (error) {
            clearTimeout(timeoutId);
            if (error.name === 'AbortError') {
                return {
                    success: false,
                    message: 'Waktu koneksi habis. Harap coba lagi.'
                };
            }
            return {
                success: false,
                message: NEWSLETTER_CONFIG.messages.networkError
            };
        }
    }
};

export default NewsletterService;