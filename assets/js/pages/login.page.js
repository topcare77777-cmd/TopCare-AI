/**
 * TOPCARE AI PLATFORM V3 — CANONICAL LOGIN PAGE
 * Path: assets/js/pages/login.page.js
 * Status: PHASE 2.2.2 CANONICAL AUTH CONSOLIDATED
 */

import { UserRepository } from '../core/repositories/user.repository.js';
import { PlatformService } from '../core/services/platform.service.js';
import { SanitizerUtil } from '../core/utils/sanitizer.util.js';
import { DOMListenerUtil } from '../core/utils/dom-listener.util.js';

export class LoginPage {
    constructor(container) {
        this.container = container || document.getElementById('app') || document.body;
        this.domListeners = new DOMListenerUtil();
    }

    async mount(target) {
        this.domListeners.cleanup();
        const container = target || this.container;

        // Cek sesi aktif: jika sudah login, redirect sesuai role
        const session = await PlatformService.getCurrentUserSession(true);
        if (session) {
            window.location.hash = session.role === 'super_admin' ? '#/admin' : '#/dashboard';
            return;
        }

        container.innerHTML = `
            <div style="min-height: 85vh; display: flex; align-items: center; justify-content: center; padding: 2rem 1rem; background: #020817;">
                <div style="width: 100%; max-width: 440px; background: rgba(15, 23, 42, 0.85); border: 1px solid rgba(255, 255, 255, 0.1); border-radius: 16px; padding: 2.5rem 2rem; box-shadow: 0 12px 32px rgba(0, 0, 0, 0.4); color: #fff;">
                    
                    <div style="text-align: center; margin-bottom: 2rem;">
                        <h2 style="font-size: 1.75rem; font-weight: 800; margin-bottom: 0.5rem; letter-spacing: -0.5px;">Masuk ke TopCare AI</h2>
                        <p style="color: #94a3b8; font-size: 0.9rem; margin: 0;">Masukkan kredensial Anda untuk melanjutkan</p>
                    </div>

                    <div id="login-alert" style="display: none; padding: 0.75rem 1rem; border-radius: 8px; margin-bottom: 1.5rem; font-size: 0.875rem;"></div>

                    <form id="form-login" style="display: flex; flex-direction: column; gap: 1.25rem;">
                        <div>
                            <label style="display: block; font-size: 0.85rem; font-weight: 600; color: #cbd5e1; margin-bottom: 0.4rem;">Email / Username</label>
                            <input type="email" id="login-email" required placeholder="nama@email.com" style="width: 100%; padding: 0.75rem 1rem; background: rgba(30, 41, 59, 0.6); border: 1px solid rgba(255, 255, 255, 0.15); border-radius: 8px; color: #fff; font-size: 0.95rem; box-sizing: border-box;" />
                        </div>

                        <div>
                            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.4rem;">
                                <label style="font-size: 0.85rem; font-weight: 600; color: #cbd5e1;">Password</label>
                                <a href="#/forgot-password" style="font-size: 0.8rem; color: #38bdf8; text-decoration: none;">Lupa password?</a>
                            </div>
                            <input type="password" id="login-password" required placeholder="••••••••" style="width: 100%; padding: 0.75rem 1rem; background: rgba(30, 41, 59, 0.6); border: 1px solid rgba(255, 255, 255, 0.15); border-radius: 8px; color: #fff; font-size: 0.95rem; box-sizing: border-box;" />
                        </div>

                        <div style="display: flex; gap: 0.75rem; margin-top: 0.5rem;">
                            <a href="#/home" style="flex: 1; text-align: center; padding: 0.75rem; background: rgba(255, 255, 255, 0.08); color: #94a3b8; text-decoration: none; border-radius: 8px; font-weight: 600; font-size: 0.9rem; border: 1px solid rgba(255,255,255,0.1);">Batal</a>
                            <button type="submit" id="btn-submit-login" style="flex: 1.5; padding: 0.75rem; background: #2563eb; color: #fff; border: none; border-radius: 8px; font-weight: 700; font-size: 0.9rem; cursor: pointer; transition: 0.2s;">Masuk Sekarang</button>
                        </div>
                    </form>

                    <div style="text-align: center; margin-top: 2rem; font-size: 0.875rem; color: #94a3b8;">
                        Belum punya akun? <a href="#/register" style="color: #38bdf8; text-decoration: none; font-weight: 600;">Daftar Gratis</a>
                    </div>
                </div>
            </div>
        `;

        this.#bindEvents();
    }

    #bindEvents() {
        const form = document.getElementById('form-login');
        const alertBox = document.getElementById('login-alert');
        const btnSubmit = document.getElementById('btn-submit-login');

        if (form) {
            this.domListeners.add(form, 'submit', async (e) => {
                e.preventDefault();
                const email = document.getElementById('login-email')?.value.trim();
                const password = document.getElementById('login-password')?.value;

                if (!email || !password) return;

                if (btnSubmit) {
                    btnSubmit.disabled = true;
                    btnSubmit.innerText = 'Memproses...';
                }

                if (alertBox) {
                    alertBox.style.display = 'none';
                }

                try {
                    const { data, error } = await UserRepository.signIn(email, password);

                    if (error || !data?.user) {
                        throw new Error(error?.message || 'Email atau password salah.');
                    }

                    // Sesi valid, clear in-memory platform cache agar refresh authoritative
                    PlatformService.clearSessionCache();
                    const session = await PlatformService.getCurrentUserSession(true);

                    // Redirect sesuai role
                    const redirectTarget = sessionStorage.getItem('tcr_redirect_target');
                    sessionStorage.removeItem('tcr_redirect_target');

                    if (redirectTarget && redirectTarget !== '#/login' && redirectTarget !== '#/register') {
                        window.location.hash = redirectTarget;
                    } else if (session?.role === 'super_admin') {
                        window.location.hash = '#/admin';
                    } else {
                        window.location.hash = '#/dashboard';
                    }

                } catch (err) {
                    if (btnSubmit) {
                        btnSubmit.disabled = false;
                        btnSubmit.innerText = 'Masuk Sekarang';
                    }
                    if (alertBox) {
                        alertBox.style.display = 'block';
                        alertBox.style.background = 'rgba(239, 68, 68, 0.15)';
                        alertBox.style.border = '1px solid #ef4444';
                        alertBox.style.color = '#f87171';
                        alertBox.innerText = `❌ ${SanitizerUtil.escapeHTML(err.message)}`;
                    }
                }
            });
        }
    }

    destroy() {
        this.domListeners.cleanup();
    }
}

export default LoginPage;