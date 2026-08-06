/**
 * TOPCARE AI PLATFORM V2 — LOGIN PAGE CONTROLLER
 * Path: assets/js/pages/auth/login.page.js
 * Status: ACTIVE - ROUTER SERVICE MIGRATION (BUILD 129.0)
 * SRP: Handles login interactions and executes NavigationIntentService continuation.
 */

import { AuthService } from '../../auth/auth.service.js';
import { NavigationIntentService } from '../../runtime/navigation.intent.service.js';
import { Router } from '../../router/index.js';
import { Core } from '../../core/index.js';

export class LoginPage {
    constructor(container) {
        this.container = container || document.getElementById('app-host') || document.body;
        this.isMounted = false;
    }

    async mount() {
        this.render();
        this.bindEvents();
        this.isMounted = true;
    }

    render() {
        this.container.innerHTML = `
            <div class="tc-auth-page-container" style="max-width: 420px; margin: 80px auto; padding: 32px; background: #1E293B; border-radius: 16px; border: 1px solid #334155; color: #F8FAFC;">
                <div style="text-align: center; margin-bottom: 24px;">
                    <h2 style="margin: 0 0 8px 0; font-size: 24px;">Masuk ke TopCare AI</h2>
                    <p style="margin: 0; color: #94A3B8; font-size: 14px;">Masukan kredensial Anda untuk melanjutkan</p>
                </div>

                <form id="login-form" style="display: flex; flex-direction: column; gap: 16px;">
                    <div>
                        <label style="display: block; font-size: 13px; margin-bottom: 6px; color: #CBD5E1;">Username / Email</label>
                        <input type="text" id="login-username" value="doctor" style="width: 100%; padding: 10px 12px; background: #0F172A; border: 1px solid #334155; border-radius: 8px; color: white; box-sizing: border-box;" required />
                    </div>

                    <div>
                        <label style="display: block; font-size: 13px; margin-bottom: 6px; color: #CBD5E1;">Password</label>
                        <input type="password" id="login-password" value="password" style="width: 100%; padding: 10px 12px; background: #0F172A; border: 1px solid #334155; border-radius: 8px; color: white; box-sizing: border-box;" required />
                    </div>

                    <div id="login-error" style="color: #EF4444; font-size: 13px; display: none;"></div>

                    <button type="submit" id="btn-submit-login" style="background: #3B82F6; color: white; border: none; padding: 12px; border-radius: 8px; font-weight: 600; cursor: pointer; margin-top: 8px;">
                        Masuk Sekarang
                    </button>
                </form>
            </div>
        `;
    }

    bindEvents() {
        const form = this.container.querySelector('#login-form');
        if (!form) return;

        form.addEventListener('submit', async (e) => {
            e.preventDefault();
            const username = this.container.querySelector('#login-username').value;
            const password = this.container.querySelector('#login-password').value;
            const errorEl = this.container.querySelector('#login-error');

            errorEl.style.display = 'none';

            try {
                const result = await AuthService.login(username, password);
                if (result && result.success) {
                    // Check if there is a pending navigation intent (e.g. /coach-selection)
                    const pendingIntent = NavigationIntentService.restoreIntent();
                    const targetRoute = pendingIntent && pendingIntent.route ? pendingIntent.route : '/coach-selection';

                    Core.Logger.info(`[LoginPage] Login successful. Continuing journey to: ${targetRoute}`);
                    Router.navigate(targetRoute);
                } else {
                    errorEl.textContent = result.message || 'Gagal masuk. Periksa kembali akun Anda.';
                    errorEl.style.display = 'block';
                }
            } catch (err) {
                Core.Logger.error(`[LoginPage] Login error: ${err.message}`);
                errorEl.textContent = 'Terjadi kesalahan sistem.';
                errorEl.style.display = 'block';
            }
        });
    }

    async unmount() {
        this.destroy();
    }

    destroy() {
        if (this.container) {
            this.container.innerHTML = '';
        }
        this.isMounted = false;
    }
}

export default LoginPage;