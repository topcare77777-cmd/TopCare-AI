/**
 * TOPCARE AI PLATFORM V2 — NEWSLETTER EVENT HANDLER
 * Path: assets/js/newsletter/newsletter.events.js
 * Status: APPROVED & LOCKED (BUILD 129.N)
 * SRP: UI Event Listener Attachment & State Handling.
 */

import { NewsletterService } from './newsletter.service.js';

export const NewsletterEvents = {
    /**
     * Memasang Event Listener pada Form Newsletter di DOM
     * @param {string} formSelector 
     */
    init(formSelector = '.tc-newsletter-form') {
        const form = document.querySelector(formSelector);
        if (!form) return;

        form.addEventListener('submit', async (e) => {
            e.preventDefault();

            const input = form.querySelector('input[type="email"]');
            const submitBtn = form.querySelector('button');

            if (!input || !submitBtn) return;

            const emailValue = input.value;

            // UI Loading State
            const originalBtnText = submitBtn.innerHTML;
            submitBtn.disabled = true;
            submitBtn.innerHTML = '...';

            // Service Call
            const result = await NewsletterService.subscribe(emailValue, 'footer');

            // Reset UI State
            submitBtn.disabled = false;
            submitBtn.innerHTML = originalBtnText;

            // Feedback State
            if (result.success) {
                input.value = '';
                alert(`✅ ${result.message}`);
            } else {
                alert(`⚠️ ${result.message}`);
            }
        });
    }
};

export default NewsletterEvents;