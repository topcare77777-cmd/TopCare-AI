/**
 * -----------------------------------------------------------------
 * TOPCARE AI PLATFORM - ARCHITECTURE METADATA
 * -----------------------------------------------------------------
 * Layer        : Layer 4 - Page
 * Status       : ACTIVE
 * Version      : 2.5.0
 * Architecture : Development Constitution v1.1
 * Owner        : Personality Landing Page Conductor
 * Created      : Sprint 46A
 * Last Updated : BUILD 092.2 Personality Lifecycle Hardening
 *
 * Pattern      : Page Conductor (Layer 4)
 * Compatible   : TopCare AI Runtime 2.x
 *
 * Page API :
 *   init()
 *   mount(container)
 *   render(container)
 *   beforeEnter()
 *   afterEnter()
 *   beforeLeave()
 *   destroy()
 *   cleanup()
 * -----------------------------------------------------------------
 */

export const personalityPage = {
    container: null,
    isMounted: false,
    boundCtaHandler: null,

    init() {
        // Initialization hook for backward compatibility
    },

    async mount(container) {
        return await this.render(container);
    },

    async render(container) {
        if (!container) return;

        // Mount protection: prevent duplicate rendering if already mounted on the same container
        if (this.isMounted && this.container === container) {
            return;
        }

        // If mounted elsewhere, cleanup first
        if (this.isMounted) {
            this.destroy();
        }

        this.container = container;

        // Render introduction/landing view with UTF-8 encoding corrections
        this.container.innerHTML = `
            <div class="enterprise-section personality-landing-wrapper" style="width:100%; max-width:900px; margin:0 auto; padding:3rem 1.5rem; text-align:center;">
                <div class="section-header-box" style="margin-bottom: 2rem;">
                    <span class="result-badge" style="background: rgba(37, 99, 235, 0.2); color: #60a5fa; padding: 0.4rem 1rem; border-radius: 999px; font-weight: 700; display: inline-block; margin-bottom: 1rem;">Personality & Temperament Ecosystem</span>
                    <h1 style="font-size: 2.5rem; font-weight: 800; color: #fff; margin-bottom: 1rem;">Kenali Potensi Dasar Dirimu</h1>
                    <p style="font-size: 1.05rem; color: #9ca3af; line-height: 1.6; max-width: 650px; margin: 0 auto;">
                        Temukan tipe kepribadian dan temperamen dominan Anda melalui pendekatan psikologi modern yang terstruktur. Pahami kekuatan, gaya komunikasi, serta jalur pengembangan personal untuk memaksimalkan potensi harian Anda.
                    </p>
                </div>

                <div class="personality-hero-card" style="background: rgba(30, 41, 59, 0.6); border: 1px solid rgba(255, 255, 255, 0.08); border-radius: 20px; padding: 2.5rem; margin-bottom: 2.5rem; backdrop-filter: blur(12px); box-shadow: 0 20px 50px rgba(0, 0, 0, 0.4);">
                    <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(220px, 1fr)); gap: 1.5rem; margin-bottom: 2rem; text-align: left;">
                        <div style="background: rgba(17, 24, 39, 0.5); border: 1px solid rgba(255, 255, 255, 0.05); border-radius: 12px; padding: 1.25rem;">
                            <h3 style="color: #60a5fa; font-size: 1rem; font-weight: 700; margin-bottom: 0.5rem;">🧠 Pemetaan Ilmiah</h3>
                            <p style="color: #d1d5db; font-size: 0.9rem; margin: 0; line-height: 1.4;">Analisis berbasis klasifikasi temperamen klasik dan literatur psikologi teruji.</p>
                        </div>
                        <div style="background: rgba(17, 24, 39, 0.5); border: 1px solid rgba(255, 255, 255, 0.05); border-radius: 12px; padding: 1.25rem;">
                            <h3 style="color: #60a5fa; font-size: 1rem; font-weight: 700; margin-bottom: 0.5rem;">⚡ Wawasan Instan</h3>
                            <p style="color: #d1d5db; font-size: 0.9rem; margin: 0; line-height: 1.4;">Dapatkan laporan komprehensif setelah menyelesaikan rangkaian tes interaktif.</p>
                        </div>
                        <div style="background: rgba(17, 24, 39, 0.5); border: 1px solid rgba(255, 255, 255, 0.05); border-radius: 12px; padding: 1.25rem;">
                            <h3 style="color: #60a5fa; font-size: 1rem; font-weight: 700; margin-bottom: 0.5rem;">🎯 Pertumbuhan Terarah</h3>
                            <p style="color: #d1d5db; font-size: 0.9rem; margin: 0; line-height: 1.4;">Rekomendasi pengembangan diri yang disesuaikan khusus dengan profil Anda.</p>
                        </div>
                    </div>

                    <button id="start-personality-cta" class="btn-hero-primary" style="background: #2563eb; color: #fff; border: none; padding: 0.85rem 2.5rem; font-size: 1rem; font-weight: 600; border-radius: 999px; cursor: pointer; transition: background 0.2s ease; box-shadow: 0 4px 14px rgba(37, 99, 235, 0.4);">
                        Mulai Tes Kepribadian &rarr;
                    </button>
                </div>
            </div>
        `;

        const ctaButton = this.container.querySelector('#start-personality-cta');
        if (ctaButton) {
            // Define named handler for proper event cleanup and duplication prevention
            this.boundCtaHandler = () => {
                window.location.hash = '#/personality-test';
            };
            ctaButton.addEventListener('click', this.boundCtaHandler);
        }

        this.isMounted = true;
    },

    beforeEnter() { },

    afterEnter() { },

    beforeLeave() { },

    destroy() {
        // Cleanup event listeners before wiping markup
        if (this.container && this.boundCtaHandler) {
            const ctaButton = this.container.querySelector('#start-personality-cta');
            if (ctaButton) {
                ctaButton.removeEventListener('click', this.boundCtaHandler);
            }
        }
        this.boundCtaHandler = null;

        if (this.container) {
            this.container.innerHTML = '';
        }
        this.isMounted = false;
    },

    cleanup() {
        this.destroy();
        this.container = null;
    }
};

export default personalityPage;