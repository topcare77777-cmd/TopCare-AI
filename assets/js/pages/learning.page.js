/**
 * TopCare AI Platform V2.0.0
 * Learning Page Controller
 * Path: assets/js/pages/learning.page.js
 */
import Logger from '../core/logger.js';
const LearningPage = {
    init() {}, mount() {},
    async render(container) {
        Logger.info("[LearningPage] Rendering");
        container.innerHTML = `<div style="padding: 10rem 2rem; text-align: center; color: white;"><h1 style="font-size:3rem; margin-bottom:1rem;">Belajar AI</h1><p style="color:#9ca3af; font-size:1.125rem;">Ratusan kursus AI berkualitas untuk tingkatkan skill Anda.</p></div>`;
    },
    destroy() { Logger.info("[LearningPage] Destroyed"); }
};
export default LearningPage;