/**
 * @file auth.component.js
 * @description Enterprise authentication UI component managing DOM mounting, state synchronization,
 * event binding, and delegation to AuthModule. Implements leak-free listener cleanup and secure form handling.
 * @module Components/AuthComponent
 * @version 3.0.0
 * @status Production Ready
 */

import { authRenderer } from '../renderers/auth.renderer.js';
import { authModule } from '../modules/auth.module.js';

export class AuthComponent {
    #rootElement;
    #currentView;
    #state;
    #listeners;

    /**
     * Creates an instance of AuthComponent.
     */
    constructor() {
        this.#rootElement = null;
        this.#currentView = 'login';
        this.#state = {
            loading: false,
            error: null,
            success: null,
            rememberMe: false,
            email: '',
            name: ''
        };
        this.#listeners = [];
    }

    /**
     * Renders the current view markup into the root container.
     * @private
     */
    #render() {
        if (!this.#rootElement) {
            return;
        }

        let html = '';
        if (this.#currentView === 'login') {
            html = authRenderer.renderLogin(this.#state);
        } else if (this.#currentView === 'register') {
            html = authRenderer.renderRegister(this.#state);
        } else if (this.#currentView === 'forgot') {
            html = authRenderer.renderForgotPassword(this.#state);
        }

        this.#rootElement.innerHTML = html;
        this.#bindEvents();
    }

    /**
     * Binds DOM event listeners securely to the rendered elements.
     * @private
     */
    #bindEvents() {
        this.#unbindEvents();

        if (!this.#rootElement) {
            return;
        }

        const loginForm = this.#rootElement.querySelector('#loginForm');
        if (loginForm) {
            const loginHandler = (e) => this.#handleLoginSubmit(e);
            loginForm.addEventListener('submit', loginHandler);
            this.#listeners.push({ element: loginForm, event: 'submit', handler: loginHandler });
        }

        const registerForm = this.#rootElement.querySelector('#registerForm');
        if (registerForm) {
            const registerHandler = (e) => this.#handleRegisterSubmit(e);
            registerForm.addEventListener('submit', registerHandler);
            this.#listeners.push({ element: registerForm, event: 'submit', handler: registerHandler });
        }

        const forgotForm = this.#rootElement.querySelector('#forgotForm');
        if (forgotForm) {
            const forgotHandler = (e) => this.#handleForgotSubmit(e);
            forgotForm.addEventListener('submit', forgotHandler);
            this.#listeners.push({ element: forgotForm, event: 'submit', handler: forgotHandler });
        }

        const links = this.#rootElement.querySelectorAll('.auth-link');
        links.forEach(link => {
            const linkHandler = (e) => {
                const href = link.getAttribute('href');
                if (href === '#/register') {
                    e.preventDefault();
                    this.showRegister();
                } else if (href === '#/login') {
                    e.preventDefault();
                    this.showLogin();
                } else if (href === '#/forgot-password') {
                    e.preventDefault();
                    this.showForgotPassword();
                }
            };
            link.addEventListener('click', linkHandler);
            this.#listeners.push({ element: link, event: 'click', handler: linkHandler });
        });
    }

    /**
     * Unbinds and clears all registered DOM event listeners to prevent memory leaks.
     * @private
     */
    #unbindEvents() {
        if (!this.#listeners || this.#listeners.length === 0) {
            return;
        }

        this.#listeners.forEach(({ element, event, handler }) => {
            if (element && typeof element.removeEventListener === 'function') {
                element.removeEventListener(event, handler);
            }
        });

        this.#listeners = [];
    }

    /**
     * Clears error and success messages from state.
     * @private
     */
    #clearMessages() {
        this.#state.error = null;
        this.#state.success = null;
    }

    /**
     * Collects form input values into a structured payload object.
     * @private
     * @param {HTMLFormElement} form - Form DOM element.
     * @returns {Object} Collected form data.
     */
    #collectFormData(form) {
        const formData = new FormData(form);
        const data = {};
        for (const [key, value] of formData.entries()) {
            data[key] = typeof value === 'string' ? value.trim() : value;
        }

        const rememberCheckbox = form.querySelector('input[name="rememberMe"]');
        if (rememberCheckbox) {
            data.rememberMe = rememberCheckbox.checked;
        }

        return data;
    }

    /**
     * Handles login form submission.
     * @private
     * @param {SubmitEvent} event - DOM submit event.
     */
    async #handleLoginSubmit(event) {
        event.preventDefault();
        const form = event.target;
        const payload = this.#collectFormData(form);

        this.#clearMessages();
        this.#state.loading = true;
        this.#state.email = payload.email || '';
        this.#state.rememberMe = Boolean(payload.rememberMe);
        this.#render();

        try {
            const result = await authModule.login(payload);
            this.#state.loading = false;

            const passwordInput = form.querySelector('input[name="password"]');
            if (passwordInput) passwordInput.value = '';

            if (result.success) {
                this.#state.success = result.message || 'Login successful.';
                this.#state.error = null;
            } else {
                this.#state.error = result.message || 'Authentication failed.';
                this.#state.success = null;
            }
        } catch (error) {
            this.#state.loading = false;
            this.#state.error = 'An unexpected error occurred.';
            this.#state.success = null;
        }

        this.#render();
    }

    /**
     * Handles register form submission.
     * @private
     * @param {SubmitEvent} event - DOM submit event.
     */
    async #handleRegisterSubmit(event) {
        event.preventDefault();
        const form = event.target;
        const payload = this.#collectFormData(form);

        this.#clearMessages();
        this.#state.loading = true;
        this.#state.name = payload.name || '';
        this.#state.email = payload.email || '';
        this.#render();

        try {
            const result = await authModule.register(payload);
            this.#state.loading = false;

            const pwdInput = form.querySelector('input[name="password"]');
            const confirmInput = form.querySelector('input[name="confirmPassword"]');
            if (pwdInput) pwdInput.value = '';
            if (confirmInput) confirmInput.value = '';

            if (result.success) {
                this.#state.success = result.message || 'Account created successfully.';
                this.#state.error = null;
            } else {
                this.#state.error = result.message || result.errors || 'Registration failed.';
                this.#state.success = null;
            }
        } catch (error) {
            this.#state.loading = false;
            this.#state.error = 'An unexpected error occurred.';
            this.#state.success = null;
        }

        this.#render();
    }

    /**
     * Handles forgot password form submission.
     * @private
     * @param {SubmitEvent} event - DOM submit event.
     */
    async #handleForgotSubmit(event) {
        event.preventDefault();
        const form = event.target;
        const payload = this.#collectFormData(form);

        this.#clearMessages();
        this.#state.loading = true;
        this.#state.email = payload.email || '';
        this.#render();

        try {
            const result = await authModule.forgotPassword(payload);
            this.#state.loading = false;

            if (result.success) {
                this.#state.success = result.message || 'Password recovery instructions sent.';
                this.#state.error = null;
            } else {
                this.#state.error = result.message || 'Password recovery failed.';
                this.#state.success = null;
            }
        } catch (error) {
            this.#state.loading = false;
            this.#state.error = 'An unexpected error occurred.';
            this.#state.success = null;
        }

        this.#render();
    }

    /**
     * Mounts the component into the specified container DOM element.
     * @param {HTMLElement} container - Root container element.
     */
    mount(container) {
        if (!container || !(container instanceof HTMLElement)) {
            return;
        }
        this.#rootElement = container;
        this.#render();
    }

    /**
     * Destroys the component, unbinding all listeners and clearing the DOM.
     */
    destroy() {
        this.#unbindEvents();
        if (this.#rootElement) {
            this.#rootElement.innerHTML = '';
            this.#rootElement = null;
        }
    }

    /**
     * Switches view to Login.
     */
    showLogin() {
        this.#currentView = 'login';
        this.#clearMessages();
        this.#render();
    }

    /**
     * Switches view to Register.
     */
    showRegister() {
        this.#currentView = 'register';
        this.#clearMessages();
        this.#render();
    }

    /**
     * Switches view to Forgot Password.
     */
    showForgotPassword() {
        this.#currentView = 'forgot';
        this.#clearMessages();
        this.#render();
    }

    /**
     * Updates component state partially and re-renders.
     * @param {Object} partialState - Partial state object to merge.
     */
    setState(partialState) {
        if (!partialState || typeof partialState !== 'object') {
            return;
        }
        this.#state = { ...this.#state, ...partialState };
        this.#render();
    }

    /**
     * Retrieves a copy of the current component state.
     * @returns {Object} State copy.
     */
    getState() {
        return { ...this.#state };
    }
}

export const authComponent = new AuthComponent();