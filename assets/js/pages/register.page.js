/**
 * @file register.page.js
 * @description Enterprise register page controller managing SPA lifecycle, route initialization,
 * guest-only security assertion, component mounting, and teardown cleanup.
 * @module Pages/RegisterPage
 * @version 3.0.0
 * @status Production Ready
 */

import { authComponent } from '../components/auth.component.js';
import { guard } from '../security/guard.js';

export class RegisterPage {
    #container;
    #mounted;

    /**
     * Creates an instance of RegisterPage.
     */
    constructor() {
        this.#container = null;
        this.#mounted = false;
    }

    /**
     * Initializes the register page workflow and enforces guest-only access.
     */
    init() {
        try {
            guard.assertGuest();
        } catch (error) {
            if (typeof window !== 'undefined') {
                window.location.hash = '#/dashboard';
            }
        }
    }

    /**
     * Mounts the register page into the target HTML container.
     * @param {HTMLElement} container - Target DOM element container.
     */
    mount(container) {
        if (!container || !(container instanceof HTMLElement)) {
            return;
        }

        if (this.#mounted) {
            return;
        }

        this.#container = container;
        this.#mounted = true;

        authComponent.mount(this.#container);
        this.render();
    }

    /**
     * Renders the register view via the authentication component.
     */
    render() {
        if (!this.#mounted) {
            return;
        }
        authComponent.showRegister();
    }

    /**
     * Destroys the register page, unmounting components and clearing references.
     */
    destroy() {
        try {
            authComponent.destroy();
        } catch (error) {
            // Suppress teardown faults
        }

        this.#container = null;
        this.#mounted = false;
    }
}

export const registerPage = new RegisterPage();