/**
 * TopCare AI Platform V2.0.0
 * Contact Page Controller
 * Path: assets/js/pages/contact.page.js
 */
import Logger from '../core/logger.js';
const ContactPage = {
    init() {}, mount() {},
    async render(container) {
        Logger.info("[ContactPage] Rendering");
        container.innerHTML = `<div style="padding: 10rem 2rem; text-align: center; color: white;"><h1 style="font-size:3rem; margin-bottom:1rem;">Hubungi Kami</h1><p style="color:#9ca3af; font-size:1.125rem;">Tim support dan enterprise architect kami siap membantu.</p></div>`;
    },
    destroy() { Logger.info("[ContactPage] Destroyed"); }
};
export default ContactPage;