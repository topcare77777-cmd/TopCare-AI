/**
 * TOPCARE AI PLATFORM V2 — MBTI VIEW RENDERER
 * Path: assets/js/pages/mbti/mbti.view.js
 * SRP: Renders accessible, responsive UI for question steps and rich result summary.
 */

export class MBTIView {
    static renderContainer() {
        return `
            <div class="tc-mbti-wrapper" style="padding: clamp(1.5rem, 4vh, 3rem) 1rem; max-width: 800px; margin: 0 auto; color: #f8fafc; font-family: system-ui, -apple-system, sans-serif;">
                <div style="text-align: center; margin-bottom: 2rem;">
                    <span style="background: rgba(37, 99, 235, 0.2); color: #60a5fa; padding: 0.4rem 1rem; border-radius: 999px; font-size: 0.85rem; font-weight: 600; border: 1px solid rgba(96, 165, 250, 0.3);">
                        🧩 Asesmen 16 Tipe Kepribadian MBTI
                    </span>
                    <h1 style="font-size: clamp(1.8rem, 4vw, 2.4rem); font-weight: 800; margin-top: 0.75rem; margin-bottom: 0.5rem; color: #ffffff;">
                        Tes Tipe Kepribadian MBTI
                    </h1>
                    <p style="color: #94a3b8; font-size: 0.95rem; max-width: 580px; margin: 0 auto; line-line-height: 1.5;">
                        Pilih opsi jawaban yang paling alami menggambarkan diri Anda dalam keseharian.
                    </p>
                </div>

                <div id="mbti-card" style="background: rgba(30, 41, 59, 0.85); border: 1px solid rgba(255, 255, 255, 0.12); border-radius: 20px; padding: clamp(1.25rem, 3vw, 2.25rem); backdrop-filter: blur(12px); box-shadow: 0 20px 40px rgba(0,0,0,0.3);">
                </div>
            </div>
        `;
    }

    static renderQuestionStep(questionData, currentIndex, totalQuestions) {
        const progressPercent = Math.round(((currentIndex + 1) / totalQuestions) * 100);

        return `
            <div style="margin-bottom: 1.5rem;">
                <!-- BAR PROGRESS -->
                <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.6rem; font-size: 0.85rem; color: #94a3b8; font-weight: 600;">
                    <span>Pertanyaan ${currentIndex + 1} dari ${totalQuestions}</span>
                    <span>${progressPercent}% Selesai</span>
                </div>
                <div style="width: 100%; height: 8px; background: rgba(255,255,255,0.08); border-radius: 999px; overflow: hidden; margin-bottom: 1.5rem;">
                    <div style="width: ${progressPercent}%; height: 100%; background: linear-gradient(90deg, #2563eb, #38bdf8); transition: width 0.3s ease;"></div>
                </div>

                <h2 style="font-size: clamp(1.1rem, 2.5vw, 1.35rem); font-weight: 700; line-height: 1.5; color: #ffffff; margin-bottom: 1.5rem;">
                    ${questionData.question}
                </h2>
            </div>

            <!-- PILIHAN JAWABAN (ACCESSIBLE BUTTONS) -->
            <div style="display: flex; flex-direction: column; gap: 1rem;">
                ${questionData.options.map((option, idx) => `
                    <button type="button" 
                            class="tc-mbti-option-btn" 
                            data-trait="${option.trait}" 
                            aria-label="Opsi ${idx === 0 ? 'A' : 'B'}: ${option.text}"
                            style="text-align: left; padding: 1.15rem 1.35rem; background: rgba(255,255,255,0.04); border: 1px solid rgba(255,255,255,0.12); border-radius: 12px; color: #f8fafc; font-size: 0.95rem; font-weight: 500; cursor: pointer; transition: all 0.2s ease; line-height: 1.5; outline: none;">
                        <div style="display: flex; align-items: flex-start; gap: 0.75rem;">
                            <span style="background: rgba(255,255,255,0.1); width: 26px; height: 26px; border-radius: 50%; display: inline-flex; align-items: center; justify-content: center; font-size: 0.8rem; font-weight: 700; flex-shrink: 0; color: #38bdf8;">
                                ${idx === 0 ? 'A' : 'B'}
                            </span>
                            <span>${option.text}</span>
                        </div>
                    </button>
                `).join('')}
            </div>
        `;
    }

