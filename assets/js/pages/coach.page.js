/**
 * TOPCARE AI PLATFORM V2 — AI COACH PAGE
 * Path: assets/js/pages/coach.page.js
 */

export const coachPage = {
    _host: null,

    async init(hostElement) {
        this._host = hostElement;
    },

    async mount(hostElement) {
        this._host = hostElement || this._host;
        if (!this._host) return;

        this._host.innerHTML = `
            <div style="padding: 60px 20px; max-width: 1000px; margin: 0 auto; text-align: center;">
                <span class="tc-badge" style="background: rgba(56, 189, 248, 0.15); color: #38bdf8; border: 1px solid rgba(56, 189, 248, 0.3); padding: 6px 16px; border-radius: 20px; font-size: 13px; font-weight: 600;">
                    Expert AI Guidance
                </span>
                <h1 style="font-size: 2.25rem; color: #ffffff; margin: 16px 0; font-weight: 800;">
                    Sesi Bimbingan AI Coach
                </h1>
                <p style="color: #94a3b8; font-size: 1rem; max-width: 600px; margin: 0 auto 40px auto; line-height: 1.6;">
                    Pilih pendamping AI sesuai dengan kebutuhan pengembangan diri dan temperamen Anda.
                </p>

                <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 20px;">
                    <div class="card-glass" style="padding: 24px; text-align: left; border-radius: 16px; background: rgba(30, 41, 59, 0.6);">
                        <h3 style="color: #38bdf8; margin-top: 0;">Dr. Aria</h3>
                        <p style="color: #e2e8f0; font-weight: 600; font-size: 0.9rem;">Physical Medicine & Well-being</p>
                        <p style="color: #94a3b8; font-size: 0.85rem; line-height: 1.5;">Spesialis kesehatan fisik, rehabilitasi, dan rutinitas harian optimal.</p>
                    </div>

                    <div class="card-glass" style="padding: 24px; text-align: left; border-radius: 16px; background: rgba(30, 41, 59, 0.6);">
                        <h3 style="color: #38bdf8; margin-top: 0;">Coach Kael</h3>
                        <p style="color: #e2e8f0; font-weight: 600; font-size: 0.9rem;">Behavioral & Habit Optimization</p>
                        <p style="color: #94a3b8; font-size: 0.85rem; line-height: 1.5;">Pakar pelacakan kebiasaan terstruktur dan perubahan perilaku berkelanjutan.</p>
                    </div>
                </div>
            </div>
        `;
    },

    async afterEnter() {
        await this.mount(this._host);
    },

    async destroy() {
        if (this._host) {
            this._host.innerHTML = '';
            this._host = null;
        }
    }
};

export default coachPage;