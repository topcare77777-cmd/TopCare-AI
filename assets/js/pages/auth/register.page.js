/**
 * file: assets/js/pages/auth/register.page.js
 * Version: 132.1.0
 * Status: APPROVED & LOCKED
 * SRP: Register Page LifeCycle Conductor calling AuthService.register().
 */

import { Core } from '../../core/index.js';
import { AuthService } from '../../auth/auth.service.js';
import { RegisterForm } from '../../components/auth/register.form.js';

export class RegisterPage {
    constructor(hostElement) {
        this.host = hostElement;
        this.registerForm = new RegisterForm({
            onSubmit: (data) => this.handleRegister(data)
        });
        Object.seal(this);
    }

    async init() {
        Core.Logger.info("[RegisterPage] Lifecycle: Initializing...");
    }

    mount() {
        Core.Logger.info("[RegisterPage] Lifecycle: Mounting...");
        this.render();
        this.bindEvents();
    }

    render() {
        this.host.innerHTML = `
            <div class="tc-page-register-container">
                ${this.registerForm.render()}
            </div>
        `;
    }

    bindEvents() {
        this.registerForm.bindEvents(this.host);
    }

    async handleRegister(formData) {
        try {
            Core.Logger.info(`[RegisterPage] Executing register for: ${formData.username}`);
            await AuthService.register(formData);
            Core.Event.emit('ui.notification.show', { type: 'success', message: 'Account created! Please sign in.' });
            window.location.hash = '#login';
        } catch (err) {
            Core.Logger.error(`[RegisterPage] Registration failed: ${err.message}`);
            Core.Event.emit('ui.notification.show', { type: 'error', message: `Registration Failed: ${err.message}` });
        }
    }

    destroy() {
        this.cleanup();
    }

    cleanup() {
        this.host.innerHTML = '';
    }
}