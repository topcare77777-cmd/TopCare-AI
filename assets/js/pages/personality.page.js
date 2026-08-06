/**
 * TOPCARE AI PLATFORM V2 — PERSONALITY PAGE CONTROLLER
 * Path: assets/js/pages/personality.page.js
 * Version: 130.1.0 (BUILD 130.1 — SINGLE LIFECYCLE DESTROY FIX)
 * Status: APPROVED & LOCKED
 * SRP: Personality Test Host Page Controller with Unified Lifecycle Execution.
 */

import { ViewManager } from '../core/view-manager.js';
import { Core } from '../core/index.js';

export class PersonalityPage {
    constructor(container) {
        this.container = container || ViewManager.getAppHost() || document.body;
        this.isMounted = false;
        this._sandboxInstance = null;
    }

    async mount() {
        this.render();
        this.isMounted = true;
        await this._initSandbox();
        if (Core && Core.Logger) {
            Core.Logger.info('[PersonalityPage] Lifecycle: Mount completed.');
        }
    }

    render() {
        this.container.innerHTML = `
            <div class="tc-personality-page-wrapper" style="max-width: 1100px; margin: 20px auto; padding: 16px;">
                <div id="personality-sandbox-host" class="tc-sandbox-host"></div>
            </div>
        `;
    }

    async _initSandbox() {
        const hostEl = this.container.querySelector('#personality-sandbox-host');
        if (!hostEl) return;

        try {
            const { PersonalityBootstrap } = await import('../personality/personality.bootstrap.js');
            if (PersonalityBootstrap && typeof PersonalityBootstrap.bootstrap === 'function') {
                await PersonalityBootstrap.bootstrap(hostEl);
                this._sandboxInstance = PersonalityBootstrap;
            }
        } catch (err) {
            if (Core && Core.Logger) {
                Core.Logger.error(`[PersonalityPage] Failed to bootstrap Personality Sandbox: ${err.message}`);
            }
        }
    }

    /**
     * Single Canonical Destroy Hook.
     * Invoked exclusively by ViewManager during host unmounting.
     */
    destroy() {
        if (Core && Core.Logger) {
            Core.Logger.info('[PersonalityPage] Lifecycle: Destroying Page Instance...');
        }

        if (this._sandboxInstance && typeof this._sandboxInstance.destroy === 'function') {
            try {
                this._sandboxInstance.destroy();
            } catch (e) {
                // Ignore sandbox internal destroy errors during transition
            }
            this._sandboxInstance = null;
        }

        if (this.container) {
            this.container.innerHTML = '';
        }
        this.isMounted = false;
    }
}

export const personalityPage = new PersonalityPage();
export default PersonalityPage;