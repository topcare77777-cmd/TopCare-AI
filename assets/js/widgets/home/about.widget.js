/**
 * -----------------------------------------------------------------
 * TOPCARE AI PLATFORM - ARCHITECTURE METADATA
 * -----------------------------------------------------------------
 * Layer        : Widget Layer
 * Status       : ACTIVE
 * Version      : 2.3.0
 * Architecture : Development Constitution v1.1
 * Pattern      : Pure UI Renderer
 * Owner        : About Widget
 * Created      : Sprint 46A
 * Last Updated : Sprint 46A.10
 *
 * API :
 *   render(container)
 *   refresh()
 *   destroy()
 * -----------------------------------------------------------------
 */

import AboutService from '../../services/home/about.service.js';

const AboutWidget = {
    container: null,
    data: null,

    async render(container) {
        if (!container) {
            console.warn("[AboutWidget] container missing");
            return;
        }

        this.container = container;
        this.data = AboutService.getData();

        if (!this.data) {
            console.warn("[AboutWidget] data missing");
            return;
        }

        if (typeof this.container.replaceChildren === 'function') {
            this.container.replaceChildren();
        } else {
            this.container.innerHTML = '';
        }

        const wrapper = document.createElement('section');
        wrapper.className = 'about-section-match';

        const highlightsHTML = (this.data.highlights || []).map(item => `
            <li class="about-highlight-item">${item}</li>
        `).join('');

        wrapper.innerHTML = `
            <div class="about-content">
                <h2 class="about-title">${this.data.title || ''}</h2>
                <p class="about-subtitle">${this.data.subtitle || ''}</p>
                <p class="about-desc">${this.data.description || ''}</p>
                <ul class="about-highlights-list">${highlightsHTML}</ul>
            </div>
        `;

        this.container.appendChild(wrapper);
    },

    async refresh() {
        AboutService.clearCache();
        this.data = AboutService.getData();
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

export { AboutWidget };