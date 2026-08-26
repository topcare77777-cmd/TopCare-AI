/**
 * TOPCARE AI PLATFORM V3 — TERMS & CONDITIONS PAGE
 * Path: assets/js/pages/terms.page.js
 */

import { PlatformService } from '../core/services/platform.service.js';
import { SanitizerUtil } from '../core/utils/sanitizer.util.js';
import { UrlUtil } from '../core/utils/url.util.js';
import { FooterRenderer } from '../renderers/footer.renderer.js';

export class TermsPage {
    constructor(container) {
        this.container = container || document.getElementById('app') || document.body;
    }

    async mount(target) {
        const container = target || this.container;
        const config = await PlatformService.getPlatformConfig();

        const safeEmail = SanitizerUtil.escapeHTML(config.contact_email || 'support@topcareai.com');
        const mailtoHref = UrlUtil.sanitizeMailto(config.contact_email, '#');
        const footerHtml = await FooterRenderer.render();

        container.innerHTML = `
            <div style="min-height: 100vh; background: #030712; color: #f8fafc;">
                <!-- Main Legal Container -->
                <main style="max-width: 860px; margin: 0 auto; padding: 4rem 1.5rem 6rem;">
                    <div style="margin-bottom: 2.5rem;">
                        <a href="#/home" style="display: inline-flex; align-items: center; gap: 0.5rem; color: #38bdf8; text-decoration: none; font-weight: 600; font-size: 0.9rem; margin-bottom: 1.5rem;">
                            ← Kembali ke Beranda
                        </a>
                        <h1 style="font-size: 2.25rem; font-weight: 800; color: #fff; margin-bottom: 0.5rem; letter-spacing: -0.5px;">Syarat & Ketentuan (Terms & Conditions)</h1>
                        <p style="color: #64748b; font-size: 0.9rem;">Effective Date: 1 Januari 2026 | Versi Ketentuan: 2026</p>
                    </div>

                    <div style="line-height: 1.8; color: #cbd5e1; font-size: 0.95rem; display: flex; flex-direction: column; gap: 2rem;">
                        <section>
                            <h2 style="font-size: 1.25rem; font-weight: 700; color: #fff; margin-bottom: 0.75rem;">1. Ketentuan Penggunaan</h2>
                            <p>Dengan mengakses atau menggunakan platform TopCare AI, Anda setuju untuk terikat oleh seluruh syarat dan ketentuan yang berlaku di dokumen ini.</p>
                        </section>

                        <section>
                            <h2 style="font-size: 1.25rem; font-weight: 700; color: #fff; margin-bottom: 0.75rem;">2. Akun & Keanggotaan</h2>
                            <p>Pengguna bertanggung jawab penuh menjaga kerahasiaan akun, sandi, dan setiap aktivitas yang terjadi di bawah sesi terautentikasi masing-masing.</p>
                        </section>

                        <section>
                            <h2 style="font-size: 1.25rem; font-weight: 700; color: #fff; margin-bottom: 0.75rem;">3. Hak Kekayaan Intelektual (IP)</h2>
                            <p>Seluruh materi kurikulum AI, algoritma asesmen, desain antarmuka, dan konten digital di TopCare AI dilindungi oleh hak cipta dan hukum kekayaan intelektual.</p>
                        </section>

                        <section>
                            <h2 style="font-size: 1.25rem; font-weight: 700; color: #fff; margin-bottom: 0.75rem;">4. Larangan Penggunaan (Prohibited Use)</h2>
                            <p>Dilarang melakukan reverse engineering, eksploitasi API secara ilegal, penyebaran malware, atau penyalahgunaan fitur marketplace di luar ketentuan platform.</p>
                        </section>

                        <section>
                            <h2 style="font-size: 1.25rem; font-weight: 700; color: #fff; margin-bottom: 0.75rem;">5. Batasan Tanggung Jawab</h2>
                            <p>Layanan asesmen kepribadian dan rekomendasi AI disediakan sebagai sarana pengembangan diri dan edukasi ("as-is") tanpa jaminan mutlak atas keputusan karier individu.</p>
                        </section>

                        <section>
                            <h2 style="font-size: 1.25rem; font-weight: 700; color: #fff; margin-bottom: 0.75rem;">6. Hubungi Kami</h2>
                            <p>Jika Anda memiliki pertanyaan seputar syarat & ketentuan ini, hubungi kami melalui: <a href="${mailtoHref}" style="color: #38bdf8; text-decoration: none;">${safeEmail}</a>.</p>
                        </section>
                    </div>
                </main>

                <!-- Global Footer -->
                ${footerHtml}
            </div>
        `;
    }

    destroy() { }
}

export default TermsPage;