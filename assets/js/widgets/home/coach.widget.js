/**
 * -----------------------------------------------------------------
 * TOPCARE AI PLATFORM - ARCHITECTURE METADATA
 * -----------------------------------------------------------------
 * Layer        : Widget Layer
 * Status       : ACTIVE
 * Version      : 2.4.0
 * Architecture : Development Constitution v1.1
 * Pattern      : Pure UI Renderer (Memory-Driven)
 * Owner        : Coach Widget
 * Created      : Sprint 46A
 * Last Updated : Sprint 48A.4
 *
 * API :
 *   render(container, memoryState)
 *   refresh(memoryState)
 *   destroy()
 * -----------------------------------------------------------------
 */

import CoachService from '../../services/home/coach.service.js';
import CoachMemory from '../../services/home/coach.memory.js';

const CoachWidget = {
    container: null,
    data: null,
    memory: null,

    async render(container, memoryState = null) {
        if (!container) {
            console.warn("[CoachWidget] container missing");
            return;
        }

        this.container = container;
        this.data = CoachService.getData();
        this.memory = memoryState || CoachMemory.get();

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

        // Extract runtime memory details safely
        const greeting = this.memory?.conversation?.lastGreeting || this.data.sectionDescription || "";
        const identity = this.memory?.identity;
        const displayName = identity?.displayName || "Guest";
        const membershipBadge = identity?.membership ? `Membership: ${identity.membership.toUpperCase()}` : "";

        const coachesHTML = (this.data.coaches || []).map(coach => `
            <div class="coach-card-match">
                <h3 class="coach-name">${coach.name}</h3>
                <p class="coach-specialty">${coach.specialty}</p>
                <p class="coach-bio">${coach.bio}</p>
            </div>
        `).join('');

        wrapper.innerHTML = `
            <div class="coach-header">
                <div class="coach-user-meta" style="margin-bottom: 8px; font-size: 0.9em; opacity: 0.8;">
                    <span class="coach-greeting">${greeting}</span>
                    ${membershipBadge ? `<span class="coach-membership-tag" style="margin-left: 8px; padding: 2px 6px; background: rgba(0,0,0,0.05); border-radius: 4px;">${membershipBadge}</span>` : ""}
                </div>
                <span class="coach-badge">${this.data.badge || ''}</span>
                <h2 class="coach-title">${this.data.sectionTitle || ''}</h2>
                <p class="coach-desc">Welcome back, ${displayName}. Personalized guidance tailored to your temperament and goals.</p>
            </div>
            <div class="coach-grid">${coachesHTML}</div>
        `;

        this.container.appendChild(wrapper);
    },

    async refresh(memoryState = null) {
        this.memory = memoryState || CoachMemory.get();
        if (this.container) {
            await this.render(this.container, this.memory);
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
        this.memory = null;
        this.container = null;
    }
};

export { CoachWidget };