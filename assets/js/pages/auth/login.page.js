/**
 * file: assets/js/pages/auth/login.page.js
 * Version: 132.3.0
 * Status: APPROVED & LOCKED
 * SRP: Login Page LifeCycle Conductor (BEM Compliant & Core Integrated)
 */

import { Core } from '../../core/index.js';

export class LoginPage {
    constructor(hostElement) {
        this.host = hostElement;
        Object.seal(this);
    }

    async beforeEnter() {
        if (typeof Core !== 'undefined' && Core.Logger) {
            Core.Logger.info("[LoginPage] Lifecycle: Executing beforeEnter...");
        }
    }

    async init(hostElement) {
        this.host = hostElement || this.host;
        if (typeof Core !== 'undefined' && Core.Logger) {
            Core.Logger.info("[LoginPage] Lifecycle: Initializing...");
        }
    }

    async mount(hostElement) {
        this.host = hostElement || this.host;
        if (!this.host) return;

        if (typeof Core !== 'undefined' && Core.Logger) {
            Core.Logger.info("[LoginPage] Lifecycle: Mounting DOM...");
        }

        this.render();
        this.bindEvents();
    }

    async afterEnter() {
        if (typeof Core !== 'undefined' && Core.Logger) {
            Core.Logger.info("[LoginPage] Lifecycle: Executing afterEnter...");
        }
        await this.mount(this.host);
    }

    render() {
        this.host.innerHTML = `
            <section class="tc-auth">
                <div class="tc-auth__container">
                    <div class="tc-auth__header">
                        <h2 class="tc-auth__title">Selamat Datang Kembali</h2>
                        <p class="tc-auth__subtitle">Masuk ke akun TopCare AI Anda untuk melanjutkan sesi Coach AI.</p>
                    </div>

                    <form id="login-form" class="tc-auth__form">
                        <div class="tc-auth__field">
                            <label class="tc-auth__label" for="login-email">Alamat Email</label>
                            <input class="tc-auth__input" type="email" id="login-email" required placeholder="nama@email.com">
                        </div>

                        <div class="tc-auth__field">
                            <label class="tc-auth__label" for="login-password">Kata Sandi</label>
                            <input class="tc-auth__input" type="password" id="login-password" required placeholder="Masukkan kata sandi">
                        </div>

                        <button type="submit" class="tc-auth__button tc-auth__button--primary">
                            Masuk Ke Akun
                        </button>

                        <p class="tc-auth__register-terms">
                            Belum punya akun? <a href="#/register" style="color: #38bdf8; text-decoration: none;">Daftar Gratis di sini</a>
                        </p>
                    </form>
                </div>
            </section>
        `;
    }

    bindEvents() {
        const form = document.getElementById('login-form');
        if (form) {
            form.addEventListener('submit', (e) => {
                e.preventDefault();
                const email = document.getElementById('login-email').value;
                const password = document.getElementById('login-password').value;

                this.handleLogin({ username: email, password: password });
            });
        }
    }

    async handleLogin({ username, password }) {
        try {
            if (typeof Core !== 'undefined' && Core.Logger) {
                Core.Logger.info(`[LoginPage] Login attempt for: ${username}`);
            }

            // 1. Simpan sesi autentikasi lokal
            localStorage.setItem('topcare_user', JSON.stringify({
                email: username,
                isLoggedIn: true,
                loginAt: new Date().toISOString()
            }));

            // 2. Event Dispatching yang aman (Cek apakah emit/publish/dispatch tersedia)
            if (typeof Core !== 'undefined' && Core.Event) {
                if (typeof Core.Event.emit === 'function') {
                    Core.Event.emit('ui.notification.show', { type: 'success', message: `Selamat datang kembali, ${username}!` });
                } else if (typeof Core.Event.publish === 'function') {
                    Core.Event.publish('ui.notification.show', { type: 'success', message: `Selamat datang kembali, ${username}!` });
                } else if (typeof Core.Event.dispatch === 'function') {
                    Core.Event.dispatch('ui.notification.show', { type: 'success', message: `Selamat datang kembali, ${username}!` });
                }
            }

            // 3. Fallback Notifikasi Instan
            alert(`Berhasil masuk! Selamat datang kembali, ${username}.`);

            // 4. Pindah ke Beranda
            this.navigateTo('#/home');
        } catch (err) {
            if (typeof Core !== 'undefined' && Core.Logger) {
                Core.Logger.error(`[LoginPage] Login failed: ${err.message}`);
            }
        }
    }

    navigateTo(hash) {
        window.location.hash = hash;
    }

    async destroy() {
        if (typeof Core !== 'undefined' && Core.Logger) {
            Core.Logger.info("[LoginPage] Lifecycle: Destroying...");
        }
        this.cleanup();
    }

    cleanup() {
        if (this.host) {
            this.host.innerHTML = '';
        }
    }
}

export default LoginPage;