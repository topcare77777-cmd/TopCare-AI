/**
 * TOPCARE AI PLATFORM V2 — CREATOR PAGE CONTROLLER
 * Path: assets/js/pages/creator.page.js
 * Status: APPROVED & FIXED (ALIGN PREMIUM TO HEADER & EQUAL CARD HEIGHTS)
 * SRP: Renders Creator Studio Menu in a Card Grid Layout locked to viewport.
 */

export class CreatorPage {
    constructor(container) {
        this.container = container || document.getElementById('app');
    }

    async mount() {
        this.render();
    }

    render() {
        if (!this.container) return;
        
        this.container.innerHTML = `
            <style>
                /* 1. LAYOUT UTAMA (DESKTOP: Terkunci 100vh tanpa scroll) */
                .tc-creator-viewport {
                    width: 100%;
                    height: calc(100vh - 80px);
                    overflow: hidden; 
                    background: transparent;
                    display: flex;
                    align-items: flex-start;
                    justify-content: center;
                    padding-top: 1.5rem; 
                    padding-bottom: 2rem; 
                    box-sizing: border-box;
                }

                .tc-creator-page-wrapper {
                    width: 100%;
                    max-width: 1300px; 
                    padding: 0 1.5rem;
                    box-sizing: border-box;
                }

                /* 2. GRID SYSTEM CUSTOM UNTUK CREATOR */
                .tc-creator-grid-main {
                    display: grid;
                    grid-template-columns: 1fr 340px; 
                    gap: 2rem; /* Jarak antara kolom Kiri (Menu) dan Kanan (Premium) */
                    align-items: stretch; /* Memastikan kolom kanan bisa memanjang jika perlu */
                }

                .tc-creator-left-pane {
                    display: flex;
                    flex-direction: column;
                }

                .tc-creator-grid-cards {
                    display: grid;
                    grid-template-columns: repeat(3, 1fr);
                    gap: 1.25rem; 
                    /* KUNCI: Membuat ketiga kotak sama tinggi mengikuti yang paling tinggi */
                    align-items: stretch; 
                }

                /* 3. CARD STYLING & HOVER ANIMATION */
                .tc-creator-card-link {
                    text-decoration: none;
                    display: block;
                    color: inherit;
                    height: 100%;
                }

                .tc-creator-card {
                    background: rgba(17, 24, 39, 0.65);
                    border: 1px solid rgba(255, 255, 255, 0.08);
                    border-radius: 16px;
                    padding: 1.25rem; 
                    display: flex;
                    flex-direction: column;
                    height: 100%; /* Memaksa kotak mengisi ruang grid sepenuhnya */
                    box-sizing: border-box;
                    transition: transform 0.25s ease, border-color 0.25s ease, box-shadow 0.25s ease;
                }

                .tc-creator-card-link:hover .tc-creator-card {
                    transform: translateY(-4px);
                    border-color: #3b82f6;
                    box-shadow: 0 10px 25px rgba(59, 130, 246, 0.15);
                    background: rgba(17, 24, 39, 0.85);
                }

                /* Kotak Gambar / Icon */
                .tc-creator-thumb {
                    position: relative;
                    background: linear-gradient(135deg, #1e293b 0%, #0f172a 100%);
                    border-radius: 10px;
                    height: 90px; 
                    margin-bottom: 1.25rem;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    font-size: 2.5rem; 
                }

                .tc-creator-badge {
                    position: absolute;
                    top: 10px;
                    left: 10px;
                    font-size: 0.65rem;
                    color: #a78bfa;
                    background: rgba(139, 92, 246, 0.2);
                    padding: 0.2rem 0.5rem;
                    border-radius: 4px;
                    font-weight: 600;
                }

                /* 4. PROMO PREMIUM STYLING */
                .tc-creator-premium-box {
                    background: linear-gradient(135deg, #7c3aed 0%, #4c1d95 100%);
                    border-radius: 16px;
                    padding: 1.75rem 1.5rem; /* Padding disesuaikan */
                    color: #ffffff;
                    display: flex;
                    flex-direction: column;
                    justify-content: space-between;
                    height: 100%; /* Memenuhi tinggi kolom kanan */
                    box-sizing: border-box;
                }

                /* =========================================
                   MOBILE & TABLET (MEMBUKA KUNCI SCROLL)
                   ========================================= */
                @media (max-width: 992px) {
                    .tc-creator-viewport {
                        height: auto;
                        min-height: calc(100vh - 72px);
                        overflow-y: auto; 
                        align-items: flex-start;
                        padding: 1.5rem 0 4rem 0;
                    }
                    .tc-creator-grid-main {
                        grid-template-columns: 1fr;
                        align-items: stretch;
                    }
                    .tc-creator-grid-cards {
                        grid-template-columns: 1fr; 
                    }
                }
                @media (min-width: 769px) and (max-width: 992px) {
                    .tc-creator-grid-cards {
                        grid-template-columns: repeat(3, 1fr); 
                    }
                }
            </style>

            <div class="tc-creator-viewport">
                <div class="tc-creator-page-wrapper">
                    
                    <div class="tc-creator-grid-main">
                        
                        <!-- KOTAK KIRI: Gabungan Header & 3 Menu -->
                        <div class="tc-creator-left-pane">
                            
                            <!-- HEADER HALAMAN CREATOR -->
                            <div style="margin-bottom: 1.75rem; text-align: left;">
                                <span style="background: rgba(139, 92, 246, 0.15); color: #a78bfa; padding: 0.35rem 0.85rem; border-radius: 999px; font-size: 0.75rem; font-weight: 600; border: 1px solid rgba(139, 92, 246, 0.3);">
                                    🎨 TopCare Creator Studio
                                </span>
                                <h1 style="font-size: 2.1rem; font-weight: 800; margin-top: 0.85rem; margin-bottom: 0.5rem; color: #ffffff;">
                                    Menu Creator & Assets
                                </h1>
                                <p style="color: #94a3b8; max-width: 750px; line-height: 1.5; font-size: 0.95rem; margin: 0;">
                                    Jelajahi dan temukan berbagai aset digital mulai dari koleksi prompt AI, panduan e-book komprehensif, hingga artikel wawasan terbaru.
                                </p>
                            </div>

                            <!-- 3 MENU KARTU -->
                            <div class="tc-creator-grid-cards">
                                
                                <!-- MENU 1: PROMPT AI -->
                                <a href="#/prompt" class="tc-creator-card-link">
                                    <article class="tc-creator-card">
                                        <div class="tc-creator-thumb">
                                            🤖
                                            <span class="tc-creator-badge">Prompt AI</span>
                                        </div>
                                        <div>
                                            <h3 style="font-size: 1.05rem; color: #f8fafc; margin: 0 0 0.5rem 0; font-weight: 700;">Koleksi Prompt Produktivitas</h3>
                                            <p style="font-size: 0.85rem; color: #94a3b8; margin: 0; line-height: 1.45;">Kumpulan prompt AI siap pakai yang dirancang khusus untuk meningkatkan produktivitas kerja dan kreativitas Anda.</p>
                                        </div>
                                    </article>
                                </a>

                                <!-- MENU 2: E-BOOK -->
                                <a href="#/ebook" class="tc-creator-card-link">
                                    <article class="tc-creator-card">
                                        <div class="tc-creator-thumb">
                                            📘
                                            <span class="tc-creator-badge">E-Book</span>
                                        </div>
                                        <div>
                                            <h3 style="font-size: 1.05rem; color: #f8fafc; margin: 0 0 0.5rem 0; font-weight: 700;">Panduan Digital Komprehensif</h3>
                                            <p style="font-size: 0.85rem; color: #94a3b8; margin: 0; line-height: 1.45;">E-book eksklusif seputar AI, pengembangan diri, dan strategi karir untuk membantu Anda tumbuh lebih cepat.</p>
                                        </div>
                                    </article>
                                </a>

                                <!-- MENU 3: ARTIKEL -->
                                <a href="#/artikel" class="tc-creator-card-link">
                                    <article class="tc-creator-card">
                                        <div class="tc-creator-thumb">
                                            📰
                                            <span class="tc-creator-badge">Artikel</span>
                                        </div>
                                        <div>
                                            <h3 style="font-size: 1.05rem; color: #f8fafc; margin: 0 0 0.5rem 0; font-weight: 700;">Wawasan AI & Kepribadian</h3>
                                            <p style="font-size: 0.85rem; color: #94a3b8; margin: 0; line-height: 1.45;">Baca artikel terbaru tentang tren teknologi Artificial Intelligence dan tips pengembangan kepribadian.</p>
                                        </div>
                                    </article>
                                </a>

                            </div>
                        </div>

                        <!-- KOTAK KANAN: PROMO PREMIUM (Kini otomatis sejajar dengan Lencana Header) -->
                        <div class="tc-creator-premium-box">
                            <div>
                                <div style="font-size: 2.25rem; margin-bottom: 0.5rem;">👑</div>
                                <h3 style="font-size: 1.25rem; margin: 0 0 0.5rem 0; font-weight: 700;">Upgrade ke Premium</h3>
                                <p style="font-size: 0.9rem; color: #ddd6fe; margin: 0 0 1.25rem 0; line-height: 1.5;">Dapatkan akses tak terbatas ke semua panduan e-book, prompt prioritas, dan materi kreator eksklusif.</p>
                                <ul style="list-style: none; padding: 0; margin: 0 0 1.25rem 0; display: flex; flex-direction: column; gap: 0.5rem; font-size: 0.85rem; color: #ede9fe;">
                                    <li>✓ Akses semua prompt premium</li>
                                    <li>✓ Ebook eksklusif setiap bulan</li>
                                    <li>✓ AI Assistant priority</li>
                                    <li>✓ Hak komersial aset</li>
                                </ul>
                            </div>
                            <a href="#/premium" style="display: block; text-align: center; padding: 0.75rem; background: #ffffff; color: #6d28d9; border-radius: 8px; font-weight: 700; text-decoration: none; font-size: 0.95rem; margin-top: 0.5rem;">Mulai Premium</a>
                        </div>

                    </div>
                </div>
            </div>
        `;
    }

    destroy() {
        if (this.container) {
            this.container.innerHTML = '';
        }
    }
}

export const creatorPage = new CreatorPage();
export default CreatorPage;