/**
 * TOPCARE AI PLATFORM V3 — ABOUT PAGE
 * Path: assets/js/pages/about.page.js
 * Status: OPTIMIZED (LIGHTWEIGHT ICON-BASED UI, ZERO IMAGE OVERHEAD)
 */

import { FooterRenderer } from '../renderers/footer.renderer.js';

export class AboutPage {
    constructor(container) {
        this.container = container || document.getElementById('app') || document.body;
    }

    async mount(target) {
        const container = target || this.container;
        const footerHtml = await FooterRenderer.render();

        container.innerHTML = `
            <div style="min-height: 100vh; background: #030712; color: #fff;">
                <section style="max-width: 1000px; margin: 0 auto; padding: 4rem 1.5rem; text-align: center;">
                    <div style="display: inline-block; padding: 0.3rem 0.9rem; border-radius: 9999px; background: rgba(56, 189, 248, 0.15); border: 1px solid rgba(56, 189, 248, 0.3); color: #38bdf8; font-size: 0.85rem; font-weight: 700; margin-bottom: 1.5rem;">
                        Tentang TopCare AI
                    </div>
                    <h1 style="font-size: 2.5rem; font-weight: 800; margin-bottom: 1rem; letter-spacing: -0.5px;">
                        Platform Pembelajaran Personality Plus
                    </h1>
                    <p style="color: #94a3b8; max-width: 750px; margin: 0 auto 3.5rem auto; font-size: 1.05rem; line-height: 1.7;">
                        TopCare AI adalah platform pembelajaran Personality Plus karya Florence Littauer yang membantu pengguna memahami karakter diri, meningkatkan komunikasi, kepemimpinan, hubungan, dan pengembangan diri melalui pengalaman belajar yang sederhana dan terstruktur.
                    </p>

                    <!-- 3 Pillar Value Cards (Pure CSS + Lightweight Icons) -->
                    <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(260px, 1fr)); gap: 1.5rem; text-align: center; margin-bottom: 4rem;">
                        <div style="background: rgba(15, 23, 42, 0.7); border: 1px solid rgba(255, 255, 255, 0.08); border-radius: 16px; padding: 2.5rem 1.5rem;">
                            <div style="font-size: 2.5rem; margin-bottom: 1rem; color: #f43f5e;">🎯</div>
                            <h3 style="font-size: 1.2rem; font-weight: 700; margin-bottom: 0.5rem; color: #f8fafc;">Misi</h3>
                            <p style="color: #94a3b8; font-size: 0.9rem; line-height: 1.5; margin: 0;">Memberdayakan diri melalui pemahaman kepribadian yang autentik dan mendalam.</p>
                        </div>

                        <div style="background: rgba(15, 23, 42, 0.7); border: 1px solid rgba(255, 255, 255, 0.08); border-radius: 16px; padding: 2.5rem 1.5rem;">
                            <div style="font-size: 2.5rem; margin-bottom: 1rem; color: #f97316;">👥</div>
                            <h3 style="font-size: 1.2rem; font-weight: 700; margin-bottom: 0.5rem; color: #f8fafc;">Komunitas</h3>
                            <p style="color: #94a3b8; font-size: 0.9rem; line-height: 1.5; margin: 0;">Belajar bersama dalam lingkungan yang positif, inklusif, dan suportif.</p>
                        </div>

                        <div style="background: rgba(15, 23, 42, 0.7); border: 1px solid rgba(255, 255, 255, 0.08); border-radius: 16px; padding: 2.5rem 1.5rem;">
                            <div style="font-size: 2.5rem; margin-bottom: 1rem; color: #8b5cf6;">🛡️</div>
                            <h3 style="font-size: 1.2rem; font-weight: 700; margin-bottom: 0.5rem; color: #f8fafc;">Kualitas</h3>
                            <p style="color: #94a3b8; font-size: 0.9rem; line-height: 1.5; margin: 0;">Menyajikan konten berkualitas tinggi dan kurikulum pembelajaran terbaik.</p>
                        </div>
                    </div>
                </section>

                ${footerHtml}
            </div>
        `;
    }

    destroy() {
        if (this.container) {
            this.container.innerHTML = '';
        }
    }
}

export default AboutPage;