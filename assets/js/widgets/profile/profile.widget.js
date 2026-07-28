/**
 * -----------------------------------------------------------------
 * TOPCARE AI PLATFORM - ARCHITECTURE METADATA
 * -----------------------------------------------------------------
 * File         : assets/js/widgets/profile/profile.widget.js
 * Layer        : Presentation Widget Layer (BUILD 095.3)
 * Status       : ACTIVE
 * Version      : 1.0.0
 * Architecture : Development Constitution v1.1
 * Description  : Reactive Profile Widget subscribing exclusively to AuthObserver
 *                to display or hide user profile details cleanly.
 * -----------------------------------------------------------------
 */

import { authObserver } from "../../auth/runtime/auth.observer.js";
import Logger from "../../core/logger.js";

export class ProfileWidget {
    /**
     * Creates an instance of ProfileWidget.
     * @param {string|HTMLElement} [containerSelector="#profile-widget-container"] - Target container selector.
     */
    constructor(containerSelector = "#profile-widget-container") {
        this.containerSelector = containerSelector;
        this.containerElement = null;
        this.unsubscribe = null;
    }

    /**
     * Mounts the profile widget and subscribes to authObserver state changes.
     */
    mount() {
        if (typeof document === "undefined") return;

        if (typeof this.containerSelector === "string") {
            this.containerElement = document.querySelector(this.containerSelector);
        } else if (this.containerSelector instanceof HTMLElement) {
            this.containerElement = this.containerSelector;
        }

        if (!this.containerElement) {
            // Widget optional if container is absent on certain pages
            return;
        }

        this.unsubscribe = authObserver.subscribe((state) => {
            if (state.authenticated && state.user) {
                this.showProfile(state.user);
            } else {
                this.hideProfile();
            }
        });

        Logger.info("[ProfileWidget] Mounted and subscribed to AuthObserver.");
    }

    /**
     * Renders user profile information.
     * @param {Object} user 
     */
    showProfile(user) {
        if (!this.containerElement) return;

        const username = user.username || "Pengguna";
        const email = user.email || "-";

        this.containerElement.style.display = "block";
        this.containerElement.innerHTML = `
            <div class="profile-card">
                <div class="profile-avatar-placeholder">👤</div>
                <div class="profile-details">
                    <h4 class="profile-username">${this._escapeHtml(username)}</h4>
                    <p class="profile-email">${this._escapeHtml(email)}</p>
                </div>
            </div>
        `;
    }

    /**
     * Hides or clears the profile widget when guest.
     */
    hideProfile() {
        if (!this.containerElement) return;
        this.containerElement.style.display = "none";
        this.containerElement.innerHTML = "";
    }

    /**
     * Escapes text for safety.
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
     * Cleans up subscription and hides widget.
     */
    destroy() {
        if (typeof this.unsubscribe === "function") {
            this.unsubscribe();
            this.unsubscribe = null;
        }
        this.hideProfile();
        this.containerElement = null;
        Logger.info("[ProfileWidget] Destroyed and unsubscribed.");
    }
}

export default ProfileWidget;