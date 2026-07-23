/**
 * TopCare AI Platform V2.0.0
 * CTA Renderer (Null-Safe & Sanitized)
 * Path: assets/js/renderers/cta.renderer.js
 */

import BaseRenderer from './base.renderer.js';

const CtaRenderer = {
    render(data) {
        if (!data) return '';
        console.log("[CtaRenderer] HTML generated");

        const titleText = BaseRenderer.sanitize(data.title || 'Ready to Transform Your Workflow with AI?');
        const subtitleText = BaseRenderer.sanitize(data.subtitle || '');
        
        const buttonsHtml = (data.buttons || []).map(btn => `
            <a href="${BaseRenderer.sanitize(btn.link || '#')}" class="btn btn-${BaseRenderer.sanitize(btn.style || 'primary')}" aria-label="${BaseRenderer.sanitize(btn.text || '')}">${BaseRenderer.sanitize(btn.text || '')}</a>
        `).join('');

        return `
            <section class="cta" data-animate="scale">
                <div class="cta__box glass-card animate-gradient">
                    <h2 class="cta__title">${titleText}</h2>
                    <p class="cta__desc">${subtitleText}</p>
                    <div class="cta__actions">
                        ${buttonsHtml}
                    </div>
                </div>
            </section>
        `;
    }
};

export default CtaRenderer;