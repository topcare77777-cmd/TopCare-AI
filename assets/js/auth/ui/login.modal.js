/**
 * -----------------------------------------------------------------
 * TOPCARE AI PLATFORM - ARCHITECTURE METADATA
 * -----------------------------------------------------------------
 * Layer        : Auth UI Layer
 * Status       : ACTIVE
 * Version      : 2.0.0
 * Architecture : Development Constitution v1.1
 * Description  : Hardened Login Modal UI Adapter
 * -----------------------------------------------------------------
 */

import { AuthValidator } from "../validators/auth.validator.js";
import { authService } from "../../services/auth.service.js";

export class LoginModal {
    constructor() {
        this.container = null;
        this.element = null;
        this.previousFocus = null;
        this._buildElement();
    }

    mount(container = document.body) {
        this.container = container;
        if (this.element && !this.element.parentNode) {
            this.container.appendChild(this.element);
        }
    }

    open(container = document.body) {
        this.previousFocus = document.activeElement;
        this.mount(container);
        document.addEventListener("keydown", this._keyboardHandler);
        const emailInput = this.element.querySelector("#login-email");
        if (emailInput) {
            emailInput.focus();
        }
    }

    close() {
        document.removeEventListener("keydown", this._keyboardHandler);
        if (this.element && this.element.parentNode) {
            this.element.parentNode.removeChild(this.element);
        }
        if (this.previousFocus && typeof this.previousFocus.focus === "function") {
            this.previousFocus.focus();
        }
    }

    render(container = document.body) {
        this.open(container);
    }

    _buildElement() {
        this.element = document.createElement("div");
        this.element.className = "topcare-modal-overlay";
        this.element.setAttribute("role", "dialog");
        this.element.setAttribute("aria-modal", "true");

        this.element.innerHTML = `
            <div class="topcare-modal-card" tabindex="-1">
                <div class="modal-header">
                    <h3>Masuk ke TopCare AI</h3>
                </div>
                <form id="topcare-login-form">
                    <div class="form-group">
                        <label for="login-email">Email</label>
                        <input
                            id="login-email"
                            type="email"
                            autocomplete="email"
                            required
                            placeholder="nama@domain.com"
                        />
                    </div>
                    <div class="form-group">
                        <label for="login-password">Password</label>
                        <input
                            id="login-password"
                            type="password"
                            autocomplete="current-password"
                            required
                            placeholder="Password"
                        />
                    </div>
                    <div class="form-row-checkbox">
                        <label>
                            <input
                                id="login-remember"
                                type="checkbox"
                            />
                            Ingat Saya
                        </label>
                    </div>
                    <div
                        id="login-error-msg"
                        class="form-error-text"
                        role="alert"
                    ></div>
                    <div class="modal-actions">
                        <button
                            type="button"
                            class="btn-secondary"
                            id="login-cancel-btn"
                        >
                            Batal
                        </button>
                        <button
                            type="submit"
                            class="btn-primary"
                            id="login-submit-btn"
                        >
                            Masuk
                        </button>
                    </div>
                </form>
            </div>
        `;

        this._bindEvents();
    }

    _bindEvents() {
        const form = this.element.querySelector("#topcare-login-form");
        if (form) {
            form.addEventListener("submit", (event) => {
                event.preventDefault();
                this._handleSubmit(event);
            });
        }

        const cancelBtn = this.element.querySelector("#login-cancel-btn");
        if (cancelBtn) {
            cancelBtn.addEventListener("click", () => this.close());
        }

        this._keyboardHandler = (event) => {
            if (event.key === "Escape") {
                this.close();
            }
            if (event.key === "Tab") {
                this._trapFocus(event);
            }
        };
    }

    _trapFocus(event) {
        const focusables = this.element.querySelectorAll(
            "input, button, select, textarea, a[href]"
        );
        if (!focusables.length) {
            return;
        }

        const first = focusables[0];
        const last = focusables[focusables.length - 1];

        if (event.shiftKey && document.activeElement === first) {
            last.focus();
            event.preventDefault();
        } else if (!event.shiftKey && document.activeElement === last) {
            first.focus();
            event.preventDefault();
        }
    }

    async _handleSubmit(event) {
        const emailInput = this.element.querySelector("#login-email");
        const passwordInput = this.element.querySelector("#login-password");
        const rememberInput = this.element.querySelector("#login-remember");
        const errorBox = this.element.querySelector("#login-error-msg");
        const submitButton = this.element.querySelector("#login-submit-btn");

        const email = emailInput ? emailInput.value.trim() : "";
        const password = passwordInput ? passwordInput.value : "";
        const remember = rememberInput ? rememberInput.checked : false;

        if (errorBox) {
            errorBox.textContent = "";
        }

        try {
            AuthValidator.validateEmail(email);
            AuthValidator.validatePassword(password);

            if (submitButton) {
                submitButton.disabled = true;
                submitButton.textContent = "Memproses...";
            }

            const payload = {
                email,
                password,
                remember
            };

            await authService.login(payload);
            this.close();
        } catch (error) {
            console.error("[LoginModal]", error);
            if (errorBox) {
                errorBox.textContent = error.message || "Login gagal. Silakan periksa kembali data Anda.";
            }
        } finally {
            if (submitButton) {
                submitButton.disabled = false;
                submitButton.textContent = "Masuk";
            }
        }
    }

    destroy() {
        this.close();
        if (this.element && this.element.parentNode) {
            this.element.parentNode.removeChild(this.element);
        }
        this.element = null;
        this.container = null;
    }
}

export default LoginModal;