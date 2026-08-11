/**
 * TOPCARE AI PLATFORM V2 — CARL JUNG ENERGY TEST PAGE
 * Path: assets/js/pages/test-energy/test-introvert-extrovert.page.js
 * Reference: Psychological Types (C. G. Jung, 1921)
 * Status: APPROVED & FIXED (6 QUESTIONS - INTROVERT, EXTROVERT & AMBIVERT 50%-50%)
 */

export class TestIntrovertExtrovertPage {
    constructor(container) {
        this.container = typeof container === 'string'
            ? document.querySelector(container)
            : container;

        this.currentIndex = 0;
        this.introvertScore = 0;
        this.extrovertScore = 0;

        // Exactly 6 Questions (Genap 6 Soal)
        this.questions = [
            {
                question: "1. Saat energi mental Anda habis setelah seharian beraktivitas, bagaimana cara utama Anda mengisinya kembali?",
                options: [
                    { text: "Menyendiri di tempat tenang, membaca, atau merenungkan pikiran pribadi.", type: "I" },
                    { text: "Berkumpul dengan teman, mengobrol, atau berada di lingkungan sosial aktif.", type: "E" }
                ]
            },
            {
                question: "2. Ketika membuat keputusan penting, pertimbangan mana yang secara alami lebih mendominasi?",
                options: [
                    { text: "Nilai-nilai pribadi, prinsip internal, dan pemahaman mendalam di dalam diri.", type: "I" },
                    { text: "Fakta nyata, masukan dari luar, serta dampak langsung pada lingkungan.", type: "E" }
                ]
            },
            {
                question: "3. Bagaimana kecenderungan Anda saat dihadapkan pada ide atau gagasan baru?",
                options: [
                    { text: "Mengamati dan memprosesnya secara rinci dalam pikiran sebelum berkomentar.", type: "I" },
                    { text: "Langsung mendiskusikannya secara terbuka dan mempraktikkannya dengan cepat.", type: "E" }
                ]
            },
            {
                question: "4. Dalam lingkungan kerja atau ruang belajar, suasana mana yang paling mengoptimalkan fokus Anda?",
                options: [
                    { text: "Ruang tenang dan mandiri tanpa banyak interupsi dari dunia luar.", type: "I" },
                    { text: "Ruang kolaboratif yang dinamis dengan banyak curah pendapat (brainstorming).", type: "E" }
                ]
            },
            {
                question: "5. Bagaimana cara Anda mengeksplorasi wawasan atau topik yang menarik perhatian?",
                options: [
                    { text: "Menyelami satu atau dua topik secara sangat mendalam dan terstruktur.", type: "I" },
                    { text: "Mengeksplorasi banyak topik beragam secara luas dan bervariasi.", type: "E" }
                ]
            },
            {
                question: "6. Menurut Teori Carl Jung, ke mana fokus perhatian utama hidup Anda secara alami mengalir?",
                options: [
                    { text: "Ke dunia dalam (Inward) — pikiran, perasaan, dan refleksi subjektif.", type: "I" },
                    { text: "Ke dunia luar (Outward) — peristiwa sekitar, orang lain, dan aksi nyata.", type: "E" }
                ]
            }
        ];
    }

