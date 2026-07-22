/**
 * TopCare AI Platform V2.0.0
 * Pricing Renderer with Monthly/Yearly Toggle Support
 * Path: assets/js/renderers/pricing.renderer.js
 */

import BaseRenderer from '../core/base.renderer.js';
import Logger from '../core/logger.js';

const PricingRenderer = {
    render(data) {
        if (!data) return '';
        Logger.info("[PricingRenderer] HTML generated");

        const tagText = BaseRenderer.sanitize(data.tag || 'Transparent Pricing');
        const titleText = BaseRenderer.sanitize(data.title || 'Invest in Scalable Intelligence');

        const plansHtml = (data.plans || []).map(plan => {
            const isFeatured = plan.featured ? 'pricing__card--featured glass-card' : 'pricing__card glass-card';
            const badgeHtml = plan.badge ? `<span class="pricing__badge">${BaseRenderer.sanitize(plan.badge)}</span>` : '';
            const featuresHtml = (plan.features || []).map(feat => `<li>✓ ${BaseRenderer.sanitize(feat)}</li>`).join('');

            return `
                <div class="${isFeatured}" data-animate="scale">
                    ${badgeHtml}
                    <h3 class="pricing__plan-title">${BaseRenderer.sanitize(plan.name || '')}</h3>
                    <p class="pricing__plan-desc">${BaseRenderer.sanitize(plan.description || '')}</p>
                    <div class="pricing__amount" data-monthly="${BaseRenderer.sanitize(plan.price || '0')}" data-yearly="${BaseRenderer.sanitize(plan.yearlyPrice || plan.price || '0')}">
                        <span class="pricing__price-value">${BaseRenderer.sanitize(plan.price || '0')}</span>
                        <span class="pricing__period">${BaseRenderer.sanitize(plan.period || '/mo')}</span>
                    </div>
                    <ul class="pricing__features">
                        ${featuresHtml}
                    </ul>
                    <a href="${BaseRenderer.safeURL(plan.buttonLink)}" class="btn btn-${BaseRenderer.sanitize(plan.buttonStyle || 'secondary')} pricing__btn">${BaseRenderer.sanitize(plan.buttonText || 'Choose Plan')}</a>
                </div>
            `;
        }).join('');

        return `
            <section id="pricing" class="pricing">
                <div class="pricing__container">
                    <div class="pricing__header" data-animate="fade-up">
                        <span class="pricing__tag">${tagText}</span>
                        <h2 class="pricing__title">${titleText}</h2>
                        <div class="pricing__toggle-wrapper">
                            <span class="pricing__toggle-label active" id="monthly-label">Monthly</span>
                            <label class="pricing__switch" aria-label="Toggle billing frequency">
                                <input type="checkbox" id="pricing-toggle">
                                <span class="pricing__slider"></span>
                            </label>
                            <span class="pricing__toggle-label" id="yearly-label">Yearly <small style="color:var(--color-accent-cyan)">(Save 20%)</small></span>
                        </div>
                    </div>
                    <div class="pricing__grid">
                        ${plansHtml}
                    </div>
                </div>
            </section>
        `;
    }
};

export default PricingRenderer;