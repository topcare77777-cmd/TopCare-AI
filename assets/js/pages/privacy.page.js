/**
 * TOPCARE AI PLATFORM V3 — PRIVACY POLICY PAGE
 * Path: assets/js/pages/privacy.page.js
 */

import { PlatformService } from '../core/services/platform.service.js';
import { SanitizerUtil } from '../core/utils/sanitizer.util.js';
import { UrlUtil } from '../core/utils/url.util.js';
import { FooterRenderer } from '../renderers/footer.renderer.js';

export class PrivacyPage {
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
                        <h1 style="font-size: 2.25rem; font-weight: 800; color: #fff; margin-bottom: 0.5rem; letter-spacing: -0.5px;">Kebijakan Privasi (Privacy Policy)</h1>
                        <p style="color: #64748b; font-size: 0.9rem;">Effective Date: 1 Januari 2026 | Terakhir diperbarui: 2026</p>
                    </div>

                    <div style="line-height: 1.8; color: #cbd5e1; font-size: 0.95rem; display: flex; flex-direction: column; gap: 2rem;">
                        <section>
                            <h2 style="font-size: 1.25rem; font-weight: 700; color: #fff; margin-bottom: 0.75rem;">1. Pendahuluan</h2>
                            <p>TopCare AI ("kami") berkomitmen penuh melindungi dan menghormati privasi data pengguna saat mengakses platform kami, termasuk layanan asesmen kepribadian, materi AI, Creator Hub, dan produk digital lainnya.</p>
                        </section>

                        <section>
                            <h2 style="font-size: 1.25rem; font-weight: 700; color: #fff; margin-bottom: 0.75rem;">2. Informasi yang Kami Kumpulkan</h2>
                            <ul style="padding-left: 1.25rem; margin: 0.5rem 0;">
                                <li><strong>Data Akun & Autentikasi:</strong> Alamat email, nama lengkap, dan kredensial akun yang dikelola secara terenkripsi melalui Supabase Auth.</li>
                                <li><strong>Data Profil & Tes:</strong> Hasil tes asesmen 4 temperamen dan pola preferensi belajar AI.</li>
                                <li><strong>Data Teknis:</strong> Informasi perangkat dasar dan log sesi untuk keamanan sistem.</li>
                            </ul>
                        </section>

                        <section>
                            <h2 style="font-size: 1.25rem; font-weight: 700; color: #fff; margin-bottom: 0.75rem;">3. Penggunaan Informasi</h2>
                            <p>Data yang dikumpulkan digunakan untuk mempersonalisasi rekomendasi modul belajar, mengamankan hak akses member/admin, dan meningkatkan kualitas platform kami.</p>
                        </section>

                        <section>
                            <h2 style="font-size: 1.25rem; font-weight: 700; color: #fff; margin-bottom: 0.75rem;">4. Keamanan & Penyimpanan Data</h2>
                            <p>Kami menerapkan PostgreSQL Row Level Security (RLS) serta standar enkripsi SSL/TLS edge. Token sesi tersimpan secara lokal dan aman di browser Anda.</p>
                        </section>

                        <section>
                            <h2 style="font-size: 1.25rem; font-weight: 700; color: #fff; margin-bottom: 0.75rem;">5. Hak Pengguna</h2>
                            <p>Anda berhak melihat, memperbarui profil, atau menghapus akun Anda kapan saja dengan menghubungi tim dukungan resmi kami.</p>
                        </section>

                        <section>
                            <h2 style="font-size: 1.25rem; font-weight: 700; color: #fff; margin-bottom: 0.75rem;">6. Kontak Resmi</h2>
                            <p>Pertanyaan mengenai kebijakan privasi ini dapat dikirimkan langsung ke: <a href="${mailtoHref}" style="color: #38bdf8; text-decoration: none;">${safeEmail}</a>.</p>
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

export default PrivacyPage;