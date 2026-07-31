/**
 * file: assets/js/pages/personality.page.js
 * Version: 137.1.0
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
            <div class="tc-personality-page-container" style="padding: -180px 20px; max-width: 900px; margin: 0 auto; text-align: center;">
                <div class="tc-personality-header" style="margin-bottom: 32px;">
                    <span class="tc-badge" style="background: rgba(56, 189, 248, 0.15); color: #38bdf8; border: 1px solid rgba(56, 189, 248, 0.3); padding: 6px 16px; border-radius: 20px; font-size: 13px; font-weight: 600;">TopCare Intelligence Engine</span>
                    <h1 style="font-size: 2.25rem; color: #ffffff; margin: 16px 0 12px 0; font-weight: 800;">Analisis Kecerdasan Karakter & Personality</h1>
                    <p style="color: #94a3b8; font-size: 1rem; max-width: 640px; margin: 0 auto; line-height: 1.6;">Pahami tipe temperamen dominan Anda (Koleris, Sanguinis, Melankolis, Plegmatis) untuk memaksimalkan bimbingan AI Coach secara personal.</p>
                </div>

                ${hasTestResult && profile ? `
                    <div class="tc-result-card" style="background: rgba(30, 41, 59, 0.6); backdrop-filter: blur(16px); border: 1px solid rgba(255, 255, 255, 0.1); border-radius: 16px; padding: 28px; margin-bottom: 32px; text-align: left; box-shadow: 0 10px 30px rgba(0,0,0,0.3);">
                        <h3 style="margin: 0 0 16px 0; font-size: 1.15rem; color: #ffffff;">Hasil Analisis Kepribadian Anda</h3>
                        <div style="display: flex; gap: 16px; align-items: center; margin-bottom: 16px;">
                            <div style="background: linear-gradient(135deg, #2563eb 0%, #7c3aed 100%); color: #ffffff; padding: 12px 24px; border-radius: 10px; font-weight: 700; font-size: 18px; box-shadow: 0 4px 14px rgba(37, 99, 235, 0.4);">
                                ${profile.primaryType || 'Terdeteksi'}
                            </div>
                            <div>
                                <div style="font-size: 12px; color: #94a3b8;">Tipe Utama / Dominan</div>
                                <div style="font-size: 15px; font-weight: 600; color: #f8fafc;">${profile.secondaryType ? `Sekunder: ${profile.secondaryType}` : 'Karakter Tunggal Dominan'}</div>
                            </div>
                        </div>
                        <div style="font-size: 12px; color: #64748b;">
                            Terakhir diperbarui: ${profile.completedAt ? new Date(profile.completedAt).toLocaleDateString('id-ID') : 'Sesi Aktif'}
                        </div>
                    </div>
                ` : ''}

                <div class="tc-action-box" style="background: rgba(15, 23, 42, 0.7); border: 1px dashed rgba(255, 255, 255, 0.15); border-radius: 16px; padding: 40px 24px;">
                    <h3 style="margin: 0 0 10px 0; font-size: 1.25rem; color: #ffffff;">${hasTestResult ? 'Ingin Mengulang Tes Kepribadian?' : 'Belum Melakukan Tes Kepribadian?'}</h3>
                    <p style="margin: 0 0 24px 0; font-size: 0.95rem; color: #94a3b8;">Tes ini membutuhkan waktu sekitar 3–5 menit dengan pilihan pertanyaan terstandarisasi.</p>
                    <a href="#/personality-test" class="btn-primary" style="display: inline-block; padding: 12px 32px; background: linear-gradient(135deg, #2563eb 0%, #7c3aed 100%); color: #ffffff; text-decoration: none; border-radius: 999px; font-weight: 600; font-size: 0.95rem; box-shadow: 0 4px 14px rgba(37, 99, 235, 0.35);">
                        ${hasTestResult ? 'Ulangi Tes Kepribadian' : 'Mulai Tes Sekarang'}
                    </a>
                </div>
            </div>
        `;
    },

    /**
     * Post-mounting lifecycle hook.
     * Pemicu utama agar render/mount otomatis berjalan saat dipanggil Router V2!
     */
    async afterEnter() {
        Core.Logger.info("[PersonalityPage] Lifecycle: Executing afterEnter...");
        // Memastikan HTML tercetak saat Router memanggil afterEnter
        await this.mount(this._host);
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