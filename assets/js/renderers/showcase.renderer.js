/**
 * TopCare AI Platform V2.0.0
 * Product Showcase Renderer (Section 5)
 * Path: assets/js/renderers/showcase.renderer.js
 */
import BaseRenderer from '../core/base.renderer.js';
import Logger from '../core/logger.js';

const ShowcaseRenderer = {
    render(data) {
        if (!data) return '';
        Logger.info("[ShowcaseRenderer] HTML generated");

        const tagText = BaseRenderer.sanitize(data.tag || 'Interactive Preview');
        const titleText = BaseRenderer.sanitize(data.title || 'Experience Next-Gen Intelligence');

        const tabsHtml = (data.tabs || []).map((tab, index) => `
            <button class="showcase__tab ${index === 0 ? 'active' : ''}" data-tab-target="tab-${index}" role="tab" aria-selected="${index === 0 ? 'true' : 'false'}">
                ${BaseRenderer.sanitize(tab.label || '')}
            </button>
        `).join('');

        const contentsHtml = (data.tabs || []).map((tab, index) => `
            <div class="showcase__pane ${index === 0 ? 'active' : ''}" id="tab-${index}" role="tabpanel">
                <div class="showcase__mockup-content glass-card">
                    <h3 class="showcase__pane-title">${BaseRenderer.sanitize(tab.title || '')}</h3>
                    <p class="showcase__pane-desc">${BaseRenderer.sanitize(tab.description || '')}</p>
                    <div class="showcase__pane-preview">
                        <div class="showcase__pulse-dot"></div>
                        <span>${BaseRenderer.sanitize(tab.status || 'Live AI Engine Active')}</span>
                    </div>
                </div>
            </div>
        `).join('');

        return `
            <section id="showcase" class="showcase">
                <div class="showcase__container">
                    <div class="showcase__header" data-animate="fade-up">
                        <span class="showcase__tag">${tagText}</span>
                        <h2 class="showcase__title">${titleText}</h2>
                    </div>
                    <div class="showcase__browser glass-card" data-animate="scale">
                        <div class="showcase__browser-header">
                            <div class="showcase__dots">
                                <span class="showcase__dot red"></span>
                                <span class="showcase__dot yellow"></span>
                                <span class="showcase__dot green"></span>
                            </div>
                            <div class="showcase__tabs" role="tablist">
                                ${tabsHtml}
                            </div>
                        </div>
                        <div class="showcase__browser-body">
                            ${contentsHtml}
                        </div>
                    </div>
                </div>
            </section>
        `;
    }
};

export default ShowcaseRenderer;