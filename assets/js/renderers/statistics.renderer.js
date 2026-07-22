/**
 * TopCare AI Platform V2.0.0
 * Statistics Renderer (Null-Safe & Sanitized)
 * Path: assets/js/renderers/statistics.renderer.js
 */

import BaseRenderer from '../core/base.renderer.js';

const StatisticsRenderer = {
    render(data) {
        if (!data) return '';
        console.log("[StatisticsRenderer] HTML generated");

        const cardsHtml = (data.cards || []).map(card => `
            <div class="statistics__card glass-card" data-animate="fade-up">
                <span class="statistics__value" data-target="${BaseRenderer.sanitize(card.value || '0')}">0</span>
                <span class="statistics__label">${BaseRenderer.sanitize(card.label || '')}</span>
            </div>
        `).join('');

        return `
            <section class="statistics">
                <div class="statistics__container">
                    ${cardsHtml}
                </div>
            </section>
        `;
    }
};

export default StatisticsRenderer;