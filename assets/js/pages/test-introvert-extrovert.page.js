/**
 * TOPCARE AI PLATFORM V2 — INTROVERT VS EXTROVERT SPECTRUM TEST
 * Path: assets/js/pages/test-introvert-extrovert.page.js
 */

export class TestIntrovertExtrovertPage {
    constructor() {
        this.questions = [
            {
                q: "Bagaimana cara Anda biasanya mengisi ulang energi setelah minggu yang sibuk?",
                options: [
                    { text: "Menikmati waktu sendiri dengan membaca, nonton, atau bersantai di rumah.", type: "I" },
                    { text: "Berkumpul, nongkrong, atau menghabiskan waktu bersama teman-teman.", type: "E" }
                ]
            },
            {
                q: "Di dalam sebuah diskusi kelompok besar, Anda cenderung:",
                options: [
                    { text: "Mendengarkan dulu, memproses ide di kepala, baru berbicara jika perlu.", type: "I" },
                    { text: "Spontan menyampaikan ide secara langsung saat pikiran itu muncul.", type: "E" }
                ]
            },
            {
                q: "Ketika berada di acara sosial yang ramai, Anda biasanya merasa:",
                options: [
                    { text: "Energik di awal, tetapi perlahan kehabisan energi setelah beberapa jam.", type: "I" },
                    { text: "Makin bersemangat dan berenergi seiring bertambahnya interaksi.", type: "E" }
                ]
            }
        ];
        this.currentIndex = 0;
        this.scores = { I: 0, E: 0 };
    }

    render() {
        return `
            <div class="tc-test-wrapper" style="padding: 3rem 1.5rem; max-width: 750px; margin: 0 auto; color: #f8fafc;">
                <div style="text-align: center; margin-bottom: 2rem;">
                    <span style="background: rgba(37, 99, 235, 0.2); color: #60a5fa; padding: 0.4rem 0.85rem; border-radius: 20px; font-size: 0.8rem; font-weight: 600;">
                        🔋 Asesmen Spektrum Energi
                    </span>
                    <h2 style="font-size: 1.8rem; font-weight: 800; margin-top: 0.75rem;">Tes Introvert vs Ekstrovert</h2>
                </div>

                <div id="test-card" style="background: rgba(30, 41, 59, 0.8); border: 1px solid rgba(255, 255, 255, 0.1); border-radius: 16px; padding: 2rem;">
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
                ${current.options.map((opt, i) => `
                    <button class="tc-opt-btn" data-type="${opt.type}" style="text-align: left; padding: 1rem 1.25rem; background: rgba(255,255,255,0.05); border: 1px solid rgba(255,255,255,0.15); border-radius: 10px; color: #f8fafc; font-size: 0.95rem; cursor: pointer; transition: background 0.2s;">
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
        document.querySelectorAll('.tc-opt-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const type = e.currentTarget.dataset.type;
                this.scores[type]++;
                this.currentIndex++;

                if (this.currentIndex < this.questions.length) {
                    document.getElementById('test-card').innerHTML = this.renderQuestion();
                    this.bindEvents();
                } else {
                    this.showResult();
                }
            });
        });
    }

    showResult() {
        const isIntrovert = this.scores.I >= this.scores.E;
        const resultType = isIntrovert ? 'Introvert' : 'Ekstrovert';
        const desc = isIntrovert
            ? 'Anda cenderung memproses ide secara mendalam di dalam pikiran dan mengisi ulang energi dalam suasana yang tenang.'
            : 'Anda sangat terbuka, energik dalam interaksi sosial, dan berkembang pesat saat bertukar pikiran secara langsung.';

        document.getElementById('test-card').innerHTML = `
            <div style="text-align: center; padding: 1rem 0;">
                <div style="font-size: 3rem; margin-bottom: 0.5rem;">${isIntrovert ? '🔋' : '⚡'}</div>
                <h3 style="font-size: 1.5rem; font-weight: 800; color: #60a5fa;">Tipe Energi Anda: ${resultType}</h3>
                <p style="color: #94a3b8; font-size: 0.95rem; line-height: 1.6; margin: 1rem 0 2rem;">${desc}</p>
                <div style="display: flex; gap: 0.75rem; justify-content: center; flex-wrap: wrap;">
                    <a href="#/coach" style="padding: 0.85rem 1.5rem; background: #2563eb; color: #fff; border-radius: 10px; font-weight: 600; text-decoration: none;">Diskusi dengan Coach AI →</a>
                    <a href="#/personality" style="padding: 0.85rem 1.5rem; background: rgba(255,255,255,0.08); color: #f8fafc; border-radius: 10px; font-weight: 600; text-decoration: none;">Kembali ke Hub Tes</a>
                </div>
            </div>
        `;
    }
}

export default new TestIntrovertExtrovertPage();