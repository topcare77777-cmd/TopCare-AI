/**
 * file: assets/js/pages/personality.page.js
 * Version: 137.0.0
 * Status: APPROVED & LOCKED
 * SRP: Pure View Conductor for Personality Domain Landing & Result View.
 */

import { Core } from '../core/index.js';
import { PersonalityRuntime } from '../personality/personality.runtime.js';

export const personalityPage = {
    _host: null,

    /**
     * Executes pre-enter checks or data fetching before DOM mounting.
     */
    async beforeEnter() {
        Core.Logger.info("[PersonalityPage] Lifecycle: Executing beforeEnter...");
    },

    /**
     * Initializes host element reference.
     * @param {HTMLElement} hostElement 
     */
    async init(hostElement) {
        this._host = hostElement;
        Core.Logger.info("[PersonalityPage] Lifecycle: Initialized with host container.");
    },

    /**
     * Mounts the landing page view into the dynamic Shell container.
     * @param {HTMLElement} hostElement 
     */
    async mount(hostElement) {
        this._host = hostElement || this._host;
        if (!this._host) return;

        const hasTestResult = PersonalityRuntime.hasResult();
        const profile = hasTestResult ? PersonalityRuntime.getProfile() : null;

        this._host.innerHTML = `
            <div class="tc-personality-page-container" style="padding: 40px 20px; max-width: 900px; margin: 0 auto; text-align: center;">
                <div class="tc-personality-header" style="margin-bottom: 32px;">
                    <span class="tc-badge" style="background: rgba(37, 99, 235, 0.1); color: #2563eb; padding: 4px 12px; border-radius: 20px; font-size: 12px; font-weight: 600;">TopCare Intelligence</span>
                    <h1 style="font-size: 28px; color: #0f172a; margin: 12px 0 8px 0;">Analisis Kecerdasan Karakter & Personality</h1>
                    <p style="color: #64748b; font-size: 14px; max-width: 600px; margin: 0 auto;">Pahami tipe temperamen dominan Anda (Koleris, Sanguinis, Melankolis, Plegmatis) untuk memaksimalkan bimbingan AI Coach.</p>
                </div>

                ${hasTestResult && profile ? `
                    <div class="tc-result-card" style="background: #ffffff; border: 1px solid #e2e8f0; border-radius: 12px; padding: 24px; margin-bottom: 32px; box-shadow: 0 4px 6px -1px rgba(0,0,0,0.05); text-align: left;">
                        <h3 style="margin: 0 0 12px 0; font-size: 18px; color: #0f172a;">Hasil Analisis Kepribadian Anda</h3>
                        <div style="display: flex; gap: 16px; align-items: center; margin-bottom: 16px;">
                            <div style="background: #2563eb; color: #ffffff; padding: 12px 20px; border-radius: 8px; font-weight: 700; font-size: 18px;">
                                ${profile.primaryType || 'Terdeteksi'}
                            </div>
                            <div>
                                <div style="font-size: 12px; color: #64748b;">Tipe Utama / Dominan</div>
                                <div style="font-size: 14px; font-weight: 600; color: #1e293b;">${profile.secondaryType ? `Sekunder: ${profile.secondaryType}` : 'Karakter Tunggal Dominan'}</div>
                            </div>
                        </div>
                        <div style="font-size: 12px; color: #94a3b8;">
                            Terakhir diperbarui: ${profile.completedAt ? new Date(profile.completedAt).toLocaleDateString('id-ID') : 'Sesi Aktif'}
                        </div>
                    </div>
                ` : ''}

                <div class="tc-action-box" style="background: #f8fafc; border: 1px dashed #cbd5e1; border-radius: 12px; padding: 32px;">
                    <h3 style="margin: 0 0 8px 0; font-size: 18px; color: #1e293b;">${hasTestResult ? 'Ingin Mengulang Tes Kepribadian?' : 'Belum Melakukan Tes Kepribadian?'}</h3>
                    <p style="margin: 0 0 20px 0; font-size: 13px; color: #64748b;">Tes ini membutuhkan waktu sekitar 3–5 menit dengan pilihan pertanyaan terstandarisasi.</p>
                    <a href="#/personality-test" class="btn-primary" style="display: inline-block; padding: 12px 28px; background-color: #2563eb; color: #ffffff; text-decoration: none; border-radius: 6px; font-weight: 600; font-size: 14px;">
                        ${hasTestResult ? 'Ulangi Tes Kepribadian' : 'Mulai Tes Sekarang'}
                    </a>
                </div>
            </div>
        `;
    },

    /**
     * Post-mounting lifecycle hook.
     */
    async afterEnter() {
        Core.Logger.info("[PersonalityPage] Lifecycle: Executing afterEnter...");
    },

    /**
     * Cleans up resources when unmounted.
     */
    async destroy() {
        Core.Logger.info("[PersonalityPage] Lifecycle: Destroying Page Instance...");
        if (this._host) {
            this._host.innerHTML = '';
            this._host = null;
        }
    }
};

export default personalityPage;