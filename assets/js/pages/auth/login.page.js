/**
 * TOPCARE AI PLATFORM V2
 * Path: assets/js/pages/auth/login.page.js
 * Status: MIGRATED TO AUTHORITATIVE APP-ROUTER
 */
import { appRouter } from '../../core/router/app-router.js';

export class LoginPage {
    constructor(container) {
        this.container = container || document.getElementById('app') || document.body;
    }
    async mount(target) {
        const container = target || this.container;
        container.innerHTML = `
            <div class="auth-page" style="padding: 2rem; text-align: center;">
                <h2>Login TopCare AI</h2>
                <button id="btn-do-login" style="margin: 0.5rem; padding: 0.5rem 1rem;">Masuk</button>
                <button id="btn-go-register" style="margin: 0.5rem; padding: 0.5rem 1rem;">Daftar Akun Baru</button>
            </div>
        `;
        const btnLogin = document.getElementById('btn-do-login');
        if (btnLogin) {
            btnLogin.addEventListener('click', () => {
                appRouter.navigate('/home');
            });
        }
        const btnReg = document.getElementById('btn-go-register');
        if (btnReg) {
            btnReg.addEventListener('click', () => {
                appRouter.navigate('/register');
            });
        }
    }
    destroy() {}
}
export default LoginPage;