/**
 * -----------------------------------------------------------------
 * TOPCARE AI PLATFORM - ARCHITECTURE METADATA
 * -----------------------------------------------------------------
 * Layer        : Widget Layer
 * Status       : ACTIVE
 * Version      : 2.3.1 (SPRINT 1A CANONICAL RELEASE)
 * Architecture : Development Constitution v1.1
 * Pattern      : Pure UI Renderer
 * Owner        : Hero Widget
 * Created      : Sprint 46A
 * Last Updated : Sprint 46A.11
 *
 * API :
 *   render(container)
 *   refresh()
 *   destroy()
 * -----------------------------------------------------------------
 */

import HeroService from '../../services/home/hero.service.js';

const HeroWidget = {
    container: null,
    data: null,

    async render(container) {
        if (!container) {
            console.warn("[HeroWidget] container missing");
            return;
        }

        this.container = container;
        this.data = HeroService.getData();

        if (!this.data) {
            console.warn("[HeroWidget] data missing");
            return;
        }

        if (typeof this.container.replaceChildren === 'function') {
            this.container.replaceChildren();
        } else {
            this.container.innerHTML = '';
        }

        const wrapper = document.createElement('section');
        wrapper.className = 'hero-section-match';
        wrapper.innerHTML = `
            <div class="hero-content-wrapper">
                <span class="hero-badge">${this.data.badge || ''}</span>
                <h1 class="hero-title-match">${this.data.title || ''}</h1>
                <p class="hero-subtitle">${this.data.subtitle || ''}</p>
                <div class="hero-actions">
                    <a href="${this.data.ctaLink || '#'}" data-action="open-coach" class="hero-cta-primary">${this.data.ctaText || 'Get Started'}</a>
                    <a href="${this.data.secondaryCtaLink || '#'}" class="hero-cta-secondary">${this.data.secondaryCtaText || 'Learn More'}</a>
                </div>
            </div>
        `;

        this.container.appendChild(wrapper);
    },

    async refresh() {
        HeroService.clearCache();
        this.data = HeroService.getData();
        if (this.container) {
            await this.render(this.container);
        }
    },

    destroy() {
        if (!this.container) return;

        if (typeof this.container.replaceChildren === 'function') {
            this.container.replaceChildren();
        } else {
            this.container.innerHTML = '';
        }

        this.data = null;
        this.container = null;
    }
};

export { HeroWidget };