    static renderResultView(resultData) {
        const { code, percentages, profile } = resultData;

        return `
            <div style="text-align: center;">
                <div style="font-size: 3rem; margin-bottom: 0.5rem;">🧩</div>
                <span style="color: #94a3b8; font-size: 0.85rem; font-weight: 700; text-transform: uppercase; letter-spacing: 0.05em;">Hasil Asesmen Anda</span>
                
                <h2 style="font-size: clamp(2rem, 5vw, 2.8rem); font-weight: 900; color: #60a5fa; margin-top: 0.25rem; margin-bottom: 0.25rem;">
                    ${code}
                </h2>
                <h3 style="font-size: 1.25rem; font-weight: 700; color: #f8fafc; margin-bottom: 1rem;">
                    ${profile.name}
                </h3>

                <p style="color: #cbd5e1; font-size: 0.95rem; line-height: 1.6; max-width: 650px; margin: 0 auto 2rem; background: rgba(255,255,255,0.03); padding: 1rem 1.25rem; border-radius: 12px; border: 1px solid rgba(255,255,255,0.08);">
                    ${profile.shortDescription}
                </p>

                <!-- VISUALISASI PERSENTASE 4 DIMENSI -->
                <div style="text-align: left; background: rgba(15, 23, 42, 0.6); border-radius: 14px; padding: 1.25rem; margin-bottom: 2rem; border: 1px solid rgba(255,255,255,0.08);">
                    <h4 style="font-size: 0.9rem; font-weight: 700; color: #94a3b8; margin-bottom: 1rem; text-transform: uppercase; letter-spacing: 0.05em;">
                        📊 Spektrum Kecenderungan Karakter
                    </h4>

                    ${this._renderDimensionBar('Extraversion (E)', percentages.E, 'Introversion (I)', percentages.I)}
                    ${this._renderDimensionBar('Sensing (S)', percentages.S, 'Intuition (N)', percentages.N)}
                    ${this._renderDimensionBar('Thinking (T)', percentages.T, 'Feeling (F)', percentages.F)}
                    ${this._renderDimensionBar('Judging (J)', percentages.J, 'Perceiving (P)', percentages.P)}
                </div>

                <!-- DESKRIPSI DETAIL RINGKAS -->
                <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(240px, 1fr)); gap: 1rem; text-align: left; margin-bottom: 2rem;">
                    <div style="background: rgba(255,255,255,0.03); border-radius: 12px; padding: 1rem; border: 1px solid rgba(255,255,255,0.06);">
                        <h5 style="color: #4ade80; font-size: 0.9rem; font-weight: 700; margin-bottom: 0.5rem;">Kekuatan Utama</h5>
                        <ul style="padding-left: 1.2rem; margin: 0; color: #cbd5e1; font-size: 0.85rem; line-height: 1.5;">
                            ${profile.strengths.map(s => `<li>${s}</li>`).join('')}
                        </ul>
                    </div>

                    <div style="background: rgba(255,255,255,0.03); border-radius: 12px; padding: 1rem; border: 1px solid rgba(255,255,255,0.06);">
                        <h5 style="color: #fb7185; font-size: 0.9rem; font-weight: 700; margin-bottom: 0.5rem;">Area Pengembangan</h5>
                        <ul style="padding-left: 1.2rem; margin: 0; color: #cbd5e1; font-size: 0.85rem; line-height: 1.5;">
                            ${profile.challenges.map(c => `<li>${c}</li>`).join('')}
                        </ul>
                    </div>
                </div>

                <!-- KELOMPOK TOMBOL AKSI -->
                <div style="display: flex; gap: 0.85rem; justify-content: center; flex-wrap: wrap;">
                    <a href="#/coach" style="padding: 0.85rem 1.5rem; background: #2563eb; color: #ffffff; border-radius: 10px; font-weight: 600; text-decoration: none; font-size: 0.9rem; transition: background 0.2s;">
                        🤖 Konsultasi dengan AI Coach →
                    </a>
                    <button type="button" id="tc-mbti-retry-btn" style="padding: 0.85rem 1.25rem; background: rgba(255,255,255,0.08); color: #f8fafc; border: 1px solid rgba(255,255,255,0.15); border-radius: 10px; font-weight: 600; cursor: pointer; font-size: 0.9rem; transition: background 0.2s;">
                        🔄 Coba Lagi
                    </button>
                    <a href="#/personality" style="padding: 0.85rem 1.25rem; background: transparent; color: #94a3b8; border-radius: 10px; font-weight: 600; text-decoration: none; font-size: 0.9rem;">
                        Kembali ke Hub
                    </a>
                </div>
            </div>
        `;
    }

    static _renderDimensionBar(labelLeft, percentLeft, labelRight, percentRight) {
        return `
            <div style="margin-bottom: 0.85rem;">
                <div style="display: flex; justify-content: space-between; font-size: 0.8rem; color: #cbd5e1; margin-bottom: 0.35rem; font-weight: 600;">
                    <span>${labelLeft} ${percentLeft}%</span>
                    <span>${labelRight} ${percentRight}%</span>
                </div>
                <div style="width: 100%; height: 8px; background: rgba(255,255,255,0.1); border-radius: 999px; overflow: hidden; display: flex;">
                    <div style="width: ${percentLeft}%; height: 100%; background: #2563eb;"></div>
                    <div style="width: ${percentRight}%; height: 100%; background: #38bdf8;"></div>
                </div>
            </div>
        `;
    }
}