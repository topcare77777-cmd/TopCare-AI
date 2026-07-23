/**
 * TopCare AI Platform V2.0.0
 * FAQ Renderer (Section 8)
 * Path: assets/js/renderers/faq.renderer.js
 */
import BaseRenderer from './base.renderer.js';
import Logger from '../core/logger.js';

const FaqRenderer = {
    render(data) {
        if (!data) return '';
        Logger.info("[FaqRenderer] HTML generated");

        const tagText = BaseRenderer.sanitize(data.tag || 'Got Questions?');
        const titleText = BaseRenderer.sanitize(data.title || 'Frequently Asked Questions');

        const faqsHtml = (data.faqs || []).map((faq, index) => `
            <div class="faq__item glass-card" data-animate="fade-up">
                <button class="faq__question" aria-expanded="false" aria-controls="faq-answer-${index}">
                    <span>${BaseRenderer.sanitize(faq.question || '')}</span>
                    <span class="faq__icon" aria-hidden="true">+</span>
                </button>
                <div class="faq__answer" id="faq-answer-${index}" role="region">
                    <p>${BaseRenderer.sanitize(faq.answer || '')}</p>
                </div>
            </div>
        `).join('');

        return `
            <section id="faq" class="faq">
                <div class="faq__container">
                    <div class="faq__header" data-animate="fade-up">
                        <span class="faq__tag">${tagText}</span>
                        <h2 class="faq__title">${titleText}</h2>
                    </div>
                    <div class="faq__list">
                        ${faqsHtml}
                    </div>
                </div>
            </section>
        `;
    }
};

export default FaqRenderer;