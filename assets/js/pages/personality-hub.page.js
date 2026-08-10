/**
 * TOPCARE AI PLATFORM V2 — PERSONALITY HUB CONTROLLER
 * Path: assets/js/pages/personality-hub.page.js
 * Status: APPROVED & ACTIVE (3 PERSONALITY TEST OPTIONS)
 */

export class PersonalityHubPage {
    render() {
        return `
            <div class="tc-personality-hub-wrapper" style="padding: 3rem 1.5rem; max-width: 1100px; margin: 0 auto; color: #f8fafc;">
                <!-- HEADER HUB -->
                <div class="tc-hub-header" style="text-align: center; margin-bottom: 3rem;">
                    <span style="background: rgba(37, 99, 235, 0.2); color: #60a5fa; padding: 0.5rem 1rem; border-radius: 20px; font-size: 0.85rem; font-weight: 600; border: 1px solid rgba(59, 130, 246, 0.3);">
                        🧠 TopCare Assessment Center
                    </span>
                    <h1 style="font-size: 2.25rem; font-weight: 800; margin-top: 1rem; margin-bottom: 0.75rem;">
                        Pilih Jenis Tes Kepribadian Anda
                    </h1>
                    <p style="color: #94a3b8; max-width: 650px; margin: 0 auto; line-height: 1.6;">
                        Pahami potensi diri, dinamika energi, dan karakter unik Anda melalui metode asesmen AI yang dirancang interaktif.
                    </p>
                </div>

                <!-- GRID 3 PILIHAN TES -->
                <div class="tc-hub-grid" style="display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 1.75rem;">
                    
                    <!-- MENU 1: INTROVERT VS EKSTROVERT -->
                    <div class="tc-hub-card" style="background: rgba(30, 41, 59, 0.7); border: 1px solid rgba(255, 255, 255, 0.1); border-radius: 16px; padding: 1.75rem; display: flex; flex-direction: column; justify-content: space-between; transition: transform 0.25s, border-color 0.25s;">
                        <div>
                            <div style="font-size: 2.5rem; margin-bottom: 1rem;">🔋</div>
                            <h3 style="font-size: 1.25rem; font-weight: 700; margin-bottom: 0.5rem;">Tes Energi Introvert vs Ekstrovert</h3>
                            <p style="color: #94a3b8; font-size: 0.9rem; line-height: 1.5; margin-bottom: 1.5rem;">
                                Pelajari bagaimana Anda mengisi ulang energi mental dan bagaimana Anda berinteraksi dengan lingkungan sosial di sekitar Anda.
                            </p>
                        </div>
                        <a href="#/test-introvert-extrovert" style="display: inline-block; text-align: center; padding: 0.85rem; background: rgba(255, 255, 255, 0.08); color: #60a5fa; border: 1px solid rgba(96, 165, 250, 0.3); border-radius: 10px; font-weight: 600; text-decoration: none; transition: background 0.2s;">
                            Mulai Tes Energi →
                        </a>
                    </div>

                    <!-- MENU 2: 4 TEMPERAMEN KEPRIBADIAN (SUDAH AKTIF) -->
                    <div class="tc-hub-card" style="background: rgba(30, 41, 59, 0.9); border: 1px solid #3b82f6; border-radius: 16px; padding: 1.75rem; display: flex; flex-direction: column; justify-content: space-between; position: relative; box-shadow: 0 10px 25px rgba(37, 99, 235, 0.25);">
                        <span style="position: absolute; top: -12px; right: 20px; background: #2563eb; color: #fff; font-size: 0.75rem; padding: 0.2rem 0.75rem; border-radius: 12px; font-weight: 700;">
                            Rekomendasi Utama
                        </span>
                        <div>
                            <div style="font-size: 2.5rem; margin-bottom: 1rem;">🎭</div>
                            <h3 style="font-size: 1.25rem; font-weight: 700; margin-bottom: 0.5rem;">Tes 4 Temperamen Utama</h3>
                            <p style="color: #94a3b8; font-size: 0.9rem; line-height: 1.5; margin-bottom: 1.5rem;">
                                Identifikasi dominasi tipe kepribadian Anda: <strong>Koleris, Sanguinis, Melankolis, atau Plegmatis</strong> untuk panduan belajar AI yang presisi.
                            </p>
                        </div>
                        <a href="#/personality-test" style="display: inline-block; text-align: center; padding: 0.85rem; background: #2563eb; color: #ffffff; border-radius: 10px; font-weight: 600; text-decoration: none; box-shadow: 0 4px 12px rgba(37, 99, 235, 0.3);">
                            Mulai Tes 4 Temperamen →
                        </a>
                    </div>

                    <!-- MENU 3: TES MBTI (16 PERSONALITY) -->
                    <div class="tc-hub-card" style="background: rgba(30, 41, 59, 0.7); border: 1px solid rgba(255, 255, 255, 0.1); border-radius: 16px; padding: 1.75rem; display: flex; flex-direction: column; justify-content: space-between; transition: transform 0.25s, border-color 0.25s;">
                        <div>
                            <div style="font-size: 2.5rem; margin-bottom: 1rem;">🔍</div>
                            <h3 style="font-size: 1.25rem; font-weight: 700; margin-bottom: 0.5rem;">Tes Tipe MBTI (16 Kepribadian)</h3>
                            <p style="color: #94a3b8; font-size: 0.9rem; line-height: 1.5; margin-bottom: 1.5rem;">
                                Temukan kode 4-huruf MBTI Anda (seperti INTJ, ENFP, INFJ) untuk analisis gaya pengambilan keputusan dan karir masa depan.
                            </p>
                        </div>
                        <a href="#/test-mbti" style="display: inline-block; text-align: center; padding: 0.85rem; background: rgba(255, 255, 255, 0.08); color: #60a5fa; border: 1px solid rgba(96, 165, 250, 0.3); border-radius: 10px; font-weight: 600; text-decoration: none; transition: background 0.2s;">
                            Mulai Tes MBTI →
                        </a>
                    </div>

                </div>
            </div>
        `;
    }

    async mount() {
        const app = document.getElementById('app');
        if (app) {
            app.innerHTML = this.render();
        }
    }
}

export default new PersonalityHubPage();