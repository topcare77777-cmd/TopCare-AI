/**
 * file: assets/js/core/view-manager.js
 * Version: 133.1.2 (BUILD 133.1.2 — ROBUST VIEW LIFECYCLE MANAGER)
 * Status: APPROVED & LOCKED
 * SRP: Agnostic Lifecycle Manager handling page unmounting, mounting, and transition sequences.
 */

import { Core } from './index.js';

class ViewManagerEngine {
    constructor() {
        this._appHost = null;
        this._currentPageInstance = null;
        Object.seal(this);
    }

    getAppHost() {
        if (!this._appHost) {
            this._appHost = document.getElementById('app');
        }
        if (!this._appHost) {
            throw new Error("[ViewManager] Root container <main id='app'> missing from DOM.");
        }
        return this._appHost;
    }

    /**
     * Executes full lifecycle transition for any provided page module.
     * Sequence: destroy() -> clear DOM -> beforeEnter() -> init() -> mount() -> afterEnter()
     * @param {Object} pageModule 
     */
    async mountView(pageModule) {
        const host = this.getAppHost();

        try {
            // 1. Destroy active page instance
            if (this._currentPageInstance) {
                if (typeof this._currentPageInstance.destroy === 'function') {
                    await this._currentPageInstance.destroy();
                } else if (typeof this._currentPageInstance.unmount === 'function') {
                    await this._currentPageInstance.unmount();
                }
            }

            // 2. Clear DOM
            host.innerHTML = '';
            this._currentPageInstance = pageModule;

            // 3. Lifecycle Sequence Execution
            if (typeof pageModule.beforeEnter === 'function') {
                await pageModule.beforeEnter();
            }
            if (typeof pageModule.init === 'function') {
                await pageModule.init(host);
            }
            if (typeof pageModule.mount === 'function') {
                await pageModule.mount(host);
            } else if (typeof pageModule.render === 'function') {
                host.innerHTML = pageModule.render();
                if (typeof pageModule.bindEvents === 'function') {
                    pageModule.bindEvents(host);
                }
            }
            if (typeof pageModule.afterEnter === 'function') {
                await pageModule.afterEnter();
            }

            window.scrollTo({ top: 0, behavior: 'instant' });

        } catch (err) {
            Core.Logger.error(`[ViewManager] Lifecycle Execution Error: ${err.message}`);
            this.renderErrorView(err);
        }
    }

    renderErrorView(error) {
        const host = this.getAppHost();
        host.innerHTML = `
            <div style="padding: 60px 20px; text-align: center; max-width: 500px; margin: 0 auto;">
                <h2 style="color: #ef4444; font-size: 20px; margin-bottom: 8px;">Gagal Memuat Tampilan</h2>
                <p style="color: #64748b; font-size: 13px; margin-bottom: 20px;">${error.message || 'Terjadi kesalahan sistem.'}</p>
                <a href="#/home" style="display: inline-block; padding: 10px 18px; background: #2563eb; color: #ffffff; border-radius: 6px; text-decoration: none; font-size: 13px;">Kembali ke Beranda</a>
            </div>
        `;
    }
}

export const ViewManager = new ViewManagerEngine();