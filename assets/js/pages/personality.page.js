/**
 * TOPCARE AI PLATFORM V3 — PERSONALITY ASSESSMENT HUB
 * Path: assets/js/pages/personality.page.js
 * Status: V3-FIX-07.3 UNIVERSAL FACTORY COMPATIBLE
 */

import { PersonalityBootstrap } from '../personality/personality.bootstrap.js';

export class PersonalityPage {
    constructor() {
        this.currentView = 'hub';
    }

    renderHub() {
        return `
            <div class="tc-personality-hub-wrapper" style="padding: clamp(1rem, 4vh, 3rem) 1rem; max-width: 1100px; margin: 0 auto; color: #f8fafc;">
                <!-- HEADER HUB -->
                <div class="tc-hub-header" style="text-align: center; margin-bottom: clamp(1.5rem, 4vh, 2.5rem);">
                    <span style="background: rgba(37, 99, 235, 0.2); color: #60a5fa; padding: 0.5rem 1rem; border-radius: 20px; font-size: 0.85rem; font-weight: 600; border: 1px solid rgba(59, 130, 246, 0.3);">
                        🧠 TopCare Assessment Center
                    </span>
                    <h1 style="font-size: clamp(1.5rem, 5vw, 2.25rem); font-weight: 800; margin-top: 0.75rem; margin-bottom: 0.75rem;">
                        Pilih Jenis Tes Kepribadian Anda
                    </h1>
                    <p style="color: #94a3b8; max-width: 650px; margin: 0 auto; line-height: 1.6; font-size: clamp(0.85rem, 3vw, 1rem);">
                        Pahami potensi diri, dinamika energi, dan karakter unik Anda melalui metode asesmen AI yang dirancang interaktif.
                    </p>
                </div>

                <!-- GRID 3 PILIHAN TES -->
                <div class="tc-hub-grid" style="display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 1.5rem;">
                    
                    <!-- MENU 1: INTROVERT VS EKSTROVERT -->
                    <div class="tc-hub-card" style="background: rgba(30, 41, 59, 0.7); border: 1px solid rgba(255, 255, 255, 0.1); border-radius: 16px; padding: 1.5rem; display: flex; flex-direction: column; justify-content: space-between;">
                        <div>
                            <div style="font-size: 2.25rem; margin-bottom: 1rem;">🔋</div>
                            <h3 style="font-size: 1.15rem; font-weight: 700; margin-bottom: 0.5rem;">Tes Energi Introvert vs Ekstrovert</h3>
                            <p style="color: #94a3b8; font-size: 0.85rem; line-height: 1.5; margin-bottom: 1.5rem;">Pelajari bagaimana Anda mengisi ulang energi mental dan interaksi sosial Anda.</p>
                        </div>
                        <a href="#/test-energy" style="display: inline-block; text-align: center; padding: 0.75rem; background: rgba(255, 255, 255, 0.08); color: #60a5fa; border: 1px solid rgba(96, 165, 250, 0.3); border-radius: 10px; font-weight: 600; text-decoration: none;">
                            Mulai Tes Energi →
                        </a>
                    </div>

                    <!-- MENU 2: 4 TEMPERAMEN KEPRIBADIAN -->
                    <div class="tc-hub-card" style="background: rgba(30, 41, 59, 0.9); border: 1px solid #3b82f6; border-radius: 16px; padding: 1.5rem; display: flex; flex-direction: column; justify-content: space-between; position: relative; box-shadow: 0 10px 25px rgba(37, 99, 235, 0.25);">
                        <span style="position: absolute; top: -10px; right: 20px; background: #2563eb; color: #fff; font-size: 0.7rem; padding: 0.2rem 0.6rem; border-radius: 12px; font-weight: 700;">Rekomendasi Utama</span>
                        <div>
                            <div style="font-size: 2.25rem; margin-bottom: 1rem;">🎭</div>
                            <h3 style="font-size: 1.15rem; font-weight: 700; margin-bottom: 0.5rem;">Tes 4 Temperamen Utama</h3>
                            <p style="color: #94a3b8; font-size: 0.85rem; line-height: 1.5; margin-bottom: 1.5rem;">Identifikasi dominasi tipe kepribadian Anda: Koleris, Sanguinis, Melankolis, atau Plegmatis.</p>
                        </div>
                        <button id="btn-start-real-test" type="button" style="display: block; width: 100%; text-align: center; padding: 0.75rem; background: #2563eb; color: #ffffff; border: none; border-radius: 10px; font-weight: 600; cursor: pointer; box-shadow: 0 4px 12px rgba(37, 99, 235, 0.3);">
                            Mulai Tes 4 Temperamen →
                        </button>
                    </div>

                    <!-- MENU 3: TES MBTI -->
                    <div class="tc-hub-card" style="background: rgba(30, 41, 59, 0.7); border: 1px solid rgba(255, 255, 255, 0.1); border-radius: 16px; padding: 1.5rem; display: flex; flex-direction: column; justify-content: space-between;">
                        <div>
                            <div style="font-size: 2.25rem; margin-bottom: 1rem;">🔍</div>
                            <h3 style="font-size: 1.15rem; font-weight: 700; margin-bottom: 0.5rem;">Tes Tipe MBTI (16 Kepribadian)</h3>
                            <p style="color: #94a3b8; font-size: 0.85rem; line-height: 1.5; margin-bottom: 1.5rem;">Temukan kode 4-huruf MBTI Anda (seperti INTJ, ENFP, INFJ).</p>
                        </div>
                        <a href="#/test-mbti" style="display: inline-block; text-align: center; padding: 0.75rem; background: rgba(255, 255, 255, 0.08); color: #60a5fa; border: 1px solid rgba(96, 165, 250, 0.3); border-radius: 10px; font-weight: 600; text-decoration: none;">
                            Mulai Tes MBTI →
                        </a>
                    </div>

                </div>
            </div>
        `;
    }

    async mount(container) {
        const app = container || document.getElementById('app');
        if (!app) return;

        this.currentView = 'hub';
        app.innerHTML = this.renderHub();

        const btnStart = document.getElementById('btn-start-real-test');
        if (btnStart) {
            btnStart.addEventListener('click', async (e) => {
                e.preventDefault();
                app.innerHTML = '';
                try {
                    if (PersonalityBootstrap && typeof PersonalityBootstrap.bootstrap === 'function') {
                        await PersonalityBootstrap.bootstrap(app);
                    } else if (PersonalityBootstrap && typeof PersonalityBootstrap.init === 'function') {
                        await PersonalityBootstrap.init(app);
                    }
                } catch (err) {
                    console.error('[PersonalityHubPage] Gagal memuat engine V1:', err);
                    app.innerHTML = `
                        <div style="text-align: center; color: #f8fafc; padding: 3rem;">
                            <h3>⚠️ Gagal memuat modul tes 4 temperamen.</h3>
                            <p style="color: #94a3b8; margin-top: 0.5rem;">${err.message}</p>
                            <a href="#/personality" onclick="window.location.reload()" style="display: inline-block; margin-top: 1rem; padding: 0.6rem 1.2rem; background: #2563eb; color: #fff; text-decoration: none; border-radius: 8px; font-weight: 600;">Muat Ulang Halaman</a>
                        </div>
                    `;
                }
            });
        }

        window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    destroy() {
        this.currentView = 'hub';
    }
}

export const PersonalityHubPage = PersonalityPage;
export default PersonalityPage;