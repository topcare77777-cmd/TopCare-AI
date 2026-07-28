/**
 * -----------------------------------------------------------------
 * TOPCARE AI PLATFORM - ARCHITECTURE METADATA
 * -----------------------------------------------------------------
 * Layer        : Widget Layer
 * Status       : ACTIVE
 * Version      : 2.3.0
 * Architecture : Development Constitution v1.1
 * Pattern      : Pure UI Renderer
 * Owner        : Coach Widget
 * Created      : Sprint 46A
 * Last Updated : Sprint 46A.10
 *
 * API :
 *   render(container)
 *   refresh()
 *   destroy()
 * -----------------------------------------------------------------
 */

import CoachService from '../../services/home/coach.service.js';

const CoachWidget = {
    container: null,
    data: null,

    async render(container) {
        if (!container) {
            console.warn("[CoachWidget] container missing");
            return;
        }

        this.container = container;
        this.data = CoachService.getData();

        if (!this.data) {
            console.warn("[CoachWidget] data missing");
            return;
        }

        if (typeof this.container.replaceChildren === 'function') {
            this.container.replaceChildren();
        } else {
            this.container.innerHTML = '';
        }

        const wrapper = document.createElement('section');
        wrapper.className = 'coach-section-match';

        const coachesHTML = (this.data.coaches || []).map(coach => `
            <div class="coach-card-match">
                <h3 class="coach-name">${coach.name}</h3>
                <p class="coach-specialty">${coach.specialty}</p>
                <p class="coach-bio">${coach.bio}</p>
            </div>
        `).join('');

        wrapper.innerHTML = `
            <div class="coach-header">
                <span class="coach-badge">${this.data.badge || ''}</span>
                <h2 class="coach-title">${this.data.sectionTitle || ''}</h2>
                <p class="coach-desc">${this.data.sectionDescription || ''}</p>
            </div>
            <div class="coach-grid">${coachesHTML}</div>
        `;

        this.container.appendChild(wrapper);
    },

    async refresh() {
        CoachService.clearCache();
        this.data = CoachService.getData();
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

export { CoachWidget };