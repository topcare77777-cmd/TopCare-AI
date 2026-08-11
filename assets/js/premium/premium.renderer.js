/**
 * TOPCARE AI PLATFORM V2 — PREMIUM CENTER RENDERER
 * Path: assets/js/premium/premium.renderer.js
 * Status: APPROVED & CLEANED (BACKGROUND IMAGE REMOVED)
 * SRP: Pure UI View Generator for Premium Center without background images.
 */

import { PREMIUM_DATA } from './premium.data.js';

export const PremiumRenderer = {
    renderPage() {
        const d = PREMIUM_DATA;

        return `
            <div class="tc-premium-container">
                <!-- HERO SECTION (PURE TEXT & GLOW - NO BACKGROUND IMAGE) -->
                <section class="tc-premium-hero">
                    <div class="tc-premium-hero-content">
                        <span class="tc-premium-badge">${d.hero.badge}</span>
                        <h1 class="tc-premium-title">${d.hero.title}</h1>
                        <p class="tc-premium-subtitle">${d.hero.subtitle}</p>
                    </div>
                </section>

                <!-- SECTION 2: PREMIUM RESOURCE & DOWNLOAD CENTER -->
                <section class="tc-premium-section tc-premium-download-entry">
                    <div class="tc-section-header text-center">
                        <h2>📦 Premium Resource & Download Center</h2>
                        <p>Pusat akses dan pengunduhan berkas produk digital, materi edukasi, serta aset eksklusif Anda.</p>
                    </div>

                    <div class="tc-download-hub-card">
                        <div class="tc-download-hub-header">
                            <span class="tc-download-hub-icon">📦</span>
                            <div>
                                <h3 class="tc-download-hub-title">TopCare AI Download Center</h3>
                                <p class="tc-download-hub-subtitle">Unduh berkas gratis dan paket premium berlisensi secara langsung dalam satu tempat.</p>
                            </div>
                        </div>

                        <div class="tc-download-hub-grid">
                            <div class="tc-download-hub-column">
                                <h4>🎁 Free Resources (Siap Unduh)</h4>
                                <ul class="tc-download-hub-list">
                                    <li>✓ Starter Prompt Personality Kit</li>
                                    <li>✓ Panduan Dasar Pembelajaran AI</li>
                                    <li>✓ Lembar Kerja Evaluasi Kepribadian</li>
                                </ul>
                            </div>
                            <div class="tc-download-hub-column">
                                <h4>💎 Premium Packages (Akses Eksklusif)</h4>
                                <ul class="tc-download-hub-list">
                                    <li>🔒 Master Prompt AI Bundle (Commercial License)</li>
                                    <li>🔒 E-Book Strategi AI Agent Professional</li>
                                    <li>🔒 Template Dashboard UI/UX & Aset Kreator</li>
                                </ul>
                            </div>
                        </div>

                        <div class="tc-download-hub-action">
                            <a href="#/download-center" class="tc-btn-download-hub">
                                🚀 Buka Download Center
                            </a>
                        </div>
                    </div>
                </section>

                <!-- SECTION 3: MENGAPA PREMIUM -->
                <section class="tc-premium-section">
                    <div class="tc-section-header text-center">
                        <h2>Mengapa TopCare AI Premium?</h2>
                        <p>Pusat akselerasi pembelajaran dan efisiensi produktivitas masa depan Anda.</p>
                    </div>
                    <div class="tc-benefits-grid">
                        ${d.benefits.map(b => `
                            <article class="tc-benefit-card">
                                <div class="tc-benefit-icon">${b.icon}</div>
                                <h3>${b.title}</h3>
                                <p>${b.desc}</p>
                            </article>
                        `).join('')}
                    </div>
                </section>

                <!-- SECTION 4: ROADMAP DEVELOPMENTS -->
                <section class="tc-premium-section">
                    <div class="tc-section-header text-center">
                        <h2>Roadmap Pengembangan Premium</h2>
                        <p>Tahapan perencanaan fitur eksklusif yang disiapkan secara bertahap.</p>
                    </div>
                    <div class="tc-timeline-container">
                        ${d.roadmap.map((item, idx) => `
                            <div class="tc-timeline-item">
                                <div class="tc-timeline-marker">${idx + 1}</div>
                                <div class="tc-timeline-content">
                                    <span class="tc-timeline-phase">${item.phase}</span>
                                    <h3>${item.title}</h3>
                                    <ul>
                                        ${item.items.map(sub => `<li>✓ ${sub}</li>`).join('')}
                                    </ul>
                                </div>
                            </div>
                        `).join('')}
                    </div>
                </section>

                <!-- SECTION 5: PREMIUM PLANS -->
                <section class="tc-premium-section">
                    <div class="tc-section-header text-center">
                        <h2>Rencana Paket Layanan</h2>
                        <p>Katalog skema keanggotaan tanpa transaksi langsung.</p>
                    </div>
                    <div class="tc-plans-grid">
                        ${d.plans.map(p => `
                            <article class="tc-plan-card">
                                <div class="tc-plan-header">
                                    <span class="tc-plan-tag ${p.badgeClass}">${p.tag}</span>
                                    <h3>${p.name}</h3>
                                    <p>${p.desc}</p>
                                </div>
                                <ul class="tc-plan-features">
                                    ${p.features.map(f => `<li>✓ ${f}</li>`).join('')}
                                </ul>
                                <div class="tc-plan-footer">
                                    <span class="tc-status-label">${p.statusText}</span>
                                </div>
                            </article>
                        `).join('')}
                    </div>
                </section>

                <!-- SECTION 6: PREMIUM FEATURES CATALOG -->
                <section class="tc-premium-section">
                    <div class="tc-section-header text-center">
                        <h2>Katalog Fitur Masa Depan</h2>
                        <p>Ekosistem modul dan aset yang disiapkan untuk fase mendatang.</p>
                    </div>
                    <div class="tc-catalog-grid">
                        ${d.featuresCatalog.map(item => `
                            <div class="tc-catalog-item">
                                <span class="tc-catalog-icon">${item.icon}</span>
                                <span class="tc-catalog-name">${item.name}</span>
                            </div>
                        `).join('')}
                    </div>
                </section>

                <!-- SECTION 7: FAQ SECTION -->
                <section class="tc-premium-section">
                    <div class="tc-section-header text-center">
                        <h2>Pertanyaan Umum (FAQ)</h2>
                        <p>Informasi seputar status layanan dan keanggotaan Premium.</p>
                    </div>
                    <div class="tc-faq-wrapper">
                        ${d.faqs.map((faq, i) => `
                            <details class="tc-faq-item">
                                <summary class="tc-faq-question">
                                    <span>${faq.q}</span>
                                    <span class="tc-faq-arrow">▼</span>
                                </summary>
                                <div class="tc-faq-answer">
                                    <p>${faq.a}</p>
                                </div>
                            </details>
                        `).join('')}
                    </div>
                </section>

                <!-- SECTION 8: CTA FOOTER NOTE -->
                <section class="tc-premium-cta">
                    <div class="tc-cta-box">
                        <h2>Siap Menjadi Bagian dari Perkembangan TopCare AI?</h2>
                        <p>TopCare AI Premium akan terus berkembang untuk mendukung perjalanan belajar dan produktivitas Anda. Ikuti pembaruan platform untuk mengetahui fitur-fitur terbaru yang akan segera hadir.</p>
                    </div>
                </section>
            </div>
        `;
    }
};

export default PremiumRenderer;