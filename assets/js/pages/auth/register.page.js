/**
 * TOPCARE AI PLATFORM V2
 * Path: assets/js/pages/auth/register.page.js
 * Status: MIGRATED TO AUTHORITATIVE APP-ROUTER (Removed Double Dispatch)
 */
import { appRouter } from '../../core/router/app-router.js';

export class RegisterPage {
    constructor(container) {
        this.container = container || document.getElementById('app') || document.body;
    }
    async mount(target) {
        const container = target || this.container;
        container.innerHTML = `
            <div class="auth-page" style="padding: 2rem; text-align: center;">
                <h2>Daftar Akun TopCare AI</h2>
                <button id="btn-do-register" style="margin: 0.5rem; padding: 0.5rem 1rem;">Daftar</button>
                <button id="btn-go-login" style="margin: 0.5rem; padding: 0.5rem 1rem;">Sudah punya akun? Login</button>
            </div>
        `;
        const btnReg = document.getElementById('btn-do-register');
        if (btnReg) {
            btnReg.addEventListener('click', () => {
                appRouter.navigate('/login');
            });
        }
        const btnLog = document.getElementById('btn-go-login');
        if (btnLog) {
            btnLog.addEventListener('click', () => {
                appRouter.navigate('/login');
            });
        }
    }
    destroy() { }
}
export default RegisterPage;