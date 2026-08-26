/**
 * TOPCARE AI PLATFORM V3 — ADMIN HEADER COMPONENT
 * Path: assets/js/admin/admin.header.component.js
 */

import { SanitizerUtil } from '../core/utils/sanitizer.util.js';

export class AdminHeaderComponent {
    static render(appVersion = 'v3.0.0') {
        const safeVersion = SanitizerUtil.escapeHTML(appVersion);

        return `
            <style>
                #btn-toggle-sidebar {
                    display: none;
                    padding: 0.65rem 0.9rem;
                    background: rgba(255,255,255,0.08);
                    border: 1px solid rgba(255,255,255,0.15);
                    border-radius: 8px;
                    color: #fff;
                    cursor: pointer;
                    font-size: 1.1rem;
                }
                @media (max-width: 1023px) {
                    #btn-toggle-sidebar {
                        display: block;
                    }
                }
            </style>

            <div style="background: linear-gradient(135deg, rgba(30, 27, 75, 0.7), rgba(15, 23, 42, 0.9)); border: 1px solid rgba(124, 58, 237, 0.3); border-radius: 16px; padding: 1.5rem 1.75rem; margin-bottom: 2rem; display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 1rem; box-shadow: 0 8px 24px rgba(0, 0, 0, 0.3);">
                <div style="display: flex; align-items: center; gap: 1rem;">
                    <button id="btn-toggle-sidebar" title="Buka Menu Sidebar">☰</button>
                    <div>
                        <div style="display: flex; align-items: center; gap: 0.65rem; margin-bottom: 0.35rem;">
                            <h1 style="font-size: 1.6rem; font-weight: 800; margin: 0; color: #fff; letter-spacing: -0.5px;">👑 Panel Super Admin</h1>
                            <span id="badge-version" style="padding: 0.2rem 0.6rem; border-radius: 6px; background: #38bdf8; color: #0f172a; font-size: 0.75rem; font-weight: 800;">${safeVersion}</span>
                        </div>
                        <p style="color: #94a3b8; font-size: 0.9rem; margin: 0;">Kelola data member dan konfigurasi dinamis TopCare AI.</p>
                    </div>
                </div>
                <div style="display: flex; gap: 0.75rem; align-items: center;">
                    <a href="#/dashboard" style="padding: 0.65rem 1.25rem; background: rgba(255, 255, 255, 0.08); color: #fff; text-decoration: none; border-radius: 8px; font-weight: 600; font-size: 0.875rem; border: 1px solid rgba(255,255,255,0.12); display: inline-flex; align-items: center; gap: 0.4rem;">👁️ Lihat Member View</a>
                    <button id="btn-admin-logout" style="padding: 0.65rem 1.25rem; background: #ef4444; color: #fff; border: none; border-radius: 8px; font-weight: 600; cursor: pointer; font-size: 0.875rem;">Keluar</button>
                </div>
            </div>
        `;
    }
}