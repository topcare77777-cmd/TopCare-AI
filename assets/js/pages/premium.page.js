/**
 * TOPCARE AI PLATFORM V3 — PREMIUM CENTER PAGE
 * Path: assets/js/pages/premium.page.js
 * Status: PHASE 2.4.4 TARGETED DOWNLOAD CENTER CONNECTIVITY
 */

import { StyleResolverUtil } from '../core/utils/style-resolver.util.js';
import { FooterRenderer } from '../renderers/footer.renderer.js';

export class PremiumPage {
    constructor(container) {
        this.container = container || document.getElementById('app') || document.body;
    }

    async mount(target) {
        const container = target || this.container;

        // Muat stylesheet premium dengan Dynamic CSS Resolver yang aman dari 404
        await StyleResolverUtil.loadStylesheet('pages/premium.css', 'tcr-page-premium-style');

        const footerHtml = await FooterRenderer.render();

        container.innerHTML = `
            <div style="min-height: 100vh; background: #030712; color: #fff;">
                <section style="max-width: 1100px; margin: 0 auto; padding: 4rem 1.5rem; text-align: center;">
                    <div style="display: inline-block; padding: 0.3rem 0.9rem; border-radius: 9999px; background: rgba(56, 189, 248, 0.1); border: 1px solid rgba(56, 189, 248, 0.3); color: #38bdf8; font-size: 0.85rem; font-weight: 700; margin-bottom: 1.5rem;">
                        ⚡ TOPCARE PREMIUM ACCESS
                    </div>
                    <h1 style="font-size: 2.5rem; font-weight: 800; margin-bottom: 1rem; letter-spacing: -0.5px;">
                        Akselerasi Potensimu dengan <span style="background: linear-gradient(135deg, #38bdf8, #818cf8); -webkit-background-clip: text; -webkit-text-fill-color: transparent;">Fitur Eksklusif</span>
                    </h1>
                    <p style="color: #94a3b8; max-width: 650px; margin: 0 auto 3rem auto; font-size: 1.05rem; line-height: 1.6;">
                        Dapatkan akses tanpa batas ke modul AI tingkat lanjut, library prompt premium, analisis mendalam tes kepribadian, dan konsultasi AI Coach personal.
                    </p>

                    <!-- Pricing Cards Grid -->
                    <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 2rem; text-align: left; margin-bottom: 4rem;">
                        
                        <!-- Free Tier -->
                        <div style="background: rgba(15, 23, 42, 0.7); border: 1px solid rgba(255, 255, 255, 0.1); border-radius: 16px; padding: 2rem;">
                            <h3 style="font-size: 1.25rem; font-weight: 700; margin-bottom: 0.5rem; color: #cbd5e1;">Starter Member</h3>
                            <p style="color: #64748b; font-size: 0.85rem; margin-bottom: 1.5rem;">Akses dasar belajar AI dan tes kepribadian umum.</p>
                            <div style="font-size: 2rem; font-weight: 800; margin-bottom: 1.5rem; color: #fff;">Gratis</div>
                            <ul style="list-style: none; padding: 0; margin: 0 0 2rem 0; display: flex; flex-direction: column; gap: 0.75rem; color: #94a3b8; font-size: 0.9rem;">
                                <li>✓ Akses modul dasar AI</li>
                                <li>✓ Tes Kepribadian 4 Temperamen</li>
                                <li>✓ Komunitas AI Global</li>
                            </ul>
                            <a href="#/register" style="display: block; text-align: center; padding: 0.75rem; background: rgba(255, 255, 255, 0.1); color: #fff; text-decoration: none; border-radius: 8px; font-weight: 600;">Daftar Gratis</a>
                        </div>

                        <!-- Pro Tier (Highlighted) -->
                        <div style="background: linear-gradient(180deg, rgba(30, 41, 59, 0.9), rgba(15, 23, 42, 0.9)); border: 2px solid #38bdf8; border-radius: 16px; padding: 2rem; position: relative;">
                            <div style="position: absolute; top: -12px; right: 20px; background: #38bdf8; color: #0f172a; padding: 0.2rem 0.6rem; border-radius: 6px; font-size: 0.75rem; font-weight: 800;">POPULER</div>
                            <h3 style="font-size: 1.25rem; font-weight: 700; margin-bottom: 0.5rem; color: #38bdf8;">Pro Lifetime</h3>
                            <p style="color: #94a3b8; font-size: 0.85rem; margin-bottom: 1.5rem;">Akses penuh ke semua aset kreasi dan prompt premium.</p>
                            <div style="font-size: 2rem; font-weight: 800; margin-bottom: 1.5rem; color: #fff;">Hubungi Tim</div>
                            <ul style="list-style: none; padding: 0; margin: 0 0 2rem 0; display: flex; flex-direction: column; gap: 0.75rem; color: #cbd5e1; font-size: 0.9rem;">
                                <li>✓ Seluruh fitur Starter Member</li>
                                <li>✓ Akses Creator Hub & Prompt Pro</li>
                                <li>✓ AI Smart Coach Workspace</li>
                                <li><a href="#/download-center" style="color: #38bdf8; text-decoration: none; font-weight: 600;">✓ Download Center & Lisensi Aset →</a></li>
                            </ul>
                            <a href="#/contact" style="display: block; text-align: center; padding: 0.75rem; background: #2563eb; color: #fff; text-decoration: none; border-radius: 8px; font-weight: 700;">Konsultasi Pro →</a>
                        </div>
                    </div>
                </section>

                ${footerHtml}
            </div>
        `;
    }

    destroy() {
        StyleResolverUtil.removeStylesheet('tcr-page-premium-style');
    }
}

export default PremiumPage;