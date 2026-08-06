/**
 * TOPCARE AI PLATFORM V2 — COACH PAGE LIFECYCLE
 * Path: assets/js/pages/coach.page.js
 * Status: APPROVED & LOCKED (BUILD 128 — UPGRADE)
 * SRP: Conductor for Unified Coach TopCare AI Companion View.
 */

import { CoachRenderer } from '../coach/coach.renderer.js';

export class CoachPage {
    constructor() {
        this.container = null;
    }

    async beforeEnter() {}

    mount(hostElement) {
        this.container = hostElement || document.getElementById('app');
        if (!this.container) return;

        this.container.innerHTML = `
            <div class="tc-coach-page-wrapper">
                <header class="tc-coach-page-header">
                    <span class="tc-coach-page-badge">AI Companion Platform</span>
                    <h1 class="tc-coach-page-title">Coach TopCare AI</h1>
                    <p class="tc-coach-page-desc">Pendamping pribadi Anda dalam memahami potensi kepribadian dan menavigasi jalur belajar Artificial Intelligence.</p>
                </header>
                ${CoachRenderer.renderCard()}
            </div>
        `;

        window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    unmount() {
        if (this.container) {
            this.container.innerHTML = '';
        }
        this.container = null;
    }
}

export default CoachPage;