    async mount(targetContainer) {
        if (targetContainer) {
            this.container = targetContainer;
        }
        if (!this.container) {
            this.container = document.getElementById('app');
        }

        if (!this.container) return;

        this.currentIndex = 0;
        this.introvertScore = 0;
        this.extrovertScore = 0;

        this.renderQuiz();
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    renderQuiz() {
        const currentQ = this.questions[this.currentIndex];
        const progressPercent = Math.round(((this.currentIndex) / this.questions.length) * 100);

        this.container.innerHTML = `
            <div style="max-width: 800px; margin: 0 auto; padding: clamp(1.5rem, 4vw, 3rem) 1rem; color: #f8fafc;">
                <div style="text-align: center; margin-bottom: 2rem;">
                    <span style="background: rgba(16, 185, 129, 0.15); border: 1px solid rgba(16, 185, 129, 0.3); color: #34d399; padding: 0.35rem 0.85rem; border-radius: 999px; font-size: 0.825rem; font-weight: 600;">
                        🔋 Carl Jung Psychological Types
                    </span>
                    <h1 style="font-size: clamp(1.5rem, 4vw, 2.25rem); font-weight: 800; margin-top: 0.75rem; margin-bottom: 0.5rem;">
                        Tes Orientasi Energi Subjektif
                    </h1>
                    <p style="color: #94a3b8; font-size: 0.95rem; max-width: 600px; margin: 0 auto; line-height: 1.5;">
                        Pahami arah aliran energi psikis Anda berdasarkan konsep kepribadian Carl Gustav Jung.
                    </p>
                </div>

                <div style="background: rgba(30, 41, 59, 0.8); border: 1px solid rgba(255, 255, 255, 0.1); border-radius: 16px; padding: clamp(1.25rem, 3vw, 2rem); backdrop-filter: blur(12px);">
                    <div style="display: flex; justify-content: space-between; font-size: 0.85rem; color: #94a3b8; margin-bottom: 0.5rem; font-weight: 600;">
                        <span>Pertanyaan ${this.currentIndex + 1} dari ${this.questions.length}</span>
                        <span>${progressPercent}% Selesai</span>
                    </div>
                    <div style="width: 100%; height: 8px; background: rgba(255, 255, 255, 0.08); border-radius: 999px; overflow: hidden; margin-bottom: 1.75rem;">
                        <div style="height: 100%; width: ${progressPercent}%; background: linear-gradient(90deg, #10b981 0%, #3b82f6 100%); transition: width 0.3s ease;"></div>
                    </div>

                    <h2 style="font-size: clamp(1.05rem, 2.5vw, 1.25rem); font-weight: 700; color: #ffffff; margin-bottom: 1.5rem; line-height: 1.5;">
                        ${currentQ.question}
                    </h2>

                    <div style="display: flex; flex-direction: column; gap: 0.85rem;">
                        ${currentQ.options.map((opt, idx) => `
                            <button type="button" class="tc-jung-option-btn" data-type="${opt.type}" style="width: 100%; padding: 1rem 1.25rem; background: rgba(15, 23, 42, 0.6); border: 1px solid rgba(255, 255, 255, 0.12); border-radius: 12px; color: #cbd5e1; font-size: 0.95rem; text-align: left; cursor: pointer; transition: all 0.2s ease; display: flex; align-items: center; gap: 0.85rem; line-height: 1.4;">
                                <span style="width: 28px; height: 28px; border-radius: 50%; background: rgba(255, 255, 255, 0.08); border: 1px solid rgba(255, 255, 255, 0.15); display: flex; align-items: center; justify-content: center; font-weight: 700; font-size: 0.8rem; flex-shrink: 0; color: #94a3b8;">${String.fromCharCode(65 + idx)}</span>
                                <span>${opt.text}</span>
                            </button>
                        `).join('')}
                    </div>
                </div>
            </div>
        `;

        this.bindQuizEvents();
    }

    bindQuizEvents() {
        const buttons = this.container.querySelectorAll('.tc-jung-option-btn');
        buttons.forEach(btn => {
            btn.onclick = () => {
                const selectedType = btn.getAttribute('data-type');
                if (selectedType === 'I') this.introvertScore++;
                if (selectedType === 'E') this.extrovertScore++;

                this.currentIndex++;

                if (this.currentIndex < this.questions.length) {
                    this.renderQuiz();
                } else {
                    this.renderResult();
                }
            };
        });
    }

    renderResult() {
        let resultType = '';
        let icon = '';
        let tagline = '';
        let description = '';
        let saveKey = '';

        const introvertPercent = Math.round((this.introvertScore / 6) * 100);
        const extrovertPercent = Math.round((this.extrovertScore / 6) * 100);

        if (this.introvertScore > this.extrovertScore) {
            resultType = 'Introvert (Introversion)';
            icon = '🧘‍♂️';
            saveKey = 'Introvert';
            tagline = `Dominasi Energi Dalam (${introvertPercent}% Introvert vs ${extrovertPercent}% Ekstrovert)`;
            description = 'Berdasarkan teori Carl Gustav Jung (*Psychological Types*), Anda memiliki kecenderungan **Introverted Energy Orientation**. Energi psikis Anda terisi kembali melalui waktu tenang dan refleksi mandiri.';
        } else if (this.extrovertScore > this.introvertScore) {
            resultType = 'Ekstrovert (Extraversion)';
            icon = '⚡';
            saveKey = 'Ekstrovert';
            tagline = `Dominasi Energi Luar (${extrovertPercent}% Ekstrovert vs ${introvertPercent}% Introvert)`;
            description = 'Berdasarkan teori Carl Gustav Jung (*Psychological Types*), Anda memiliki kecenderungan **Extraverted Energy Orientation**. Energi psikis Anda terisi kembali melalui keterlibatan aktif dengan dunia luar.';
        } else {
            // SEIMBANG 50% - 50% (3 : 3) -> AMBIVERT
            resultType = 'Ambivert (Keseimbangan Energi 50% - 50%)';
            icon = '⚖️';
            saveKey = 'Ambivert';
            tagline = 'Orientasi Energi Seimbang Sempurna: Mampu beradaptasi secara fleksibel di berbagai situasi.';
            description = 'Berdasarkan teori Carl Gustav Jung (*Psychological Types*), skor Anda menunjukkan tingkat keseimbangan sempurna antara Introvert dan Ekstrovert (**50% vs 50%**). Sebagai seorang **Ambivert**, Anda memiliki kemampuan adaptasi psikologis yang sangat tinggi.';
        }

        localStorage.setItem('user_personality', saveKey);
        localStorage.setItem('jung_energy_type', saveKey);

        this.container.innerHTML = `
            <div style="max-width: 800px; margin: 0 auto; padding: clamp(1.5rem, 4vw, 3rem) 1rem; color: #f8fafc; text-align: center;">
                <span style="background: rgba(16, 185, 129, 0.15); border: 1px solid rgba(16, 185, 129, 0.3); color: #34d399; padding: 0.35rem 0.85rem; border-radius: 999px; font-size: 0.825rem; font-weight: 600;">
                    🎉 Hasil Asesmen Energi Selesai
                </span>

                <div style="background: rgba(30, 41, 59, 0.8); border: 1px solid rgba(255, 255, 255, 0.1); border-radius: 16px; padding: clamp(1.5rem, 4vw, 2.5rem); margin-top: 1.5rem; backdrop-filter: blur(12px);">
                    <div style="font-size: 3.5rem; margin-bottom: 0.75rem;">${icon}</div>
                    <h2 style="font-size: clamp(1.5rem, 4vw, 2.25rem); font-weight: 800; color: #34d399; margin-bottom: 0.5rem;">${resultType}</h2>
                    <p style="font-size: 0.95rem; color: #cbd5e1; font-style: italic; margin-bottom: 1.5rem;">"${tagline}"</p>

                    <div style="display: flex; gap: 1rem; justify-content: center; margin-bottom: 1.75rem; flex-wrap: wrap;">
                        <div style="padding: 0.75rem 1.25rem; background: rgba(255, 255, 255, 0.05); border: 1px solid rgba(255, 255, 255, 0.1); border-radius: 12px; font-size: 0.9rem; color: #94a3b8;">
                            Skor Introvert: <strong style="color: #fff;">${this.introvertScore} / 6 (${introvertPercent}%)</strong>
                        </div>
                        <div style="padding: 0.75rem 1.25rem; background: rgba(255, 255, 255, 0.05); border: 1px solid rgba(255, 255, 255, 0.1); border-radius: 12px; font-size: 0.9rem; color: #94a3b8;">
                            Skor Ekstrovert: <strong style="color: #fff;">${this.extrovertScore} / 6 (${extrovertPercent}%)</strong>
                        </div>
                    </div>

                    <div style="text-align: left; background: rgba(0, 0, 0, 0.25); border: 1px solid rgba(255, 255, 255, 0.08); border-radius: 14px; padding: 1.25rem 1.5rem; color: #cbd5e1; line-height: 1.6; font-size: 0.95rem; margin-bottom: 2rem;">
                        ${description}
                    </div>

                    <div style="display: flex; gap: 1rem; justify-content: center; flex-wrap: wrap;">
                        <a href="#/coach" style="padding: 0.85rem 1.75rem; border-radius: 12px; font-weight: 700; font-size: 0.95rem; background: #2563eb; color: #ffffff; text-decoration: none;">
                            💬 Konsultasi Tipe Energi dengan Coach AI →
                        </a>
                        <a href="#/personality" style="padding: 0.85rem 1.75rem; border-radius: 12px; font-weight: 700; font-size: 0.95rem; background: rgba(255, 255, 255, 0.08); color: #ffffff; border: 1px solid rgba(255, 255, 255, 0.15); text-decoration: none;">
                            ← Kembali ke Asesmen Center
                        </a>
                    </div>
                </div>
            </div>
        `;

        window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    destroy() {
        if (this.container) {
            this.container.innerHTML = '';
        }
    }
}

export default TestIntrovertExtrovertPage;