/**
 * -----------------------------------------------------------------
 * TOPCARE AI PLATFORM - ARCHITECTURE METADATA
 * -----------------------------------------------------------------
 * Layer        : Widget Layer
 * Status       : ACTIVE
 * Version      : 2.3.0
 * Architecture : Development Constitution v1.1
 * Pattern      : Pure UI Renderer
 * Owner        : Footer Widget
 * Created      : Sprint 46A
 * Last Updated : Sprint 46A.10
 *
 * API :
 *   render(container)
 *   refresh()
 *   destroy()
 * -----------------------------------------------------------------
 */

import FooterService from '../../services/home/footer.service.js';

const FooterWidget = {
    container: null,
    data: null,

    async render(container) {
        if (!container) {
            console.warn("[FooterWidget] container missing");
            return;
        }

        this.container = container;
        this.data = FooterService.getData();

        if (!this.data) {
            console.warn("[FooterWidget] data missing");
            return;
        }

        if (typeof this.container.replaceChildren === 'function') {
            this.container.replaceChildren();
        } else {
            this.container.innerHTML = '';
        }

        const wrapper = document.createElement('footer');
        wrapper.className = 'footer-section-match';

        const linksHTML = (this.data.links || []).map(link => `
            <a href="${link.url}" class="footer-link">${link.label}</a>
        `).join('');

        wrapper.innerHTML = `
            <div class="footer-content">
                <p class="footer-tagline">${this.data.brandTagline || ''}</p>
                <div class="footer-links">${linksHTML}</div>
                <p class="footer-copyright">${this.data.copyright || ''}</p>
            </div>
        `;

        this.container.appendChild(wrapper);
    },

    async refresh() {
        FooterService.clearCache();
        this.data = FooterService.getData();
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

export { FooterWidget };