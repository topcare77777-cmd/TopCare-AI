/**
 * TopCare AI Platform V2.0.0
 * Testimonials Renderer (Success Stories Module)
 * Path: assets/js/renderers/testimonials.renderer.js
 */
import BaseRenderer from './base.renderer.js';
import Logger from '../core/logger.js';

const TestimonialsRenderer = {
    render(data) {
        if (!data) return '';
        Logger.info("[TestimonialsRenderer] HTML generated");

        const tagText = BaseRenderer.sanitize(data.tag || 'Success Stories');
        const titleText = BaseRenderer.sanitize(data.title || 'Trusted by Industry Pioneers');

        const testimonials = data.testimonials || [];
        const itemsHtml = testimonials.map(item => `
            <div class="testimonials__card glass-card" data-animate="scale">
                <div class="testimonials__rating" aria-label="${BaseRenderer.sanitize(String(item.rating || 5))} out of 5 stars">
                    ${'★'.repeat(parseInt(item.rating || 5, 10))}
                </div>
                <p class="testimonials__quote">"${BaseRenderer.sanitize(item.quote || '')}"</p>
                <div class="testimonials__author">
                    <div class="testimonials__author-info">
                        <h4 class="testimonials__name">${BaseRenderer.sanitize(item.name || '')}</h4>
                        <span class="testimonials__role">${BaseRenderer.sanitize(item.role || '')} at <strong>${BaseRenderer.sanitize(item.company || '')}</strong></span>
                    </div>
                </div>
            </div>
        `).join('');

        return `
            <section id="testimonials" class="testimonials">
                <div class="testimonials__container">
                    <div class="testimonials__header" data-animate="fade-up">
                        <span class="testimonials__tag">${tagText}</span>
                        <h2 class="testimonials__title">${titleText}</h2>
                    </div>
                    <div class="testimonials__marquee-container" data-animate="fade-up">
                        <div class="testimonials__marquee-track">
                            ${itemsHtml}
                            ${itemsHtml}
                        </div>
                    </div>
                </div>
            </section>
        `;
    }
};

export default TestimonialsRenderer;