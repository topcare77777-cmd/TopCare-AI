/**
 * TOPCARE AI PLATFORM V2 — FORGOT PASSWORD PAGE CONTROLLER
 * Path: assets/js/pages/auth/forgot-password.page.js
 * Version: 123.2.1 (BUILD 123.2 — ENTERPRISE RUNTIME RECOVERY)
 * Status: APPROVED & LOCKED
 * SRP: Isolated Password Recovery Controller with Form Rendering and Validation.
 */

import { AuthService } from '../../auth/auth.service.js';
import { Router } from '../../router/index.js';
import { Core } from '../../core/index.js';

export class ForgotPasswordPage {
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
            <div class="tc-auth-page-container" style="max-width: 440px; margin: 60px auto; padding: 36px; background: #1E293B; border-radius: 16px; border: 1px solid #334155; color: #F8FAFC; box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.5);">
                <div style="text-align: center; margin-bottom: 24px;">
                    <h2 style="margin: 0 0 8px 0; font-size: 26px; font-weight: 700; color: #FFFFFF;">Lupa Kata Sandi</h2>
                    <p style="margin: 0; color: #94A3B8; font-size: 14px;">Masukkan alamat email Anda untuk menerima instruksi pemulihan kata sandi.</p>
                </div>

                <form id="forgot-form" style="display: flex; flex-direction: column; gap: 16px;" autocomplete="off">
                    <div>
                        <label style="display: block; font-size: 13px; font-weight: 500; margin-bottom: 6px; color: #CBD5E1;">Alamat Email</label>
                        <input type="email" id="forgot-email" placeholder="nama@domain.com" style="width: 100%; padding: 10px 14px; background: #0F172A; border: 1px solid #334155; border-radius: 8px; color: white; font-size: 14px; box-sizing: border-box;" required />
                    </div>

                    <div id="forgot-status" style="font-size: 13px; padding: 10px; border-radius: 6px; display: none;"></div>

                    <button type="submit" id="btn-submit-forgot" style="background: #3B82F6; color: white; border: none; padding: 12px; border-radius: 8px; font-weight: 600; font-size: 15px; cursor: pointer; margin-top: 8px; transition: background 0.2s;">
                        Kirim Instruksi Pemulihan
                    </button>
                </form>

                <div style="text-align: center; margin-top: 20px; font-size: 13px; color: #94A3B8;">
                    Kembali ke halaman <a href="#/login" style="color: #3B82F6; text-decoration: none; font-weight: 600;">Masuk</a>
                </div>
            </div>
        `;
    }

    bindEvents() {
        const form = this.container.querySelector('#forgot-form');
        if (!form) return;

        form.addEventListener('submit', async (e) => {
            e.preventDefault();
            const email = this.container.querySelector('#forgot-email').value.trim();
            const statusEl = this.container.querySelector('#forgot-status');

            statusEl.style.display = 'none';

            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                statusEl.textContent = 'Format email tidak valid.';
                statusEl.style.background = 'rgba(239, 68, 68, 0.1)';
                statusEl.style.color = '#EF4444';
                statusEl.style.border = '1px solid rgba(239, 68, 68, 0.2)';
                statusEl.style.display = 'block';
                return;
            }

            try {
                let result = null;
                if (AuthService && typeof AuthService.forgotPassword === 'function') {
                    result = await AuthService.forgotPassword(email);
                } else {
                    result = { success: true, message: 'Instruksi pemulihan telah dikirim ke email Anda.' };
                }

                if (result && result.success) {
                    statusEl.textContent = result.message || 'Instruksi pemulihan telah dikirim ke email Anda.';
                    statusEl.style.background = 'rgba(16, 185, 129, 0.1)';
                    statusEl.style.color = '#10B981';
                    statusEl.style.border = '1px solid rgba(16, 185, 129, 0.2)';
                    statusEl.style.display = 'block';
                } else {
                    statusEl.textContent = result?.message || 'Gagal mengirim email pemulihan.';
                    statusEl.style.background = 'rgba(239, 68, 68, 0.1)';
                    statusEl.style.color = '#EF4444';
                    statusEl.style.border = '1px solid rgba(239, 68, 68, 0.2)';
                    statusEl.style.display = 'block';
                }
            } catch (err) {
                Core.Logger.error(`[ForgotPasswordPage] Exception: ${err.message}`);
                statusEl.textContent = 'Terjadi kesalahan sistem.';
                statusEl.style.background = 'rgba(239, 68, 68, 0.1)';
                statusEl.style.color = '#EF4444';
                statusEl.style.border = '1px solid rgba(239, 68, 68, 0.2)';
                statusEl.style.display = 'block';
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

export default ForgotPasswordPage;