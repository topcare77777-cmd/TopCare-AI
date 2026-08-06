/**
 * TOPCARE AI PLATFORM V2 — REGISTER PAGE CONTROLLER
 * Path: assets/js/pages/auth/register.page.js
 * Status: APPROVED & LOCKED (BUILD 129.0)
 * SRP: Isolated User Registration Controller with Simplified Password Validation (Min 8 Chars)
 */

import { AuthService } from '../../auth/auth.service.js';
import { NavigationIntentService } from '../../runtime/navigation.intent.service.js';
import { Router } from '../../router/index.js';
import { Core } from '../../core/index.js';

export class RegisterPage {
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
                    <h2 style="margin: 0 0 8px 0; font-size: 26px; font-weight: 700; color: #FFFFFF;">Daftar Akun TopCare AI</h2>
                    <p style="margin: 0; color: #94A3B8; font-size: 14px;">Mulai perjalanan Coach AI & Tes Kepribadian kamu secara gratis.</p>
                </div>

                <form id="register-form" style="display: flex; flex-direction: column; gap: 16px;" autocomplete="off">
                    <div>
                        <label style="display: block; font-size: 13px; font-weight: 500; margin-bottom: 6px; color: #CBD5E1;">Nama Lengkap</label>
                        <input type="text" id="reg-fullname" placeholder="Dr. John Doe" style="width: 100%; padding: 10px 14px; background: #0F172A; border: 1px solid #334155; border-radius: 8px; color: white; font-size: 14px; box-sizing: border-box;" required />
                    </div>

                    <div>
                        <label style="display: block; font-size: 13px; font-weight: 500; margin-bottom: 6px; color: #CBD5E1;">Alamat Email</label>
                        <input type="email" id="reg-email" placeholder="nama@domain.com" style="width: 100%; padding: 10px 14px; background: #0F172A; border: 1px solid #334155; border-radius: 8px; color: white; font-size: 14px; box-sizing: border-box;" required />
                    </div>

                    <div>
                        <label style="display: block; font-size: 13px; font-weight: 500; margin-bottom: 6px; color: #CBD5E1;">Kata Sandi</label>
                        <input type="password" id="reg-password" placeholder="Minimal 8 karakter" style="width: 100%; padding: 10px 14px; background: #0F172A; border: 1px solid #334155; border-radius: 8px; color: white; font-size: 14px; box-sizing: border-box;" required minlength="8" />
                    </div>

                    <div id="register-error" style="color: #EF4444; font-size: 13px; background: rgba(239, 68, 68, 0.1); padding: 10px; border-radius: 6px; border: 1px solid rgba(239, 68, 68, 0.2); display: none;"></div>

                    <button type="submit" id="btn-submit-register" style="background: #3B82F6; color: white; border: none; padding: 12px; border-radius: 8px; font-weight: 600; font-size: 15px; cursor: pointer; margin-top: 8px; transition: background 0.2s;">
                        Daftar Member Gratis
                    </button>

                    <p style="font-size: 12px; color: #9CA3AF; text-align: center; margin: 8px 0 0 0;">
                        Dengan mendaftar, Anda menyetujui Ketentuan Layanan & Kebijakan Privasi TopCare AI.
                    </p>
                </form>

                <div style="text-align: center; margin-top: 20px; font-size: 13px; color: #94A3B8;">
                    Sudah memiliki akun? 
                    <a href="#/login" style="color: #3B82F6; text-decoration: none; font-weight: 600;">Masuk di sini</a>
                </div>
            </div>
        `;
    }

    bindEvents() {
        const form = this.container.querySelector('#register-form');
        if (!form) return;

        form.addEventListener('submit', async (e) => {
            e.preventDefault();
            const fullName = this.container.querySelector('#reg-fullname').value.trim();
            const email = this.container.querySelector('#reg-email').value.trim();
            const password = this.container.querySelector('#reg-password').value;
            const errorEl = this.container.querySelector('#register-error');

            errorEl.style.display = 'none';

            // Email Syntax Check
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                errorEl.textContent = 'Format email tidak valid.';
                errorEl.style.display = 'block';
                return;
            }

            // Simplified Password Check (Min 8 Chars)
            if (password.length < 8) {
                errorEl.textContent = 'Kata sandi minimal terdiri dari 8 karakter.';
                errorEl.style.display = 'block';
                return;
            }

            try {
                let result = null;
                if (AuthService && typeof AuthService.register === 'function') {
                    result = await AuthService.register({ name: fullName, email, password });
                } else {
                    localStorage.setItem('topcare_user', JSON.stringify({
                        name: fullName,
                        email: email,
                        isMember: true,
                        joinedAt: new Date().toISOString()
                    }));
                    result = { success: true };
                }

                if (result && (result.success || result.status === 201)) {
                    const pendingIntent = NavigationIntentService.restoreIntent();
                    const targetRoute = pendingIntent && pendingIntent.route ? pendingIntent.route : '/coach-selection';

                    Core.Logger.info(`[RegisterPage] Registration successful. Redirecting to: ${targetRoute}`);
                    Router.navigate(targetRoute);
                } else {
                    errorEl.textContent = result?.message || 'Gagal mendaftar. Silakan periksa kembali data Anda.';
                    errorEl.style.display = 'block';
                }
            } catch (err) {
                Core.Logger.error(`[RegisterPage] Exception during registration: ${err.message}`);
                errorEl.textContent = 'Terjadi kesalahan sistem saat mendaftar.';
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

export default RegisterPage;