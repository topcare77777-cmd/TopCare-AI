/**
 * TOPCARE AI PLATFORM V2 — CREATOR HUB RENDERER
 * Path: assets/js/creator/creator.renderer.js
 * Status: APPROVED & LOCKED (BUILD 128.5 — LAYER 2 CREATOR SUB-MENU)
 * SRP: Pure UI Component templates generator for Creator Layer 2 & Layer 3 Views.
 */

export const CreatorRenderer = {
    /**
     * LAYER 2: Creator Sub-Menu Selection (E-book, Artikel, Prompt AI)
     */
    renderHubSelection() {
        return `
            <div class="tc-creator-container" style="max-width: 1140px; margin: 0 auto; padding: 2.5rem 1.5rem 5rem 1.5rem;">
                <header class="tc-creator-hero" style="text-align: center; margin-bottom: 3.5rem;">
                    <span class="tc-creator-badge" style="display: inline-block; padding: 0.35rem 0.85rem; background: rgba(139, 92, 246, 0.15); border: 1px solid rgba(139, 92, 246, 0.3); color: #a78bfa; border-radius: 999px; font-size: 0.825rem; font-weight: 600; margin-bottom: 1rem;">TopCare Creator Platform</span>
                    <h1 class="tc-creator-title" style="font-size: 2.5rem; font-weight: 800; color: #f8fafc; margin: 0 0 0.75rem 0;">Creator Hub & Resource Center</h1>
                    <p class="tc-creator-subtitle" style="font-size: 1.05rem; color: #94a3b8; max-width: 720px; margin: 0 auto; line-height: 1.6;">
                        Pilih kategori resource yang ingin Anda eksplorasi: koleksi E-book panduan, Artikel wawasan mendalam, atau Prompt AI siap pakai.
                    </p>
                </header>

                <div class="tc-creator-grid" style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 1.75rem;">
                    <!-- OPTION 1: E-BOOK -->
                    <article class="tc-creator-card" style="background: rgba(17, 24, 39, 0.75); border: 1px solid rgba(255, 255, 255, 0.1); border-radius: 20px; padding: 2rem; backdrop-filter: blur(16px); display: flex; flex-direction: column; justify-content: space-between; transition: transform 0.25s ease;">
                        <div>
                            <div style="font-size: 2.75rem; margin-bottom: 1.25rem;">📘</div>
                            <h3 style="font-size: 1.4rem; font-weight: 800; color: #f8fafc; margin: 0 0 0.75rem 0;">E-book Panduan</h3>
                            <p style="font-size: 0.9rem; color: #94a3b8; line-height: 1.6; margin: 0 0 1.5rem 0;">
                                Koleksi E-book digital komprehensif mengenai penerapan AI, strategi komunikasi, dan pengembangan potensi diri.
                            </p>
                        </div>
                        <button type="button" class="tc-btn-primary" id="tc-select-ebook-btn" style="width: 100%; padding: 0.85rem; background: #3b82f6; border: none; border-radius: 10px; color: #ffffff; font-weight: 600; cursor: pointer;">
                            Masuk Ke E-book →
                        </button>
                    </article>

                    <!-- OPTION 2: ARTIKEL -->
                    <article class="tc-creator-card" style="background: rgba(17, 24, 39, 0.75); border: 1px solid rgba(255, 255, 255, 0.1); border-radius: 20px; padding: 2rem; backdrop-filter: blur(16px); display: flex; flex-direction: column; justify-content: space-between; transition: transform 0.25s ease;">
                        <div>
                            <div style="font-size: 2.75rem; margin-bottom: 1.25rem;">📰</div>
                            <h3 style="font-size: 1.4rem; font-weight: 800; color: #f8fafc; margin: 0 0 0.75rem 0;">Artikel Wawasan</h3>
                            <p style="font-size: 0.9rem; color: #94a3b8; line-height: 1.6; margin: 0 0 1.5rem 0;">
                                Kumpulan tulisan dan artikel edukatif seputar kecerdasan buatan, 4 temperamen kepribadian, dan cerita inspiratif.
                            </p>
                        </div>
                        <button type="button" class="tc-btn-primary" id="tc-select-artikel-btn" style="width: 100%; padding: 0.85rem; background: #8b5cf6; border: none; border-radius: 10px; color: #ffffff; font-weight: 600; cursor: pointer;">
                            Masuk Ke Artikel →
                        </button>
                    </article>

                    <!-- OPTION 3: PROMPT AI -->
                    <article class="tc-creator-card" style="background: rgba(17, 24, 39, 0.75); border: 1px solid rgba(255, 255, 255, 0.1); border-radius: 20px; padding: 2rem; backdrop-filter: blur(16px); display: flex; flex-direction: column; justify-content: space-between; transition: transform 0.25s ease;">
                        <div>
                            <div style="font-size: 2.75rem; margin-bottom: 1.25rem;">🤖</div>
                            <h3 style="font-size: 1.4rem; font-weight: 800; color: #f8fafc; margin: 0 0 0.75rem 0;">Prompt AI Ready-to-Use</h3>
                            <p style="font-size: 0.9rem; color: #94a3b8; line-height: 1.6; margin: 0 0 1.5rem 0;">
                                Library instruksi/prompt AI pilihan yang dioptimalkan untuk pembuatan konten iklan, naskah video, dan analisis bisnis.
                            </p>
                        </div>
                        <button type="button" class="tc-btn-primary" id="tc-select-prompt-btn" style="width: 100%; padding: 0.85rem; background: #10b981; border: none; border-radius: 10px; color: #ffffff; font-weight: 600; cursor: pointer;">
                            Masuk Ke Prompt AI →
                        </button>
                    </article>
                </div>
            </div>
        `;
    },

    /**
     * LAYER 3: Detail E-book View
     */
    renderEbookSection() {
        return `
            <div class="tc-creator-container" style="max-width: 1140px; margin: 0 auto; padding: 2.5rem 1.5rem 5rem 1.5rem;">
                <button type="button" id="tc-back-to-creator-hub-btn" style="background: none; border: none; color: #a78bfa; font-weight: 600; cursor: pointer; margin-bottom: 1.5rem;">← Kembali ke Creator Sub-Menu</button>
                <header style="margin-bottom: 2.5rem;">
                    <span style="color: #60a5fa; font-weight: 600; font-size: 0.85rem;">📘 Creator Layer 3 — E-book</span>
                    <h1 style="font-size: 2.25rem; font-weight: 800; color: #f8fafc; margin-top: 0.35rem;">Koleksi E-book & Panduan Digital</h1>
                </header>
                <div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 1.5rem;">
                    <article style="background: rgba(17, 24, 39, 0.7); border: 1px solid rgba(255,255,255,0.08); border-radius: 16px; padding: 1.5rem;">
                        <h3 style="color: #f8fafc; font-size: 1.2rem; margin-bottom: 0.5rem;">E-book Panduan Personality Plus V2</h3>
                        <p style="color: #94a3b8; font-size: 0.9rem; margin-bottom: 1rem;">Panduan terstruktur memahami karakter Koleris, Sanguinis, Melankolis, dan Plegmatis.</p>
                        <button type="button" style="background: rgba(255,255,255,0.06); border: 1px solid rgba(255,255,255,0.12); color: #f8fafc; padding: 0.5rem 1rem; border-radius: 8px; font-size: 0.85rem; cursor: pointer;">Unduh E-book PDF</button>
                    </article>
                </div>
            </div>
        `;
    },

    /**
     * LAYER 3: Detail Artikel View
     */
    renderArtikelSection() {
        return `
            <div class="tc-creator-container" style="max-width: 1140px; margin: 0 auto; padding: 2.5rem 1.5rem 5rem 1.5rem;">
                <button type="button" id="tc-back-to-creator-hub-btn" style="background: none; border: none; color: #a78bfa; font-weight: 600; cursor: pointer; margin-bottom: 1.5rem;">← Kembali ke Creator Sub-Menu</button>
                <header style="margin-bottom: 2.5rem;">
                    <span style="color: #a78bfa; font-weight: 600; font-size: 0.85rem;">📰 Creator Layer 3 — Artikel</span>
                    <h1 style="font-size: 2.25rem; font-weight: 800; color: #f8fafc; margin-top: 0.35rem;">Artikel Wawasan & Edukasi</h1>
                </header>
                <div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 1.5rem;">
                    <article style="background: rgba(17, 24, 39, 0.7); border: 1px solid rgba(255,255,255,0.08); border-radius: 16px; padding: 1.5rem;">
                        <span style="font-size: 0.75rem; color: #34d399; background: rgba(16,185,129,0.12); padding: 0.2rem 0.6rem; border-radius: 6px;">AI & Productivity</span>
                        <h3 style="color: #f8fafc; font-size: 1.2rem; margin: 0.85rem 0 0.5rem 0;">Strategi Pemasaran Digital Berbasis AI</h3>
                        <p style="color: #94a3b8; font-size: 0.9rem;">Cara efektif memanfaatkan model Generative AI untuk pembuatan konten promosi sosial media.</p>
                    </article>
                </div>
            </div>
        `;
    },

    /**
     * LAYER 3: Detail Prompt AI View
     */
    renderPromptSection() {
        return `
            <div class="tc-creator-container" style="max-width: 1140px; margin: 0 auto; padding: 2.5rem 1.5rem 5rem 1.5rem;">
                <button type="button" id="tc-back-to-creator-hub-btn" style="background: none; border: none; color: #a78bfa; font-weight: 600; cursor: pointer; margin-bottom: 1.5rem;">← Kembali ke Creator Sub-Menu</button>
                <header style="margin-bottom: 2.5rem;">
                    <span style="color: #34d399; font-weight: 600; font-size: 0.85rem;">🤖 Creator Layer 3 — Prompt AI</span>
                    <h1 style="font-size: 2.25rem; font-weight: 800; color: #f8fafc; margin-top: 0.35rem;">Library Prompt AI Ready-to-Use</h1>
                </header>
                <div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 1.5rem;">
                    <article style="background: rgba(17, 24, 39, 0.7); border: 1px solid rgba(255,255,255,0.08); border-radius: 16px; padding: 1.5rem;">
                        <span style="font-size: 0.75rem; color: #60a5fa; background: rgba(59,130,246,0.12); padding: 0.2rem 0.6rem; border-radius: 6px;">Commercial Video</span>
                        <h3 style="color: #f8fafc; font-size: 1.1rem; margin: 0.85rem 0 0.5rem 0;">Prompt Video Promosi Fragrance Line</h3>
                        <p style="color: #cbd5e1; font-size: 0.85rem; background: rgba(0,0,0,0.3); padding: 0.75rem; border-radius: 8px; font-family: monospace;">"Buat deskripsi visual 15 detik video promosi parfum FYNE Tobacco Nero dengan format portrait 9:16..."</p>
                    </article>
                </div>
            </div>
        `;
    }
};

export default CreatorRenderer;