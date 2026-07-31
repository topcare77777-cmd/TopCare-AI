/**
 * file: assets/js/components/auth/login.form.js
 * Version: 140.0.0
 * Status: APPROVED & VERIFIED
 * SRP: Renders Login UI form matching 100% with auth.components.css contract.
 */

import { PasswordField } from './password.field.js';

export class LoginForm {
    constructor(options = {}) {
        this.onSubmit = options.onSubmit || (() => {});
        this.passwordField = new PasswordField({ id: 'login-password', label: 'Password' });
        Object.seal(this);
    }

    render() {
        return `
            <form id="tc-login-form-element" class="tc-auth-form-card">
                <div class="tc-auth-header-wrap">
                    <h2 class="tc-auth-title">Sign In</h2>
                    <p class="tc-auth-subtitle">TopCare AI Platform Authentication</p>
                </div>

                <div class="tc-form-group">
                    <label for="login-username" class="tc-form-label">Username or Email</label>
                    <input type="text" id="login-username" class="tc-form-input" required placeholder="doctor@topcare.ai" />
                </div>

                ${this.passwordField.render()}

                <div class="tc-form-actions-row">
                    <label class="tc-checkbox-label">
                        <input type="checkbox" id="login-remember" /> Remember Session
                    </label>
                    <a href="#forgot" id="tc-goto-forgot" class="tc-auth-link">Forgot Password?</a>
                </div>

                <button type="submit" id="tc-login-submit-btn" class="tc-btn-primary">
                    Authenticate
                </button>

                <div class="tc-auth-footer-text">
                    Don't have an account? <a href="#/register" id="tc-goto-register" class="tc-auth-link-bold">Register Here</a>
                </div>
            </form>
        `;
    }

    bindEvents(containerElement) {
        PasswordField.bindToggle(containerElement);

        const form = containerElement.querySelector('#tc-login-form-element');
        if (form) {
            form.addEventListener('submit', (e) => {
                e.preventDefault();
                const username = containerElement.querySelector('#login-username').value;
                const password = containerElement.querySelector('#login-password').value;
                const remember = containerElement.querySelector('#login-remember').checked;
                this.onSubmit({ username, password, remember });
            });
        }
    }
}