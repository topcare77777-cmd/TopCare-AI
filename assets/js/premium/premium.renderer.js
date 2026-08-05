/**
 * TOPCARE AI PLATFORM V2 — PREMIUM CENTER RENDERER
 * Path: assets/js/premium/premium.renderer.js
 * Status: APPROVED & LOCKED (BUILD 128.3)
 * SRP: Pure UI View Generator for Premium Center.
 */

import AssetsRegistry from '../core/registries/assets.registry.js';
import { PREMIUM_DATA } from './premium.data.js';

export const PremiumRenderer = {
    renderPage() {
        const d = PREMIUM_DATA;
        const bgImg = AssetsRegistry.images.brand.premiumBg || 'assets/images/icons/premium-bg.webp';

        return `
            <div class="tc-premium-container">
                <!-- HERO SECTION WITH BACKGROUND IMAGE & GLOW -->
                <section class="tc-premium-hero">
                    <div class="tc-premium-bg-wrapper">
                        <img src="${bgImg}" alt="TopCare Premium Background" class="tc-premium-bg-img" loading="lazy">
                        <div class="tc-premium-overlay"></div>
                    </div>

                    <div class="tc-premium-hero-content">
                        <span class="tc-premium-badge">${d.hero.badge}</span>
                        <h1 class="tc-premium-title">${d.hero.title}</h1>
                        <p class="tc-premium-subtitle">${d.hero.subtitle}</p>
                    </div>
                </section>

                <!-- SECTION 2: MENGAPA PREMIUM -->
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

                <!-- SECTION 3: ROADMAP DEVELOPMENTS -->
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

                <!-- SECTION 4: PREMIUM PLANS (CATALOG & FUTURE ROADMAP) -->
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

                <!-- SECTION 5: PREMIUM FEATURES CATALOG -->
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

                <!-- SECTION 6: FAQ SECTION -->
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

                <!-- SECTION 7: CTA FOOTER NOTE -->
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