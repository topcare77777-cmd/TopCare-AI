/**
 * file: assets/js/pages/auth/login.page.js
 * Version: 132.1.0
 * Status: APPROVED & LOCKED
 * SRP: Login Page LifeCycle Conductor. Emits Core.Event for UI feedback instead of alert().
 */

import { Core } from '../../core/index.js';
import { AuthService } from '../../auth/auth.service.js';
import { LoginForm } from '../../components/auth/login.form.js';

export class LoginPage {
    constructor(hostElement) {
        this.host = hostElement;
        this.loginForm = new LoginForm({
            onSubmit: (credentials) => this.handleLogin(credentials)
        });
        Object.seal(this);
    }

    async init() {
        Core.Logger.info("[LoginPage] Lifecycle: Initializing...");
        if (AuthService.getCurrentUser()) {
            this.navigateTo('#profile');
        }
    }

    mount() {
        Core.Logger.info("[LoginPage] Lifecycle: Mounting DOM...");
        this.render();
        this.bindEvents();
    }

    render() {
        this.host.innerHTML = `
            <div class="tc-page-login-container">
                ${this.loginForm.render()}
            </div>
        `;
    }

    bindEvents() {
        this.loginForm.bindEvents(this.host);
    }

    async handleLogin({ username, password }) {
        try {
            await AuthService.login(username, password);
            Core.Logger.info(`[LoginPage] Login success for: ${username}`);
            Core.Event.emit('ui.notification.show', { type: 'success', message: `Welcome back, ${username}!` });
            this.navigateTo('#profile');
        } catch (err) {
            Core.Logger.error(`[LoginPage] Login failed: ${err.message}`);
            Core.Event.emit('ui.notification.show', { type: 'error', message: `Authentication Failed: ${err.message}` });
        }
    }

    navigateTo(hash) {
        window.location.hash = hash;
    }

    destroy() {
        Core.Logger.info("[LoginPage] Lifecycle: Destroying...");
        this.cleanup();
    }

    cleanup() {
        this.host.innerHTML = '';
    }
}