/**
 * TOPCARE AI PLATFORM V3 — REGISTER PAGE
 * Path: assets/js/pages/auth/register.page.js
 */

import { supabase } from '../../config/supabase.config.js';

export class RegisterPage {
    constructor(container) {
        this.container = container || document.getElementById('app') || document.body;
    }

    async mount(target) {
        const container = target || this.container;

        container.innerHTML = `
            <section class="auth-section" style="min-height: 80vh; display: flex; align-items: center; justify-content: center; padding: 2rem 1rem;">
                <div class="auth-card" style="width: 100%; max-width: 420px; background: rgba(15, 23, 42, 0.95); border: 1px solid rgba(255, 255, 255, 0.1); border-radius: 16px; padding: 2.5rem; box-shadow: 0 10px 30px rgba(0,0,0,0.5); color: #fff;">
                    <div style="text-align: center; margin-bottom: 2rem;">
                        <h2 style="font-size: 1.8rem; font-weight: 700; margin-bottom: 0.5rem; background: linear-gradient(135deg, #38bdf8, #818cf8); -webkit-background-clip: text; -webkit-text-fill-color: transparent;">Daftar Akun Baru</h2>
                        <p style="color: #94a3b8; font-size: 0.9rem;">Mulai perjalanan AI & Pengembangan Diri</p>
                    </div>

                    <div id="register-alert" style="display: none; padding: 0.75rem 1rem; border-radius: 8px; margin-bottom: 1.25rem; font-size: 0.85rem;"></div>

                    <form id="form-register" style="display: flex; flex-direction: column; gap: 1.25rem;">
                        <div>
                            <label style="display: block; font-size: 0.85rem; color: #cbd5e1; margin-bottom: 0.5rem;">Nama Lengkap</label>
                            <input type="text" id="reg-name" required placeholder="Nama Anda" style="width: 100%; padding: 0.75rem 1rem; background: rgba(30, 41, 59, 0.8); border: 1px solid rgba(255, 255, 255, 0.15); border-radius: 8px; color: #fff; outline: none;" />
                        </div>

                        <div>
                            <label style="display: block; font-size: 0.85rem; color: #cbd5e1; margin-bottom: 0.5rem;">Email</label>
                            <input type="email" id="reg-email" required placeholder="nama@email.com" style="width: 100%; padding: 0.75rem 1rem; background: rgba(30, 41, 59, 0.8); border: 1px solid rgba(255, 255, 255, 0.15); border-radius: 8px; color: #fff; outline: none;" />
                        </div>

                        <div>
                            <label style="display: block; font-size: 0.85rem; color: #cbd5e1; margin-bottom: 0.5rem;">Kata Sandi</label>
                            <input type="password" id="reg-password" required minlength="6" placeholder="Minimal 6 karakter" style="width: 100%; padding: 0.75rem 1rem; background: rgba(30, 41, 59, 0.8); border: 1px solid rgba(255, 255, 255, 0.15); border-radius: 8px; color: #fff; outline: none;" />
                        </div>

                        <button type="submit" id="btn-submit-register" style="width: 100%; padding: 0.85rem; background: #2563eb; color: #fff; font-weight: 600; border: none; border-radius: 8px; cursor: pointer; transition: 0.2s; margin-top: 0.5rem;">
                            Daftar Sekarang
                        </button>
                    </form>

                    <div style="text-align: center; margin-top: 1.5rem; font-size: 0.85rem; color: #94a3b8;">
                        Sudah punya akun? <a href="#/login" style="color: #38bdf8; text-decoration: none; font-weight: 500;">Masuk di sini</a>
                    </div>
                </div>
            </section>
        `;

        this.#bindEvents();
    }

    #bindEvents() {
        const form = document.getElementById('form-register');
        const alertBox = document.getElementById('register-alert');
        const btnSubmit = document.getElementById('btn-submit-register');

        if (!form) return;

        form.addEventListener('submit', async (e) => {
            e.preventDefault();
            const fullName = document.getElementById('reg-name').value.trim();
            const email = document.getElementById('reg-email').value.trim();
            const password = document.getElementById('reg-password').value;

            btnSubmit.disabled = true;
            btnSubmit.innerText = 'Mendaftarkan...';
            alertBox.style.display = 'none';

            try {
                const { error } = await supabase.auth.signUp({
                    email,
                    password,
                    options: { data: { full_name: fullName } }
                });

                if (error) throw error;

                alertBox.style.display = 'block';
                alertBox.style.background = 'rgba(34, 197, 94, 0.15)';
                alertBox.style.border = '1px solid #22c55e';
                alertBox.style.color = '#4ade80';
                alertBox.innerText = 'Pendaftaran berhasil! Mengalihkan ke login...';

                setTimeout(() => {
                    window.location.hash = '#/login';
                }, 1200);
            } catch (err) {
                btnSubmit.disabled = false;
                btnSubmit.innerText = 'Daftar Sekarang';
                alertBox.style.display = 'block';
                alertBox.style.background = 'rgba(239, 68, 68, 0.15)';
                alertBox.style.border = '1px solid #ef4444';
                alertBox.style.color = '#f87171';
                alertBox.innerText = err.message || 'Gagal mendaftar akun.';
            }
        });
    }

    destroy() { }
}

export default RegisterPage;