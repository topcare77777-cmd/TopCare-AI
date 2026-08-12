/**
 * TOPCARE AI PLATFORM V2
 * Path: assets/js/pages/coach-selection.page.js
 * Status: MIGRATED TO AUTHORITATIVE APP-ROUTER
 */
import { appRouter } from '../core/router/app-router.js';

export class CoachSelectionPage {
    constructor(container) {
        this.container = container || document.getElementById('app') || document.body;
    }
    renderPage() {
        return `
            <div class="coach-selection-page" style="padding: 2rem; text-align: center;">
                <h2>Pilih Coach Kamu</h2>
                <button id="btn-select-coach" style="margin-top: 1rem; padding: 0.5rem 1rem;">Mulai Sesi Coach</button>
            </div>
        `;
    }
    async mount(target) {
        const container = target || this.container;
        container.innerHTML = this.renderPage();

        const btn = document.getElementById('btn-select-coach');
        if (btn) {
            btn.addEventListener('click', () => {
                appRouter.navigate('/coach');
            });
        }
    }
    destroy() { }
}
export default CoachSelectionPage;