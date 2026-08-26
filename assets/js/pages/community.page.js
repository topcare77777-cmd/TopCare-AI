/**
 * TOPCARE AI PLATFORM V3 — COMMUNITY PAGE
 * Path: assets/js/pages/community.page.js
 * Status: OPTIMIZED (LIGHTWEIGHT ICON-BASED UI, ZERO IMAGE OVERHEAD)
 */

import { FooterRenderer } from '../renderers/footer.renderer.js';

export class CommunityPage {
    constructor(container) {
        this.container = container || document.getElementById('app') || document.body;
    }

    async mount(target) {
        const container = target || this.container;
        const footerHtml = await FooterRenderer.render();

        container.innerHTML = `
            <div style="min-height: 100vh; background: #030712; color: #fff;">
                <section style="max-width: 1000px; margin: 0 auto; padding: 4rem 1.5rem; text-align: center;">
                    <div style="display: inline-block; padding: 0.3rem 0.9rem; border-radius: 9999px; background: rgba(124, 58, 237, 0.15); border: 1px solid rgba(124, 58, 237, 0.3); color: #c084fc; font-size: 0.85rem; font-weight: 700; margin-bottom: 1.5rem;">
                        Modul Komunitas V2
                    </div>
                    <h1 style="font-size: 2.5rem; font-weight: 800; margin-bottom: 1rem; letter-spacing: -0.5px;">
                        Komunitas Personality Plus
                    </h1>
                    <p style="color: #94a3b8; max-width: 650px; margin: 0 auto 3.5rem auto; font-size: 1.05rem; line-height: 1.6;">
                        Belajar dan bertumbuh bersama memahami Personality Plus karya Florence Littauer serta Empat Temperamen.
                    </p>

                    <!-- 3 Core Feature Cards (Pure CSS + Lightweight Icons) -->
                    <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(260px, 1fr)); gap: 1.5rem; text-align: center; margin-bottom: 4rem;">
                        <div style="background: rgba(15, 23, 42, 0.7); border: 1px solid rgba(255, 255, 255, 0.08); border-radius: 16px; padding: 2.5rem 1.5rem; transition: transform 0.2s ease;">
                            <div style="font-size: 2.5rem; margin-bottom: 1rem; color: #38bdf8;">👥</div>
                            <h3 style="font-size: 1.2rem; font-weight: 700; margin-bottom: 0.5rem; color: #f8fafc;">Diskusi & Sharing</h3>
                            <p style="color: #94a3b8; font-size: 0.9rem; line-height: 1.5; margin: 0;">Ruang interaksi aktif membahas dinamika relasi dan penerapan kepribadian sehari-hari.</p>
                        </div>

                        <div style="background: rgba(15, 23, 42, 0.7); border: 1px solid rgba(255, 255, 255, 0.08); border-radius: 16px; padding: 2.5rem 1.5rem; transition: transform 0.2s ease;">
                            <div style="font-size: 2.5rem; margin-bottom: 1rem; color: #818cf8;">📖</div>
                            <h3 style="font-size: 1.2rem; font-weight: 700; margin-bottom: 0.5rem; color: #f8fafc;">Belajar Bersama</h3>
                            <p style="color: #94a3b8; font-size: 0.9rem; line-height: 1.5; margin: 0;">Kajian modul terstruktur, webinar berkala, dan studi kasus praktis.</p>
                        </div>

                        <div style="background: rgba(15, 23, 42, 0.7); border: 1px solid rgba(255, 255, 255, 0.08); border-radius: 16px; padding: 2.5rem 1.5rem; transition: transform 0.2s ease;">
                            <div style="font-size: 2.5rem; margin-bottom: 1rem; color: #eab308;">⭐</div>
                            <h3 style="font-size: 1.2rem; font-weight: 700; margin-bottom: 0.5rem; color: #f8fafc;">Tumbuh & Berkembang</h3>
                            <p style="color: #94a3b8; font-size: 0.9rem; line-height: 1.5; margin: 0;">Saling mendukung untuk mencapai potensi komunikasi dan kepemimpinan terbaik.</p>
                        </div>
                    </div>

                    <!-- Action CTA -->
                    <div style="background: linear-gradient(135deg, rgba(30, 27, 75, 0.6), rgba(15, 23, 42, 0.8)); border: 1px solid rgba(124, 58, 237, 0.25); border-radius: 16px; padding: 2.5rem 2rem; max-width: 600px; margin: 0 auto;">
                        <h3 style="font-size: 1.35rem; font-weight: 700; margin-bottom: 0.75rem;">Siap Terhubung dengan Komunitas?</h3>
                        <p style="color: #94a3b8; font-size: 0.95rem; margin-bottom: 1.5rem;">Bergabunglah dengan grup diskusi dan dapatkan update materi terbaru.</p>
                        <a href="#/register" style="display: inline-block; padding: 0.75rem 1.75rem; background: #7c3aed; color: #fff; text-decoration: none; border-radius: 8px; font-weight: 700; font-size: 0.95rem;">Gabung Komunitas Gratis →</a>
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

export default CommunityPage;