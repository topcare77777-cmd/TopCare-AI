/**
 * TOPCARE AI PLATFORM V2 — MBTI 16 PERSONALITIES TEST
 * Path: assets/js/pages/test-mbti.page.js
 */

export class TestMBTIPage {
    constructor() {
        this.questions = [
            {
                q: "Dalam mengambil keputusan penting, Anda lebih mengandalkan:",
                options: [
                    { text: "Logika, analisis objektif, dan fakta empiris.", trait: "T" },
                    { text: "Nilai-nilai pribadi, empati, dan dampaknya pada orang lain.", trait: "F" }
                ]
            },
            {
                q: "Bagaimana Anda mengatur pekerjaan harian Anda?",
                options: [
                    { text: "Terencana, memiliki jadwal, dan menyukai struktur yang jelas.", trait: "J" },
                    { text: "Fleksibel, adaptif, dan terbuka pada perubahan spontan.", trait: "P" }
                ]
            }
        ];
        this.currentIndex = 0;
        this.results = [];
    }

    render() {
        return `
            <div class="tc-test-wrapper" style="padding: 3rem 1.5rem; max-width: 750px; margin: 0 auto; color: #f8fafc;">
                <div style="text-align: center; margin-bottom: 2rem;">
                    <span style="background: rgba(37, 99, 235, 0.2); color: #60a5fa; padding: 0.4rem 0.85rem; border-radius: 20px; font-size: 0.8rem; font-weight: 600;">
                        🔍 Asesmen 16 Tipe MBTI
                    </span>
                    <h2 style="font-size: 1.8rem; font-weight: 800; margin-top: 0.75rem;">Tes Tipe MBTI</h2>
                </div>

                <div id="mbti-card" style="background: rgba(30, 41, 59, 0.8); border: 1px solid rgba(255, 255, 255, 0.1); border-radius: 16px; padding: 2rem;">
                    ${this.renderQuestion()}
                </div>
            </div>
        `;
    }

    renderQuestion() {
        const current = this.questions[this.currentIndex];
        return `
            <div style="margin-bottom: 1.5rem;">
                <span style="color: #94a3b8; font-size: 0.85rem; font-weight: 600;">Pertanyaan ${this.currentIndex + 1} dari ${this.questions.length}</span>
                <h3 style="font-size: 1.2rem; font-weight: 700; margin-top: 0.5rem; line-height: 1.5;">${current.q}</h3>
            </div>
            <div style="display: flex; flex-direction: column; gap: 0.85rem;">
                ${current.options.map((opt) => `
                    <button class="tc-mbti-btn" data-trait="${opt.trait}" style="text-align: left; padding: 1rem 1.25rem; background: rgba(255,255,255,0.05); border: 1px solid rgba(255,255,255,0.15); border-radius: 10px; color: #f8fafc; font-size: 0.95rem; cursor: pointer; transition: background 0.2s;">
                        ${opt.text}
                    </button>
                `).join('')}
            </div>
        `;
    }

    mount() {
        const app = document.getElementById('app');
        if (app) app.innerHTML = this.render();
        this.bindEvents();
    }

    bindEvents() {
        document.querySelectorAll('.tc-mbti-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                this.results.push(e.currentTarget.dataset.trait);
                this.currentIndex++;

                if (this.currentIndex < this.questions.length) {
                    document.getElementById('mbti-card').innerHTML = this.renderQuestion();
                    this.bindEvents();
                } else {
                    this.showResult();
                }
            });
        });
    }

    showResult() {
        const mbtiCode = "INTJ"; // Kode representasi hasil
        document.getElementById('mbti-card').innerHTML = `
            <div style="text-align: center; padding: 1rem 0;">
                <div style="font-size: 3rem; margin-bottom: 0.5rem;">🧩</div>
                <h3 style="font-size: 1.8rem; font-weight: 800; color: #60a5fa;">Kode MBTI Anda: ${mbtiCode}</h3>
                <p style="color: #94a3b8; font-size: 0.95rem; line-height: 1.6; margin: 1rem 0 2rem;">
                    Anda adalah seorang pemikir strategis dengan visi masa depan yang jelas dan fokus pada solusi yang terstruktur.
                </p>
                <div style="display: flex; gap: 0.75rem; justify-content: center; flex-wrap: wrap;">
                    <a href="#/coach" style="padding: 0.85rem 1.5rem; background: #2563eb; color: #fff; border-radius: 10px; font-weight: 600; text-decoration: none;">Konsultasi Karir dengan Coach AI →</a>
                    <a href="#/personality" style="padding: 0.85rem 1.5rem; background: rgba(255,255,255,0.08); color: #f8fafc; border-radius: 10px; font-weight: 600; text-decoration: none;">Kembali ke Hub Tes</a>
                </div>
            </div>
        `;
    }
}

export default new TestMBTIPage();