/**
 * @file auth.renderer.js
 * @description Enterprise pure presentation renderer for authentication forms, loading indicators, 
 * and feedback banners. Enforces strict HTML escaping for XSS mitigation and uses template literals.
 * @module Renderers/AuthRenderer
 * @version 3.0.0
 * @status Production Ready
 */

export class AuthRenderer {
    constructor() {}

    /**
     * Escapes special characters to prevent Cross-Site Scripting (XSS).
     * @private
     * @param {string} str - Input string to escape.
     * @returns {string} Sanitized string.
     */
    #escapeHtml(str) {
        if (str === null || str === undefined) {
            return '';
        }
        return String(str)
            .replace(/&/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;')
            .replace(/"/g, '&quot;')
            .replace(/'/g, '&#039;');
    }

    /**
     * Renders the login form HTML markup.
     * @param {Object} [state={}] - Form state object containing email, loading, rememberMe, error, success.
     * @returns {string} HTML markup string.
     */
    renderLogin(state = {}) {
        const email = this.#escapeHtml(state.email || '');
        const rememberMe = Boolean(state.rememberMe);
        const isLoading = Boolean(state.loading);
        const errorMsg = state.error ? this.renderError(state.error) : '';
        const successMsg = state.success ? this.renderSuccess(state.success) : '';

        return `
            <div class="auth-card login-card" data-testid="login-form-container">
                <div class="auth-header">
                    <h2>Welcome Back</h2>
                    <p>Access your TopCare AI workspace</p>
                </div>
                ${errorMsg}
                ${successMsg}
                <form id="loginForm" class="auth-form" novalidate>
                    <div class="form-group">
                        <label for="loginEmail">Email Address</label>
                        <input 
                            type="email" 
                            id="loginEmail" 
                            name="email" 
                            value="${email}" 
                            autocomplete="username" 
                            required 
                            placeholder="name@example.com"
                            ${isLoading ? 'disabled' : ''}
                        />
                    </div>
                    <div class="form-group">
                        <label for="loginPassword">Password</label>
                        <input 
                            type="password" 
                            id="loginPassword" 
                            name="password" 
                            autocomplete="current-password" 
                            required 
                            placeholder="Enter your password"
                            ${isLoading ? 'disabled' : ''}
                        />
                    </div>
                    <div class="form-row remember-row">
                        <label class="checkbox-label">
                            <input 
                                type="checkbox" 
                                name="rememberMe" 
                                ${rememberMe ? 'checked' : ''} 
                                ${isLoading ? 'disabled' : ''}
                            />
                            <span>Remember me</span>
                        </label>
                        <a href="#/forgot-password" class="auth-link">Forgot password?</a>
                    </div>
                    <button type="submit" class="btn-primary auth-submit" ${isLoading ? 'disabled' : ''}>
                        ${isLoading ? this.renderLoading('Signing in...') : 'Sign In'}
                    </button>
                </form>
                <div class="auth-footer">
                    <p>Don't have an account? <a href="#/register" class="auth-link">Create account</a></p>
                </div>
            </div>
        `;
    }

    /**
     * Renders the register form HTML markup.
     * @param {Object} [state={}] - Form state object containing name, email, error, success, loading.
     * @returns {string} HTML markup string.
     */
    renderRegister(state = {}) {
        const name = this.#escapeHtml(state.name || '');
        const email = this.#escapeHtml(state.email || '');
        const isLoading = Boolean(state.loading);
        const errorMsg = state.error ? this.renderError(state.error) : '';
        const successMsg = state.success ? this.renderSuccess(state.success) : '';

        return `
            <div class="auth-card register-card" data-testid="register-form-container">
                <div class="auth-header">
                    <h2>Create Account</h2>
                    <p>Join TopCare AI Platform V3</p>
                </div>
                ${errorMsg}
                ${successMsg}
                <form id="registerForm" class="auth-form" novalidate>
                    <div class="form-group">
                        <label for="registerName">Full Name</label>
                        <input 
                            type="text" 
                            id="registerName" 
                            name="name" 
                            value="${name}" 
                            autocomplete="name" 
                            required 
                            placeholder="John Doe"
                            ${isLoading ? 'disabled' : ''}
                        />
                    </div>
                    <div class="form-group">
                        <label for="registerEmail">Email Address</label>
                        <input 
                            type="email" 
                            id="registerEmail" 
                            name="email" 
                            value="${email}" 
                            autocomplete="username" 
                            required 
                            placeholder="name@example.com"
                            ${isLoading ? 'disabled' : ''}
                        />
                    </div>
                    <div class="form-group">
                        <label for="registerPassword">Password</label>
                        <input 
                            type="password" 
                            id="registerPassword" 
                            name="password" 
                            autocomplete="new-password" 
                            required 
                            placeholder="Min 12 chars, uppercase, number, symbol"
                            ${isLoading ? 'disabled' : ''}
                        />
                    </div>
                    <div class="form-group">
                        <label for="registerConfirmPassword">Confirm Password</label>
                        <input 
                            type="password" 
                            id="registerConfirmPassword" 
                            name="confirmPassword" 
                            autocomplete="new-password" 
                            required 
                            placeholder="Re-enter password"
                            ${isLoading ? 'disabled' : ''}
                        />
                    </div>
                    <button type="submit" class="btn-primary auth-submit" ${isLoading ? 'disabled' : ''}>
                        ${isLoading ? this.renderLoading('Creating account...') : 'Create Account'}
                    </button>
                </form>
                <div class="auth-footer">
                    <p>Already have an account? <a href="#/login" class="auth-link">Sign in</a></p>
                </div>
            </div>
        `;
    }

    /**
     * Renders the forgot password form HTML markup.
     * @param {Object} [state={}] - Form state object containing email, error, success, loading.
     * @returns {string} HTML markup string.
     */
    renderForgotPassword(state = {}) {
        const email = this.#escapeHtml(state.email || '');
        const isLoading = Boolean(state.loading);
        const errorMsg = state.error ? this.renderError(state.error) : '';
        const successMsg = state.success ? this.renderSuccess(state.success) : '';

        return `
            <div class="auth-card forgot-card" data-testid="forgot-form-container">
                <div class="auth-header">
                    <h2>Password Recovery</h2>
                    <p>Enter your email to receive recovery instructions</p>
                </div>
                ${errorMsg}
                ${successMsg}
                <form id="forgotForm" class="auth-form" novalidate>
                    <div class="form-group">
                        <label for="forgotEmail">Email Address</label>
                        <input 
                            type="email" 
                            id="forgotEmail" 
                            name="email" 
                            value="${email}" 
                            autocomplete="username" 
                            required 
                            placeholder="name@example.com"
                            ${isLoading ? 'disabled' : ''}
                        />
                    </div>
                    <button type="submit" class="btn-primary auth-submit" ${isLoading ? 'disabled' : ''}>
                        ${isLoading ? this.renderLoading('Sending instructions...') : 'Send Recovery Link'}
                    </button>
                </form>
                <div class="auth-footer">
                    <p>Remembered your password? <a href="#/login" class="auth-link">Sign in</a></p>
                </div>
            </div>
        `;
    }

    /**
     * Renders a loading spinner or text component.
     * @param {string} [message='Loading...'] - Loading message.
     * @returns {string} HTML markup string.
     */
    renderLoading(message = 'Loading...') {
        const safeMsg = this.#escapeHtml(message);
        return `
            <span class="loading-wrapper" data-testid="loading-indicator">
                <span class="spinner" aria-hidden="true"></span>
                <span class="loading-text">${safeMsg}</span>
            </span>
        `;
    }

    /**
     * Renders an error banner container.
     * @param {string|Object|Array} message - Error description text or object.
     * @returns {string} HTML markup string.
     */
    renderError(message) {
        let displayMessage = 'An unexpected error occurred.';
        if (typeof message === 'string') {
            displayMessage = message;
        } else if (message && typeof message === 'object') {
            const values = Object.values(message).flat();
            if (values.length > 0) {
                displayMessage = String(values[0]);
            }
        }
        const safeMessage = this.#escapeHtml(displayMessage);
        return `
            <div class="alert alert-error" role="alert" data-testid="error-banner">
                <span class="alert-icon">⚠️</span>
                <span class="alert-text">${safeMessage}</span>
            </div>
        `;
    }

    /**
     * Renders a success banner container.
     * @param {string} message - Success description text.
     * @returns {string} HTML markup string.
     */
    renderSuccess(message) {
        const safeMessage = this.#escapeHtml(message || 'Operation completed successfully.');
        return `
            <div class="alert alert-success" role="status" data-testid="success-banner">
                <span class="alert-icon">✓</span>
                <span class="alert-text">${safeMessage}</span>
            </div>
        `;
    }
}

export const authRenderer = new AuthRenderer();