/**
 * file: assets/js/components/auth/register.form.js
 * Version: 140.0.0
 * Status: APPROVED & VERIFIED
 * SRP: Renders Register UI form matching 100% with auth.components.css contract.
 */

import { PasswordField } from './password.field.js';
import { ROLES } from '../../auth/auth.role.js';

export class RegisterForm {
    constructor(options = {}) {
        this.onSubmit = options.onSubmit || (() => { });
        this.passField = new PasswordField({ id: 'reg-password', label: 'Password' });
        Object.seal(this);
    }

    render() {
        return `
            <form id="tc-register-form-element" class="tc-auth-form-card tc-register-card-wide">
                <div class="tc-auth-header-wrap">
                    <h2 class="tc-auth-title">User Registration</h2>
                    <p class="tc-auth-subtitle">Create TopCare AI Clinical Account</p>
                </div>

                <div class="tc-form-group">
                    <label for="reg-fullname" class="tc-form-label">Full Name</label>
                    <input type="text" id="reg-fullname" class="tc-form-input" required placeholder="Dr. John Doe, MD" />
                </div>

                <div class="tc-form-group">
                    <label for="reg-username" class="tc-form-label">Username</label>
                    <input type="text" id="reg-username" class="tc-form-input" required placeholder="johndoe" />
                </div>

                <div class="tc-form-group">
                    <label for="reg-email" class="tc-form-label">Email Address</label>
                    <input type="email" id="reg-email" class="tc-form-input" required placeholder="john@topcare.ai" />
                </div>

                <div class="tc-form-group">
                    <label for="reg-role" class="tc-form-label">Primary Role</label>
                    <select id="reg-role" class="tc-form-input tc-form-select">
                        <option value="${ROLES.PHYSICIAN}">Physician / Dokter</option>
                        <option value="${ROLES.NURSE}">Nurse / Perawat</option>
                        <option value="${ROLES.PHARMACIST}">Pharmacist / Apoteker</option>
                        <option value="${ROLES.PATIENT}">Patient / Pasien</option>
                    </select>
                </div>

                ${this.passField.render()}

                <button type="submit" class="tc-btn-primary tc-btn-success">
                    Register Account
                </button>

                <div class="tc-auth-footer-text">
                    Already have an account? <a href="#/login" id="tc-goto-login" class="tc-auth-link-bold">Sign In</a>
                </div>
            </form>
        `;
    }

    bindEvents(containerElement) {
        PasswordField.bindToggle(containerElement);

        const form = containerElement.querySelector('#tc-register-form-element');
        if (form) {
            form.addEventListener('submit', (e) => {
                e.preventDefault();
                this.onSubmit({
                    fullName: containerElement.querySelector('#reg-fullname').value,
                    username: containerElement.querySelector('#reg-username').value,
                    email: containerElement.querySelector('#reg-email').value,
                    role: containerElement.querySelector('#reg-role').value,
                    password: containerElement.querySelector('#reg-password').value
                });
            });
        }
    }
}