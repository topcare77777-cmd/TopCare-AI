/**
 * -----------------------------------------------------------------
 * TOPCARE AI PLATFORM - ARCHITECTURE METADATA
 * -----------------------------------------------------------------
 * File         : assets/js/components/navbar/navbar.component.js
 * Layer        : Presentation Component Layer (BUILD 095.3)
 * Status       : ACTIVE
 * Version      : 1.0.0
 * Architecture : Development Constitution v1.1
 * Description  : Pure reactive Navbar component driven strictly by AuthObserver
 *                snapshots, delegating actions to AuthUIController.
 * -----------------------------------------------------------------
 */

import { authObserver } from "../../auth/runtime/auth.observer.js";
import authUIController from "../../auth/ui/auth.ui.controller.js";
import Logger from "../../core/logger.js";

export class NavbarComponent {
    /**
     * Creates an instance of NavbarComponent.
     * @param {string|HTMLElement} [containerSelector="#site-header"] - Target container or selector.
     */
    constructor(containerSelector = "#site-header") {
        this.containerSelector = containerSelector;
        this.containerElement = null;
        this.unsubscribe = null;
        this.currentState = {
            initialized: false,
            authenticated: false,
            restored: false,
            user: null
        };
    }

    /**
     * Mounts the navbar component, resolves container, and subscribes to AuthObserver.
     */
    mount() {
        if (typeof document === "undefined") {
            return;
        }

        if (typeof this.containerSelector === "string") {
            this.containerElement = document.querySelector(this.containerSelector);
        } else if (this.containerSelector instanceof HTMLElement) {
            this.containerElement = this.containerSelector;
        }

        if (!this.containerElement) {
            Logger.warn("[NavbarComponent] Target container not found in DOM.");
            return;
        }

        // Subscribe to authObserver. subscribe() immediately triggers callback with current state.
        this.unsubscribe = authObserver.subscribe((state) => {
            this.updateAuthState(state);
        });

        Logger.info("[NavbarComponent] Mounted and subscribed to AuthObserver.");
    }

    /**
     * Updates internal state snapshot and triggers UI rendering.
     * @param {Object} state 
     */
    updateAuthState(state) {
        if (!state) return;
        this.currentState = { ...state };
        this.render();
    }

    /**
     * Renders the navbar based on the current auth state snapshot.
     */
    render() {
        if (!this.containerElement) return;

        // If not yet restored/initialized, keep a neutral/skeleton or safe guest view
        if (!this.currentState.restored && !this.currentState.initialized) {
            return;
        }

        if (this.currentState.authenticated && this.currentState.user) {
            this.renderUser(this.currentState.user);
        } else {
            this.renderGuest();
        }

        this._bindEventDelegation();
    }

    /**
     * Renders the Guest layout (Login / Register buttons).
     */
    renderGuest() {
        // Target specific auth action container or slot within the navbar structure
        const authActionSlot = this.containerElement.querySelector(".navbar-auth-actions");
        if (!authActionSlot) return;

        authActionSlot.innerHTML = `
            <button type="button" class="btn-nav-login" data-action="login">Masuk</button>
            <button type="button" class="btn-nav-register" data-action="register">Mulai Gratis</button>
        `;
    }

    /**
     * Renders the Authenticated layout (User Greeting, Dashboard, Profile, Logout).
     * @param {Object} user 
     */
    renderUser(user) {
        const authActionSlot = this.containerElement.querySelector(".navbar-auth-actions");
        if (!authActionSlot) return;

        const displayName = user.username || user.email || "Pengguna";

        authActionSlot.innerHTML = `
            <span class="navbar-user-greeting">Halo, ${this._escapeHtml(displayName)}</span>
            <a href="#/dashboard" class="nav-link-dashboard" data-link>Dashboard</a>
            <button type="button" class="btn-nav-logout" data-action="logout">Keluar</button>
        `;
    }

    /**
     * Binds DOM event listeners safely using event delegation.
     * @private
     */
    _bindEventDelegation() {
        if (this._hasEventBound || !this.containerElement) return;

        this.containerElement.addEventListener("click", (e) => {
            const target = e.target.closest("[data-action]");
            if (!target) return;

            const action = target.getAttribute("data-action");
            if (action === "login") {
                e.preventDefault();
                authUIController.openLogin();
            } else if (action === "register") {
                e.preventDefault();
                authUIController.openRegister();
            } else if (action === "logout") {
                e.preventDefault();
                authUIController.handleLogout();
            }
        });

        this._hasEventBound = true;
    }

    /**
     * Escapes text to prevent simple XSS during dynamic rendering.
     * @private
     * @param {string} str 
     * @returns {string}
     */
    _escapeHtml(str) {
        if (!str) return "";
        return String(str)
            .replace(/&/g, "&amp;")
            .replace(/</g, "&lt;")
            .replace(/>/g, "&gt;")
            .replace(/"/g, "&quot;")
            .replace(/'/g, "&#039;");
    }

    /**
     * Cleans up subscriptions and resets container slots.
     */
    destroy() {
        if (typeof this.unsubscribe === "function") {
            this.unsubscribe();
            this.unsubscribe = null;
        }

        if (this.containerElement) {
            const authActionSlot = this.containerElement.querySelector(".navbar-auth-actions");
            if (authActionSlot) {
                authActionSlot.innerHTML = "";
            }
        }

        this.containerElement = null;
        this._hasEventBound = false;
        Logger.info("[NavbarComponent] Destroyed and unsubscribed.");
    }
}

export default NavbarComponent;