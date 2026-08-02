/**
 * TOPCARE AI PLATFORM V2 — LOGIN PAGE CONTROLLER
 * Path: assets/js/pages/auth/login.page.js
 * Status: ACTIVE - BUILD 138 (AUTHENTICATION RUNTIME BRIDGE)
 * SRP: Manages Login UI, delegates credentials to AuthService V2, and consumes Redirect Intent.
 */

import { AuthService } from '../../auth/auth.service.js';
import { AuthRouteGuard } from '../../auth/guards/auth-route.guard.js';
import { Router } from '../../router/router.js';
import { Core } from '../../core/index.js';

export class LoginPage {
    constructor(hostContainer) {
        this.host = hostContainer || document.getElementById('app-host') || document.body;
        this.isMounted = false;
        this._boundSubmitHandler = null;
    }

    async mount() {
        if (this.isMounted) return;

        // Render Clean V2 Login Template
        this.host.innerHTML = `
            <div class="tc-auth-container" style="max-width: 420px; margin: 60px auto; padding: 32px; background: #1E293B; border-radius: 12px; color: #F8FAFC; box-shadow: 0 10px 25px rgba(0,0,0,0.5);">
                <div style="text-align: center; margin-bottom: 24px;">
                    <h2 style="color: #3B82F6; margin-bottom: 8px;">Masuk ke TopCare AI</h2>
                    <p style="color: #94A3B8; font-size: 14px; margin: 0;">Akses AI Coach & Tes Kepribadian Anda</p>
                </div>

                <div id="tc-auth-error" style="display: none; background: #991B1B; color: #FECACA; padding: 10px 14px; border-radius: 6px; font-size: 13px; margin-bottom: 16px;"></div>

                <form id="tc-login-form">
                    <div style="margin-bottom: 16px;">
                        <label style="display: block; font-size: 13px; color: #CBD5E1; margin-bottom: 6px;">Username / Email</label>
                        <input type="text" id="tc-login-username" required placeholder="doctor@topcare.ai" style="width: 100%; padding: 10px 12px; background: #0F172A; border: 1px solid #334155; border-radius: 6px; color: #FFF; font-size: 14px; box-sizing: border-box;" />
                    </div>

                    <div style="margin-bottom: 24px;">
                        <label style="display: block; font-size: 13px; color: #CBD5E1; margin-bottom: 6px;">Kata Sandi</label>
                        <input type="password" id="tc-login-password" required placeholder="••••••••" style="width: 100%; padding: 10px 12px; background: #0F172A; border: 1px solid #334155; border-radius: 6px; color: #FFF; font-size: 14px; box-sizing: border-box;" />
                    </div>

                    <button type="submit" id="tc-login-submit-btn" style="width: 100%; padding: 12px; background: #3B82F6; color: white; border: none; border-radius: 6px; font-weight: 600; font-size: 15px; cursor: pointer;">
                        Masuk Sekarang
                    </button>
                </form>

                <div style="margin-top: 20px; text-align: center; font-size: 13px; color: #94A3B8;">
                    Belum punya akun? <a href="#/register" style="color: #3B82F6; text-decoration: none;">Daftar di sini</a>
                </div>
            </div>
        `;

        this.attachFormListeners();
        this.isMounted = true;
        Core.Logger.info('[LoginPage] Mounted successfully.');
    }

    attachFormListeners() {
        const form = this.host.querySelector('#tc-login-form');
        if (!form) return;

        this._boundSubmitHandler = async (event) => {
            event.preventDefault();
            this.hideError();

            const usernameInput = this.host.querySelector('#tc-login-username');
            const passwordInput = this.host.querySelector('#tc-login-password');
            const submitBtn = this.host.querySelector('#tc-login-submit-btn');

            const username = usernameInput ? usernameInput.value.trim() : '';
            const password = passwordInput ? passwordInput.value : '';

            if (!username || !password) {
                this.showError('Username dan Password wajib diisi.');
                return;
            }

            try {
                if (submitBtn) {
                    submitBtn.disabled = true;
                    submitBtn.textContent = 'Memproses...';
                }

                // 1. Execute Authentication V2 Pipeline via AuthService SSOT
                const authResult = await AuthService.login(username, password);

                if (authResult && (authResult.success || authResult.user || authResult.userDto)) {
                    Core.Logger.info(`[LoginPage] Login successful for user: ${username}`);

                    // 2. Consume Redirect Intent saved by AuthRouteGuard
                    const targetRoute = AuthRouteGuard.consumeRedirectIntent();
                    Core.Logger.info(`[LoginPage] Navigating to target route: ${targetRoute}`);

                    // 3. Navigate user to target destination
                    Router.navigate(targetRoute);
                } else {
                    this.showError(authResult?.message || 'Gagal masuk. Periksa username dan password Anda.');
                }
            } catch (err) {
                Core.Logger.error(`[LoginPage] Login execution error: ${err.message}`);
                this.showError(err.message || 'Terjadi kesalahan sistem saat mencoba masuk.');
            } finally {
                if (submitBtn) {
                    submitBtn.disabled = false;
                    submitBtn.textContent = 'Masuk Sekarang';
                }
            }
        };

        form.addEventListener('submit', this._boundSubmitHandler);
    }

    showError(msg) {
        const errEl = this.host.querySelector('#tc-auth-error');
        if (errEl) {
            errEl.textContent = msg;
            errEl.style.display = 'block';
        }
    }

    hideError() {
        const errEl = this.host.querySelector('#tc-auth-error');
        if (errEl) {
            errEl.style.display = 'none';
            errEl.textContent = '';
        }
    }

    destroy() {
        const form = this.host.querySelector('#tc-login-form');
        if (form && this._boundSubmitHandler) {
            form.removeEventListener('submit', this._boundSubmitHandler);
            this._boundSubmitHandler = null;
        }
        if (this.host) {
            this.host.innerHTML = '';
        }
        this.isMounted = false;
        Core.Logger.info('[LoginPage] Destroyed.');
    }
}

export default LoginPage;
