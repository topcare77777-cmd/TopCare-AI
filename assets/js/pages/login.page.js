/**
 * @file login.page.js
 * @description Enterprise login page controller managing SPA lifecycle, route initialization,
 * guest-only security assertion, component mounting, and teardown cleanup.
 * @module Pages/LoginPage
 * @version 3.0.0
 * @status Production Ready
 */

import { authComponent } from '../components/auth.component.js';
import { guard } from '../security/guard.js';

export class LoginPage {
    #container;
    #mounted;

    /**
     * Creates an instance of LoginPage.
     */
    constructor() {
        this.#container = null;
        this.#mounted = false;
    }

    /**
     * Initializes the login page workflow and enforces guest-only access.
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
     * Mounts the login page into the target HTML container.
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
     * Renders the login view via the authentication component.
     */
    render() {
        if (!this.#mounted) {
            return;
        }
        authComponent.showLogin();
    }

    /**
     * Destroys the login page, unmounting components and clearing references.
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

export const loginPage = new LoginPage();