/**
 * TopCare AI Platform V2.0.0
 * Hardened LoginModal UI with correct focus trap selector (input, button, select, textarea, a[href])
 * Path: assets/js/auth/ui/login.modal.js
 */

class LoginModal {
    constructor(authService, onLoginSuccess) {
        this.authService = authService;
        this.onLoginSuccess = onLoginSuccess;
        this.element = null;
        this._buildElement();
        this._bindAccessibility();
    }

    _buildElement() {
        this.element = document.createElement('div');
        this.element.className = 'topcare-modal-overlay';
        this.element.setAttribute('role', 'dialog');
        this.element.setAttribute('aria-modal', 'true');
        this.element.innerHTML = `
            <div class="topcare-modal-card" tabindex="-1">
                <h3>Masuk ke TopCare AI</h3>
                <form id="topcare-login-form">
                    <div class="form-group">
                        <label>Email Enterprise</label>
                        <input type="email" id="login-email" required placeholder="nama@perusahaan.com" />
                    </div>
                    <div class="form-group">
                        <label>Password</label>
                        <input type="password" id="login-password" required placeholder="••••••••" />
                    </div>
                    <div class="form-row-checkbox">
                        <label><input type="checkbox" id="login-remember" /> Ingat Saya</label>
                    </div>
                    <div id="login-error-msg" class="form-error-text" role="alert"></div>
                    <div class="modal-actions">
                        <button type="button" class="btn-secondary" id="login-cancel-btn">Batal</button>
                        <button type="submit" class="btn-primary" id="login-submit-btn">Masuk</button>
                    </div>
                </form>
            </div>
        `;

        this.element.querySelector('#topcare-login-form').addEventListener('submit', async (e) => {
            e.preventDefault();
            await this._handleLoginSubmit();
        });

        this.element.querySelector('#login-cancel-btn').addEventListener('click', () => this.close());
    }

    _bindAccessibility() {
        this._keyListener = (e) => {
            if (e.key === 'Escape') {
                this.close();
                return;
            }
            if (e.key === 'Tab') {
                const focusables = this.element.querySelectorAll('input, button, select, textarea, a[href]');
                if (focusables.length === 0) return;
                const first = focusables[0];
                const last = focusables[focusables.length - 1];
                if (e.shiftKey && document.activeElement === first) {
                    last.focus();
                    e.preventDefault();
                } else if (!e.shiftKey && document.activeElement === last) {
                    first.focus();
                    e.preventDefault();
                }
            }
        };
        document.addEventListener('keydown', this._keyListener);
    }

    async _handleLoginSubmit() {
        const emailInput = this.element.querySelector('#login-email').value.trim();
        const passwordInput = this.element.querySelector('#login-password').value;
        const remember = this.element.querySelector('#login-remember').checked;
        const errorBox = this.element.querySelector('#login-error-msg');
        const submitBtn = this.element.querySelector('#login-submit-btn');

        errorBox.textContent = '';
        if (!emailInput || !passwordInput) {
            errorBox.textContent = 'Email dan password wajib diisi.';
            return;
        }

        submitBtn.disabled = true;
        submitBtn.textContent = 'Memproses...';

        try {
            const result = await this.authService.login(emailInput, passwordInput, remember);
            this.close();
            if (typeof this.onLoginSuccess === 'function') {
                this.onLoginSuccess(result);
            }
        } catch (err) {
            errorBox.textContent = err.message || 'Gagal melakukan otentikasi.';
        } finally {
            submitBtn.disabled = false;
            submitBtn.textContent = 'Masuk';
        }
    }

    open(container = document.body) {
        container.appendChild(this.element);
        this.element.querySelector('#login-email').focus();
    }

    close() {
        document.removeEventListener('keydown', this._keyListener);
        if (this.element && this.element.parentNode) this.element.parentNode.removeChild(this.element);
    }
}