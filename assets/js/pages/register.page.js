/**
 * TOPCARE AI PLATFORM V3 — CANONICAL REGISTER PAGE
 * Path: assets/js/pages/register.page.js
 * Status: PHASE 2.7.0 DIRECT REPOSITORY INTEGRATION (ZERO LEGACY AUTH MODULES)
 */

import { UserRepository } from '../core/repositories/user.repository.js';
import { SanitizerUtil } from '../core/utils/sanitizer.util.js';
import { DOMListenerUtil } from '../core/utils/dom-listener.util.js';
import { FooterRenderer } from '../renderers/footer.renderer.js';

export class RegisterPage {
    constructor(container) {
        this.container = container || document.getElementById('app') || document.body;
        this.domListeners = new DOMListenerUtil();
    }

    async mount(target) {
        this.domListeners.cleanup();
        const container = target || this.container;
        const footerHtml = await FooterRenderer.render();

        container.innerHTML = `
            <div style="min-height: 100vh; background: #030712; color: #fff; display: flex; flex-direction: column; justify-content: space-between;">
                <main style="max-width: 440px; width: 100%; margin: 4rem auto; padding: 2rem; background: rgba(15, 23, 42, 0.8); border: 1px solid rgba(255, 255, 255, 0.1); border-radius: 16px; box-sizing: border-box;">
                    <div style="text-align: center; margin-bottom: 2rem;">
                        <span style="font-size: 2rem;">✨</span>
                        <h1 style="font-size: 1.75rem; font-weight: 800; margin: 0.5rem 0 0.25rem 0; color: #fff;">Buat Akun Baru</h1>
                        <p style="color: #94a3b8; font-size: 0.9rem; margin: 0;">Mulai eksplorasi AI dan tes kepribadian Anda</p>
                    </div>

                    <div id="register-error-msg" style="display: none; padding: 0.75rem; background: rgba(239, 68, 68, 0.15); border: 1px solid rgba(239, 68, 68, 0.3); border-radius: 8px; color: #f87171; font-size: 0.85rem; margin-bottom: 1.25rem;"></div>
                    <div id="register-success-msg" style="display: none; padding: 0.75rem; background: rgba(52, 211, 153, 0.15); border: 1px solid rgba(52, 211, 153, 0.3); border-radius: 8px; color: #34d399; font-size: 0.85rem; margin-bottom: 1.25rem;"></div>

                    <form id="form-register" style="display: flex; flex-direction: column; gap: 1rem;">
                        <div>
                            <label for="reg-name" style="display: block; font-size: 0.85rem; font-weight: 600; color: #cbd5e1; margin-bottom: 0.4rem;">Nama Lengkap</label>
                            <input type="text" id="reg-name" required placeholder="Masukkan nama Anda" style="width: 100%; padding: 0.75rem 1rem; background: rgba(0, 0, 0, 0.3); border: 1px solid rgba(255, 255, 255, 0.15); border-radius: 8px; color: #fff; font-size: 0.95rem; box-sizing: border-box; outline: none;" />
                        </div>

                        <div>
                            <label for="reg-email" style="display: block; font-size: 0.85rem; font-weight: 600; color: #cbd5e1; margin-bottom: 0.4rem;">Email</label>
                            <input type="email" id="reg-email" required placeholder="nama@email.com" style="width: 100%; padding: 0.75rem 1rem; background: rgba(0, 0, 0, 0.3); border: 1px solid rgba(255, 255, 255, 0.15); border-radius: 8px; color: #fff; font-size: 0.95rem; box-sizing: border-box; outline: none;" />
                        </div>

                        <div>
                            <label for="reg-password" style="display: block; font-size: 0.85rem; font-weight: 600; color: #cbd5e1; margin-bottom: 0.4rem;">Kata Sandi</label>
                            <input type="password" id="reg-password" required minlength="6" placeholder="Minimal 6 karakter" style="width: 100%; padding: 0.75rem 1rem; background: rgba(0, 0, 0, 0.3); border: 1px solid rgba(255, 255, 255, 0.15); border-radius: 8px; color: #fff; font-size: 0.95rem; box-sizing: border-box; outline: none;" />
                        </div>

                        <button type="submit" id="btn-submit-register" style="width: 100%; padding: 0.85rem; background: #2563eb; color: #fff; border: none; border-radius: 8px; font-weight: 700; font-size: 1rem; cursor: pointer; margin-top: 0.5rem; transition: background 0.2s ease;">
                            Daftar Sekarang
                        </button>
                    </form>

                    <div style="text-align: center; margin-top: 1.5rem; font-size: 0.85rem; color: #94a3b8;">
                        Sudah punya akun? <a href="#/login" style="color: #38bdf8; text-decoration: none; font-weight: 600;">Masuk di sini</a>
                    </div>
                </main>
                ${footerHtml}
            </div>
        `;

        this.bindEvents();
    }

    bindEvents() {
        const form = document.getElementById('form-register');
        const errBox = document.getElementById('register-error-msg');
        const succBox = document.getElementById('register-success-msg');
        const submitBtn = document.getElementById('btn-submit-register');

        if (!form) return;

        this.domListeners.add(form, 'submit', async (e) => {
            e.preventDefault();
            errBox.style.display = 'none';
            succBox.style.display = 'none';

            const fullName = document.getElementById('reg-name').value.trim();
            const email = document.getElementById('reg-email').value.trim();
            const password = document.getElementById('reg-password').value;

            if (!fullName || !email || !password) {
                errBox.textContent = 'Semua field wajib diisi.';
                errBox.style.display = 'block';
                return;
            }

            submitBtn.disabled = true;
            submitBtn.textContent = 'Memproses Pendaftaran...';

            try {
                const { user, error } = await UserRepository.signUp(email, password, { full_name: fullName });

                if (error) {
                    throw error;
                }

                succBox.textContent = 'Pendaftaran berhasil! Mengarahkan ke halaman masuk...';
                succBox.style.display = 'block';

                setTimeout(() => {
                    window.location.hash = '#/login';
                }, 1500);

            } catch (err) {
                errBox.textContent = SanitizerUtil.escapeHTML(err.message || 'Gagal mendaftarkan akun.');
                errBox.style.display = 'block';
                submitBtn.disabled = false;
                submitBtn.textContent = 'Daftar Sekarang';
            }
        });
    }

    destroy() {
        this.domListeners.cleanup();
        if (this.container) {
            this.container.innerHTML = '';
        }
    }
}

export default RegisterPage;