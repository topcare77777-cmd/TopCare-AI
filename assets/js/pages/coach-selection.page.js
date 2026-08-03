/**
 * TOPCARE AI PLATFORM V2 — COACH SELECTION PAGE
 * Path: assets/js/pages/coach-selection.page.js
 * Status: ACTIVE (BUILD 124.3.5 — COMPATIBILITY FIX)
 * Role: Renders post-login Coach Selection UI and directs user to Workspace.
 */

import { CoachContext } from '../runtime/coach.context.js';
import { Router } from '../router/router.js';

const CoachSelectionPage = {
    activeContainer: null,
    isMounted: false,

    init() {
        // Backward compatibility lifecycle initialization hook
    },

    async beforeEnter() {
        // Lifecycle hook for ViewManager & Router execution
    },

    async mount(container) {
        return await this.render(container);
    },

    async render(container) {
        const targetContainer = container || this.activeContainer || document.getElementById('app-host') || document.body;
        if (!targetContainer) return;

        if (this.isMounted && this.activeContainer === targetContainer) {
            await this.update();
            return;
        }

        if (this.activeContainer !== targetContainer) {
            this.activeContainer = targetContainer;
        }

        this.activeContainer.innerHTML = `
            <div class="tc-coach-selection-wrapper" style="max-width: 800px; margin: 60px auto; padding: 24px; color: #F8FAFC; text-align: center;">
                <div style="margin-bottom: 32px;">
                    <span style="font-size: 13px; font-weight: 600; color: #3B82F6; text-transform: uppercase; letter-spacing: 1px;">TopCare AI Personalization</span>
                    <h1 style="margin: 8px 0; font-size: 28px; color: #FFFFFF;">Pilih AI Coach Anda</h1>
                    <p style="color: #94A3B8; font-size: 15px;">Pilih mentor AI yang paling sesuai dengan gaya bimbingan yang Anda butuhkan.</p>
                </div>

                <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 24px; margin-top: 32px;">
                    <!-- MAYA CARD -->
                    <div style="background: #1E293B; border: 1px solid #334155; border-radius: 16px; padding: 32px 24px; display: flex; flex-direction: column; align-items: center; transition: transform 0.2s, border-color 0.2s;" class="tc-coach-card">
                        <div style="width: 80px; height: 80px; border-radius: 50%; background: #3B82F622; border: 2px solid #3B82F6; display: flex; align-items: center; justify-content: center; font-size: 32px; margin-bottom: 16px;">
                            👩‍⚕️
                        </div>
                        <h2 style="margin: 0 0 4px 0; font-size: 22px; color: #FFFFFF;">MAYA</h2>
                        <span style="font-size: 13px; color: #3B82F6; font-weight: 600; margin-bottom: 12px;">Empathetic AI Coach</span>
                        <p style="font-size: 14px; color: #94A3B8; line-height: 1.5; margin-bottom: 24px;">Fokus pada pendekatan holistik, empati, serta pendampingan emosional & kesehatan mental.</p>
                        <button data-coach="maya" style="width: 100%; background: #3B82F6; color: white; border: none; padding: 12px; border-radius: 8px; font-weight: 600; font-size: 14px; cursor: pointer;">
                            Mulai bersama Maya
                        </button>
                    </div>

                    <!-- ALEX CARD -->
                    <div style="background: #1E293B; border: 1px solid #334155; border-radius: 16px; padding: 32px 24px; display: flex; flex-direction: column; align-items: center; transition: transform 0.2s, border-color 0.2s;" class="tc-coach-card">
                        <div style="width: 80px; height: 80px; border-radius: 50%; background: #10B98122; border: 2px solid #10B981; display: flex; align-items: center; justify-content: center; font-size: 32px; margin-bottom: 16px;">
                            👨‍⚕️
                        </div>
                        <h2 style="margin: 0 0 4px 0; font-size: 22px; color: #FFFFFF;">ALEX</h2>
                        <span style="font-size: 13px; color: #10B981; font-weight: 600; margin-bottom: 12px;">Strategic AI Coach</span>
                        <p style="font-size: 14px; color: #94A3B8; line-height: 1.5; margin-bottom: 24px;">Fokus pada analisis terstruktur, tindakan strategis, dan pencapaian target kesehatan klinis.</p>
                        <button data-coach="alex" style="width: 100%; background: #10B981; color: white; border: none; padding: 12px; border-radius: 8px; font-weight: 600; font-size: 14px; cursor: pointer;">
                            Mulai bersama Alex
                        </button>
                    </div>
                </div>
            </div>
        `;

        this._bindEvents();
        this.isMounted = true;
    },

    async afterEnter() {
        // Lifecycle hook executed after mounting
    },

    _bindEvents() {
        if (!this.activeContainer) return;

        const buttons = this.activeContainer.querySelectorAll('button[data-coach]');
        buttons.forEach(button => {
            button.addEventListener('click', (e) => {
                const coachId = e.currentTarget.getAttribute('data-coach');
                if (CoachContext && typeof CoachContext.setCoach === 'function') {
                    CoachContext.setCoach(coachId);
                }
                Router.navigate('/workspace/coach');
            });
        });
    },

    async update() {
        if (!this.isMounted || !this.activeContainer) return;
        this._bindEvents();
    },

    destroy() {
        if (this.activeContainer) {
            this.activeContainer.innerHTML = '';
        }
        this.activeContainer = null;
        this.isMounted = false;
    }
};

export const coachSelectionPage = CoachSelectionPage;
export default CoachSelectionPage;