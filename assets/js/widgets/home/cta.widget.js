/**
 * -----------------------------------------------------------------
 * TOPCARE AI PLATFORM - ARCHITECTURE METADATA
 * -----------------------------------------------------------------
 * Layer        : Widget Layer
 * Status       : ACTIVE
 * Version      : 2.3.0
 * Architecture : Development Constitution v1.1
 * Pattern      : Pure UI Renderer
 * Owner        : CTA Widget
 * Created      : Sprint 46A
 * Last Updated : Sprint 46A.10
 *
 * API :
 *   render(container)
 *   refresh()
 *   destroy()
 * -----------------------------------------------------------------
 */

import CTAService from '../../services/home/cta.service.js';

const CTAWidget = {
    container: null,
    data: null,

    async render(container) {
        if (!container) {
            console.warn("[CTAWidget] container missing");
            return;
        }

        this.container = container;
        this.data = CTAService.getData();

        if (!this.data) {
            console.warn("[CTAWidget] data missing");
            return;
        }

        if (typeof this.container.replaceChildren === 'function') {
            this.container.replaceChildren();
        } else {
            this.container.innerHTML = '';
        }

        const wrapper = document.createElement('section');
        wrapper.className = 'cta-section-match';
        wrapper.innerHTML = `
            <div class="cta-inner-container">
                <h2 class="cta-heading">${this.data.heading || ''}</h2>
                <p class="cta-subheading">${this.data.subheading || ''}</p>
                <a href="${this.data.buttonAction || '#'}" class="cta-button">${this.data.buttonText || 'Get Started'}</a>
            </div>
        `;

        this.container.appendChild(wrapper);
    },

    async refresh() {
        CTAService.clearCache();
        this.data = CTAService.getData();
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

export { CTAWidget };