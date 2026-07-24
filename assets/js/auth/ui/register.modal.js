/**
 * TopCare AI Platform V2.0.0
 * Hardened RegisterModal UI with Password Strength Meter, Confirm Password Realtime Validation & ARIA support
 * Path: assets/js/auth/ui/register.modal.js
 */

class RegisterModal {
    constructor(authService, onRegisterSuccess) {
        this.authService = authService;
        this.onRegisterSuccess = onRegisterSuccess;
        this.element = null;
        this._buildElement();
        this._bindKeyboardEvents();
    }

    _buildElement() {
        this.element = document.createElement('div');
        this.element.className = 'topcare-modal-overlay';
        this.element.setAttribute('role', 'dialog');
        this.element.setAttribute('aria-modal', 'true');
        this.element.innerHTML = `
            <div class="topcare-modal-card">
                <h3>Mulai Gratis TopCare AI</h3>
                <form id="topcare-register-form">
                    <div class="form-group">
                        <label>Nama Lengkap</label>
                        <input type="text" id="reg-fullname" required placeholder="Nama Anda" />
                    </div>
                    <div class="form-group">
                        <label>Email Perusahaan / Pribadi</label>
                        <input type="email" id="reg-email" required placeholder="nama@domain.com" />
                    </div>
                    <div class="form-group">
                        <label>Password (Min. 8 Karakter)</label>
                        <input type="password" id="reg-password" required placeholder="••••••••" />
                        <div id="password-strength-indicator" class="strength-bar">Kekuatan: <span>Lemah</span></div>
                    </div>
                    <div class="form-group">
                        <label>Konfirmasi Password</label>
                        <input type="password" id="reg-confirm" required placeholder="••••••••" />
                        <div id="password-match-indicator" class="match-error"></div>
                    </div>
                    <div class="form-row-checkbox">
                        <label><input type="checkbox" id="reg-agreement" required /> Saya menyetujui Ketentuan Layanan</label>
                    </div>
                    <div id="reg-error-msg" class="form-error-text"></div>
                    <div class="modal-actions">
                        <button type="button" class="btn-secondary" id="reg-cancel-btn">Batal</button>
                        <button type="submit" class="btn-primary" id="reg-submit-btn">Daftar Akun</button>
                    </div>
                </form>
            </div>
        `;

        const passwordInput = this.element.querySelector('#reg-password');
        const confirmInput = this.element.querySelector('#reg-confirm');
        const strengthIndicator = this.element.querySelector('#password-strength-indicator span');
        const matchIndicator = this.element.querySelector('#password-match-indicator');

        passwordInput.addEventListener('input', () => {
            const val = passwordInput.value;
            if (val.length < 8) {
                strengthIndicator.textContent = 'Lemah (Min 8 Karakter)';
                strengthIndicator.style.color = '#e74c3c';
            } else if (/[A-Z]/.test(val) && /[0-9]/.test(val) && /[^A-Za-z0-9]/.test(val)) {
                strengthIndicator.textContent = 'Kuat';
                strengthIndicator.style.color = '#2ecc71';
            } else {
                strengthIndicator.textContent = 'Sedang';
                strengthIndicator.style.color = '#f1c40f';
            }
        });

        confirmInput.addEventListener('input', () => {
            if (confirmInput.value !== passwordInput.value) {
                matchIndicator.textContent = 'Password tidak cocok';
            } else {
                matchIndicator.textContent = 'Password cocok ✓';
            }
        });

        this.element.querySelector('#topcare-register-form').addEventListener('submit', async (e) => {
            e.preventDefault();
            await this._handleRegisterSubmit();
        });

        this.element.querySelector('#reg-cancel-btn').addEventListener('click', () => this.close());
    }

    _bindKeyboardEvents() {
        this._escapeListener = (e) => {
            if (e.key === 'Escape') this.close();
        };
        document.addEventListener('keydown', this._escapeListener);
    }

    async _handleRegisterSubmit() {
        const fullName = this.element.querySelector('#reg-fullname').value.trim();
        const email = this.element.querySelector('#reg-email').value.trim();
        const password = this.element.querySelector('#reg-password').value;
        const confirm = this.element.querySelector('#reg-confirm').value;
        const errorBox = this.element.querySelector('#reg-error-msg');
        const submitBtn = this.element.querySelector('#reg-submit-btn');

        errorBox.textContent = '';
        if (password !== confirm) {
            errorBox.textContent = 'Konfirmasi password tidak cocok.';
            return;
        }

        submitBtn.disabled = true;
        submitBtn.textContent = 'Mendaftarkan...';

        try {
            const userDto = await this.authService.register(fullName, email, password);
            this.close();
            if (typeof this.onRegisterSuccess === 'function') {
                this.onRegisterSuccess(userDto);
            }
        } catch (err) {
            errorBox.textContent = err.message || 'Gagal melakukan pendaftaran.';
        } finally {
            submitBtn.disabled = false;
            submitBtn.textContent = 'Daftar Akun';
        }
    }

    open(container = document.body) { container.appendChild(this.element); }
    close() {
        document.removeEventListener('keydown', this._escapeListener);
        if (this.element && this.element.parentNode) this.element.parentNode.removeChild(this.element);
    }
}