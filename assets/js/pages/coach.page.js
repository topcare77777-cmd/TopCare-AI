/**
 * TOPCARE AI PLATFORM V2 — COACH PAGE CONTROLLER
 * Path: assets/js/pages/coach.page.js
 * Status: ACTIVE - BUILD 139.1 (AI COACH MENU ACTIVATION)
 * SRP: Mounts AI Coach Subsystem Host & Initiates CoachRuntime Execution
 */

import { Core } from '../core/index.js';
import { CoachRuntime } from '../coach/coach.runtime.js';
import { CoachStore } from '../coach/coach.store.js';

export const coachPage = {
    hostContainer: null,
    isMounted: false,

    async mount(container) {
        this.hostContainer = container || document.getElementById('app-host') || document.body;
        Core.Logger.info('[CoachPage] Mounting AI Coach Page Runtime...');

        const selectedCoach = CoachStore.getSelectedCoach();

        // Render Clean AI Coach Host Interface
        this.hostContainer.innerHTML = `
            <div class="tc-coach-page-wrapper" style="max-width: 1000px; margin: 40px auto; padding: 24px; color: #F8FAFC;">
                <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 24px; background: #1E293B; padding: 20px 24px; border-radius: 12px; border: 1px solid #334155;">
                    <div>
                        <span style="font-size: 12px; font-weight: 600; color: #3B82F6; text-transform: uppercase; letter-spacing: 0.5px;">TopCare AI Workspace</span>
                        <h1 style="margin: 4px 0 0 0; font-size: 24px; color: #FFF;">AI Coach Workspace</h1>
                    </div>
                    <button data-action="open-coach" style="background: #3B82F6; color: white; border: none; padding: 10px 18px; border-radius: 8px; font-weight: 600; font-size: 14px; cursor: pointer;">
                        Ganti Coach (${selectedCoach.label})
                    </button>
                </div>

                <div id="tc-coach-runtime-host" style="background: #0F172A; border: 1px solid #334155; border-radius: 12px; min-height: 480px; padding: 32px; text-align: center; display: flex; flex-direction: column; align-items: center; justify-content: center;">
                    <img src="${selectedCoach.avatar}" alt="${selectedCoach.label}" style="width: 96px; height: 96px; border-radius: 50%; border: 3px solid #3B82F6; margin-bottom: 16px; object-fit: cover;" />
                    <h2 style="margin: 0 0 8px 0; color: #FFF; font-size: 22px;">${selectedCoach.label}</h2>
                    <p style="margin: 0 0 16px 0; color: #3B82F6; font-size: 14px; font-weight: 500;">${selectedCoach.subtitle}</p>
                    <p style="max-width: 520px; color: #94A3B8; font-size: 14px; line-height: 1.6; margin-bottom: 24px;">
                        ${selectedCoach.description}
                    </p>
                    <div style="background: #1E293B; padding: 16px 24px; border-radius: 8px; border: 1px solid #334155; font-size: 13px; color: #CBD5E1;">
                        💬 Sesi konsultasi dengan ${selectedCoach.label} siap dimulai. Klik tombol di atas jika ingin mengganti tipe mentor.
                    </div>
                </div>
            </div>
        `;

        // Initialize CoachRuntime on host
        CoachRuntime.init(this.hostContainer);
        this.isMounted = true;
        Core.Logger.info('[CoachPage] AI Coach Page Runtime successfully mounted.');
    },

    async unmount() {
        this.destroy();
    },

    destroy() {
        if (!this.isMounted) return;

        CoachRuntime.destroy();
        if (this.hostContainer) {
            this.hostContainer.innerHTML = '';
        }
        this.hostContainer = null;
        this.isMounted = false;
        Core.Logger.info('[CoachPage] Unmounted & destroyed.');
    }
};

export default coachPage;
