/**
 * TopCare AI Platform V2.0.0
 * About Page Controller
 * Path: assets/js/pages/about.page.js
 */
import Logger from '../core/logger.js';
const AboutPage = {
    init() {}, mount() {},
    async render(container) {
        Logger.info("[AboutPage] Rendering");
        container.innerHTML = `<div style="padding: 10rem 2rem; text-align: center; color: white;"><h1 style="font-size:3rem; margin-bottom:1rem;">Tentang Kami</h1><p style="color:#9ca3af; font-size:1.125rem;">Enterprise platform background and vision.</p></div>`;
    },
    destroy() { Logger.info("[AboutPage] Destroyed"); }
};
export default AboutPage;