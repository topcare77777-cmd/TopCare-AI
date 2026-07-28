/**
 * -----------------------------------------------------------------
 * TOPCARE AI PLATFORM - ARCHITECTURE METADATA
 * -----------------------------------------------------------------
 * Layer        : Widget Layer
 * Status       : ACTIVE
 * Version      : 2.3.0
 * Architecture : Development Constitution v1.1
 * Pattern      : Pure UI Renderer
 * Owner        : Feature Widget
 * Created      : Sprint 46A
 * Last Updated : Sprint 46A.10
 *
 * API :
 *   render(container)
 *   refresh()
 *   destroy()
 * -----------------------------------------------------------------
 */

import FeatureService from '../../services/home/feature.service.js';

const FeatureWidget = {
    container: null,
    data: null,

    async render(container) {
        if (!container) {
            console.warn("[FeatureWidget] container missing");
            return;
        }

        this.container = container;
        this.data = FeatureService.getData();

        if (!this.data) {
            console.warn("[FeatureWidget] data missing");
            return;
        }

        if (typeof this.container.replaceChildren === 'function') {
            this.container.replaceChildren();
        } else {
            this.container.innerHTML = '';
        }

        const wrapper = document.createElement('section');
        wrapper.className = 'feature-section-match';

        const featuresHTML = (this.data.features || []).map(feat => `
            <div class="feature-card-match">
                <h3 class="feature-title">${feat.title}</h3>
                <p class="feature-desc">${feat.description}</p>
            </div>
        `).join('');

        wrapper.innerHTML = `
            <div class="feature-header">
                <h2 class="feature-section-title">${this.data.sectionTitle || ''}</h2>
                <p class="feature-section-desc">${this.data.sectionDescription || ''}</p>
            </div>
            <div class="feature-grid">${featuresHTML}</div>
        `;

        this.container.appendChild(wrapper);
    },

    async refresh() {
        FeatureService.clearCache();
        this.data = FeatureService.getData();
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

export { FeatureWidget };