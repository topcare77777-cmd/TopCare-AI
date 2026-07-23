/**
 * TopCare AI Platform V2.0.0
 * Trusted Renderer (Null-Safe & Sanitized)
 * Path: assets/js/renderers/trusted.renderer.js
 */

import BaseRenderer from './base.renderer.js';

const TrustedRenderer = {
    render(data) {
        if (!data) return '';
        console.log("[TrustedRenderer] HTML generated");

        const titleText = BaseRenderer.sanitize(data.title || 'Trusted by industry leaders worldwide');
        const companies = data.companies || [];

        const logosHtml = companies.map(company => `
            <div class="trusted__logo glass-card" data-animate="scale">
                <svg viewBox="0 0 24 24"><path d="${BaseRenderer.sanitize(company.svgPath || 'M12 2L2 7l10 5 10-5-10-5z')}"/></svg>
                <span>${BaseRenderer.sanitize(company.name || '')}</span>
            </div>
        `).join('');

        return `
            <section class="trusted" data-animate="fade-up">
                <div class="trusted__container">
                    <h3 class="trusted__title">${titleText}</h3>
                    <div class="trusted__marquee-track">
                        ${logosHtml}
                        ${logosHtml}
                    </div>
                </div>
            </section>
        `;
    }
};

export default TrustedRenderer;