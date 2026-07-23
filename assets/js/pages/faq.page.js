/**
 * TopCare AI Platform V2.0.0
 * FAQ Page Controller
 * Path: assets/js/pages/faq.page.js
 */
import Logger from '../core/logger.js';
const FaqPage = {
    init() {}, mount() {},
    async render(container) {
        Logger.info("[FaqPage] Rendering");
        container.innerHTML = `<div style="padding: 10rem 2rem; text-align: center; color: white;"><h1 style="font-size:3rem; margin-bottom:1rem;">Frequently Asked Questions</h1><p style="color:#9ca3af; font-size:1.125rem;">Jawaban atas pertanyaan seputar platform dan enterprise SLA.</p></div>`;
    },
    destroy() { Logger.info("[FaqPage] Destroyed"); }
};
export default FaqPage;