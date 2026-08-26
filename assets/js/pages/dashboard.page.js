/**
 * TOPCARE AI PLATFORM V3 — MEMBER DASHBOARD
 * Path: assets/js/pages/dashboard.page.js
 * Status: PHASE 2.4.4 DOWNLOAD CENTER ENTRY INTEGRATED
 */

import { PlatformService } from '../core/services/platform.service.js';
import { SanitizerUtil } from '../core/utils/sanitizer.util.js';
import { DOMListenerUtil } from '../core/utils/dom-listener.util.js';

export class DashboardPage {
    constructor(container) {
        this.container = container || document.getElementById('app') || document.body;
        this.domListeners = new DOMListenerUtil();
    }

    async mount(target) {
        this.domListeners.cleanup();
        const container = target || this.container;
        const session = await PlatformService.getCurrentUserSession();

        if (!session) {
            window.location.hash = '#/login';
            return;
        }

        const safeName = SanitizerUtil.escapeHTML(session.name);
        const safeRole = SanitizerUtil.escapeHTML(session.role);
        const isSuperAdmin = session.role === 'super_admin';

        container.innerHTML = `
            <section style="min-height: 85vh; padding: 3rem 1.5rem; max-width: 1100px; margin: 0 auto; color: #fff;">
                <div style="background: rgba(15, 23, 42, 0.8); border: 1px solid rgba(255, 255, 255, 0.1); border-radius: 16px; padding: 2rem; margin-bottom: 2rem; display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 1rem;">
                    <div>
                        <h1 style="font-size: 1.8rem; font-weight: 700; margin-bottom: 0.25rem;">Selamat Datang, ${safeName}! 👋</h1>
                        <p style="color: #94a3b8; font-size: 0.95rem;">Status Akun: <span style="display: inline-block; padding: 0.2rem 0.6rem; border-radius: 6px; background: ${isSuperAdmin ? '#7c3aed' : '#2563eb'}; color: #fff; font-size: 0.8rem; font-weight: 600; text-transform: uppercase;">${safeRole}</span></p>
                    </div>
                    <div style="display: flex; gap: 0.75rem;">
                        ${isSuperAdmin ? `<a href="#/admin" style="padding: 0.6rem 1.2rem; background: #7c3aed; color: #fff; text-decoration: none; border-radius: 8px; font-weight: 600;">Panel Super Admin</a>` : ''}
                        <button id="btn-logout" style="padding: 0.6rem 1.2rem; background: #ef4444; color: #fff; border: none; border-radius: 8px; font-weight: 600; cursor: pointer;">Keluar</button>
                    </div>
                </div>

                <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 1.5rem;">
                    <div style="background: rgba(30, 41, 59, 0.6); border: 1px solid rgba(255, 255, 255, 0.08); border-radius: 12px; padding: 1.5rem;">
                        <h3 style="font-size: 1.2rem; margin-bottom: 0.5rem; color: #38bdf8;">🧠 Tes Kepribadian</h3>
                        <p style="color: #94a3b8; font-size: 0.9rem; margin-bottom: 1rem;">Temukan potensi diri melalui 4 Temperamen dan Analisis Jung.</p>
                        <a href="#/personality" style="display: inline-block; color: #38bdf8; text-decoration: none; font-weight: 600;">Mulai Tes →</a>
                    </div>
                    <div style="background: rgba(30, 41, 59, 0.6); border: 1px solid rgba(255, 255, 255, 0.08); border-radius: 12px; padding: 1.5rem;">
                        <h3 style="font-size: 1.2rem; margin-bottom: 0.5rem; color: #818cf8;">🎨 Creator Hub</h3>
                        <p style="color: #94a3b8; font-size: 0.9rem; margin-bottom: 1rem;">Akses prompt eksklusif dan materi kreasi digital terdepan.</p>
                        <a href="#/creator" style="display: inline-block; color: #818cf8; text-decoration: none; font-weight: 600;">Buka Hub →</a>
                    </div>
                    <div style="background: rgba(30, 41, 59, 0.6); border: 1px solid rgba(255, 255, 255, 0.08); border-radius: 12px; padding: 1.5rem;">
                        <h3 style="font-size: 1.2rem; margin-bottom: 0.5rem; color: #34d399;">🌐 Komunitas AI</h3>
                        <p style="color: #94a3b8; font-size: 0.9rem; margin-bottom: 1rem;">Berdiskusi langsung dengan kreator dan praktisi AI global.</p>
                        <a href="#/community" style="display: inline-block; color: #34d399; text-decoration: none; font-weight: 600;">Gabung Diskusi →</a>
                    </div>
                    <div style="background: rgba(30, 41, 59, 0.6); border: 1px solid rgba(255, 255, 255, 0.08); border-radius: 12px; padding: 1.5rem;">
                        <h3 style="font-size: 1.2rem; margin-bottom: 0.5rem; color: #38bdf8;">📥 Pusat Unduhan</h3>
                        <p style="color: #94a3b8; font-size: 0.9rem; margin-bottom: 1rem;">Akses lisensi dan unduh seluruh paket aset digital eksklusif Anda.</p>
                        <a href="#/download-center" style="display: inline-block; color: #38bdf8; text-decoration: none; font-weight: 600;">Buka Unduhan →</a>
                    </div>
                </div>
            </section>
        `;

        const btnLogout = document.getElementById('btn-logout');
        if (btnLogout) {
            this.domListeners.add(btnLogout, 'click', async () => {
                await PlatformService.logout();
                window.location.hash = '#/login';
            });
        }
    }

    destroy() {
        this.domListeners.cleanup();
    }
}

export default DashboardPage;