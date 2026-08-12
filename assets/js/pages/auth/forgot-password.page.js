/**
 * TOPCARE AI PLATFORM V2
 * Path: assets/js/pages/auth/forgot-password.page.js
 * Status: MIGRATED TO AUTHORITATIVE APP-ROUTER
 */
import { appRouter } from '../../core/router/app-router.js';

export class ForgotPasswordPage {
    constructor(container) {
        this.container = container || document.getElementById('app') || document.body;
    }
    async mount(target) {
        const container = target || this.container;
        container.innerHTML = `
            <div class="auth-page" style="padding: 2rem; text-align: center;">
                <h2>Lupa Kata Sandi</h2>
                <p>Masukkan email Anda untuk mereset kata sandi.</p>
                <button id="btn-back-login" style="margin-top: 1rem; padding: 0.5rem 1rem;">Kembali ke Login</button>
            </div>
        `;
        const btn = document.getElementById('btn-back-login');
        if (btn) {
            btn.addEventListener('click', () => {
                appRouter.navigate('/login');
            });
        }
    }
    destroy() { }
}
export default ForgotPasswordPage;