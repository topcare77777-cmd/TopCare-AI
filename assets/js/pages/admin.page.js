/**
 * TOPCARE AI PLATFORM V3 — SUPER ADMIN PANEL ORCHESTRATOR
 * Path: assets/js/pages/admin.page.js
 * Status: V3-FIX-07.5.3 MICRO FIX (ACTIVE STATE & RESIZE HARDENING)
 */

import { PlatformService } from '../core/services/platform.service.js';
import { appRouter } from '../core/router/app-router.js';
import { DOMListenerUtil } from '../core/utils/dom-listener.util.js';
import { AdminSidebarComponent } from '../admin/admin.sidebar.component.js';
import { AdminHeaderComponent } from '../admin/admin.header.component.js';
import { AdminDashboardView } from '../admin/modules/admin.dashboard.view.js';
import { AdminUsersView } from '../admin/modules/admin.users.view.js';
import { AdminPremiumView } from '../admin/modules/admin.premium.view.js';
import { AdminProductsView } from '../admin/modules/admin.products.view.js';
import { AdminTransactionsView } from '../admin/modules/admin.transactions.view.js';
import { AdminAnalyticsView } from '../admin/modules/admin.analytics.view.js';
import { AdminSettingsView } from '../admin/modules/admin.settings.view.js';
import { AdminAuditView } from '../admin/modules/admin.audit.view.js';
import { AdminHealthView } from '../admin/modules/admin.health.view.js';

export class AdminPage {
    constructor(container) {
        this.container = container || document.getElementById('app') || document.body;
        this.domListeners = new DOMListenerUtil();
        this.moduleListeners = new DOMListenerUtil();
        this.users = [];
        this.userRepoError = null;
        this.config = {};
        this.currentMenu = 'dashboard';
        this.userSearch = '';
        this.userRoleFilter = 'all';
        this.sidebarOpen = false;
        this.healthState = {
            browser: navigator.onLine ? 'ONLINE' : 'OFFLINE',
            auth: 'NOT VERIFIED',
            config: 'NOT VERIFIED',
            userRepo: 'NOT VERIFIED',
            router: 'NOT VERIFIED'
        };
    }

    async mount(target) {
        this.domListeners.cleanup();
        this.moduleListeners.cleanup();

        const container = target || this.container;

        // 1. Authoritative Auth Verification
        try {
            const session = await PlatformService.getCurrentUserSession(true);
            if (!session || session.role !== 'super_admin') {
                this.healthState.auth = 'OFFLINE';
                window.location.hash = session ? '#/dashboard' : '#/login';
                return;
            }
            this.healthState.auth = 'ONLINE';
        } catch {
            this.healthState.auth = 'OFFLINE';
            window.location.hash = '#/login';
            return;
        }

        // 2. User Repository Verification & Data Load
        try {
            const { users } = await PlatformService.getRegisteredUsersList({ page: 1, limit: 100 });
            this.users = users || [];
            this.userRepoError = null;
            this.healthState.userRepo = 'ONLINE';
        } catch (err) {
            this.users = [];
            this.userRepoError = err.message || 'Gagal mengambil data pengguna dari repository.';
            this.healthState.userRepo = 'OFFLINE';
        }

        // 3. Platform Config Verification
        try {
            this.config = await PlatformService.getPlatformConfig();
            this.healthState.config = 'ONLINE';
        } catch {
            this.config = {};
            this.healthState.config = 'OFFLINE';
        }

        // 4. Router Availability Check (Truthful Verification)
        if (appRouter && typeof appRouter.checkHealth === 'function') {
            try {
                this.healthState.router = await appRouter.checkHealth() ? 'ONLINE' : 'OFFLINE';
            } catch {
                this.healthState.router = 'OFFLINE';
            }
        } else {
            this.healthState.router = 'NOT VERIFIED';
        }

        container.innerHTML = `
            <div style="display: flex; min-height: 100vh; background: #020817; color: #f8fafc; position: relative; overflow-x: hidden;">
                <!-- Sidebar Kiri -->
                ${AdminSidebarComponent.render(this.currentMenu, this.sidebarOpen)}

                <!-- Main Content Canvas -->
                <main style="flex: 1; padding: clamp(1rem, 3vw, 2.5rem); max-width: 1400px; margin: 0 auto; width: 100%; box-sizing: border-box; overflow-y: auto; min-width: 0;">
                    ${AdminHeaderComponent.render(this.config.app_version)}
                    <div id="admin-alert" style="display: none; padding: 0.75rem 1.25rem; border-radius: 8px; margin-bottom: 1.5rem; font-size: 0.9rem;"></div>
                    <div id="admin-module-canvas">
                        ${this.#renderCurrentModule()}
                    </div>
                </main>
            </div>
        `;

        this.#bindGlobalEvents();
        this.#bindModuleEvents();
    }

    #renderCurrentModule() {
        switch (this.currentMenu) {
            case 'users':
                return AdminUsersView.render(this.users, this.userSearch, this.userRoleFilter, this.userRepoError);
            case 'premium':
                return AdminPremiumView.render();
            case 'products':
                return AdminProductsView.render();
            case 'transactions':
                return AdminTransactionsView.render();
            case 'analytics':
                return AdminAnalyticsView.render(this.users);
            case 'settings':
                return AdminSettingsView.render(this.config);
            case 'audit':
                return AdminAuditView.render();
            case 'health':
                return AdminHealthView.render(this.healthState);
            case 'dashboard':
            default:
                return AdminDashboardView.render(this.users);
        }
    }

    #renderModuleCanvas() {
        this.moduleListeners.cleanup();
        const canvas = document.getElementById('admin-module-canvas');
        if (canvas) {
            canvas.innerHTML = this.#renderCurrentModule();
            this.#bindModuleEvents();
        }
    }

    #updateActiveSidebarMenu() {
        const navItems = document.querySelectorAll('.admin-nav-item');
        navItems.forEach(btn => {
            const menuId = btn.getAttribute('data-menu');
            const isActive = menuId === this.currentMenu;

            btn.style.background = isActive
                ? 'linear-gradient(135deg, rgba(124, 58, 237, 0.25), rgba(37, 99, 235, 0.2))'
                : 'transparent';
            btn.style.color = isActive ? '#38bdf8' : '#94a3b8';
            btn.style.border = isActive ? '1px solid rgba(56, 189, 248, 0.3)' : '1px solid transparent';
            btn.style.fontWeight = isActive ? '700' : '500';
        });
    }

    #bindGlobalEvents() {
        // Sidebar Navigation Items
        const navItems = document.querySelectorAll('.admin-nav-item');
        navItems.forEach(btn => {
            this.domListeners.add(btn, 'click', () => {
                const targetMenu = btn.getAttribute('data-menu');
                if (targetMenu && targetMenu !== this.currentMenu) {
                    this.currentMenu = targetMenu;
                    this.sidebarOpen = false;
                    this.#updateSidebarState();
                    this.#updateActiveSidebarMenu();
                    this.#renderModuleCanvas();
                }
            });
        });

        // Toggle Hamburger
        const btnToggle = document.getElementById('btn-toggle-sidebar');
        if (btnToggle) {
            this.domListeners.add(btnToggle, 'click', () => {
                this.sidebarOpen = true;
                this.#updateSidebarState();
            });
        }

        // Close Drawer Button
        const btnClose = document.getElementById('btn-close-sidebar');
        if (btnClose) {
            this.domListeners.add(btnClose, 'click', () => {
                this.sidebarOpen = false;
                this.#updateSidebarState();
            });
        }

        // Backdrop Click
        const backdrop = document.getElementById('admin-sidebar-backdrop');
        if (backdrop) {
            this.domListeners.add(backdrop, 'click', () => {
                this.sidebarOpen = false;
                this.#updateSidebarState();
            });
        }

        // Window Resize Listener (Scoped via DOMListenerUtil)
        this.domListeners.add(window, 'resize', () => {
            if (window.innerWidth >= 1024 && this.sidebarOpen) {
                this.sidebarOpen = false;
            }
            this.#updateSidebarState();
        });

        // Logout Button
        const btnLogout = document.getElementById('btn-admin-logout');
        if (btnLogout) {
            this.domListeners.add(btnLogout, 'click', async () => {
                await PlatformService.logout();
                window.location.hash = '#/login';
            });
        }
    }

    #updateSidebarState() {
        const sidebar = document.getElementById('admin-sidebar');
        const backdrop = document.getElementById('admin-sidebar-backdrop');
        if (backdrop) {
            backdrop.style.display = (window.innerWidth < 1024 && this.sidebarOpen) ? 'block' : 'none';
        }
        if (sidebar) {
            if (window.innerWidth < 1024) {
                sidebar.style.transform = this.sidebarOpen ? 'translateX(0)' : 'translateX(-100%)';
            } else {
                sidebar.style.transform = 'none';
            }
        }
    }

    #bindModuleEvents() {
        if (this.currentMenu === 'users') {
            const searchInput = document.getElementById('users-search-input');
            if (searchInput) {
                this.moduleListeners.add(searchInput, 'input', (e) => {
                    this.userSearch = e.target.value;
                    this.#renderModuleCanvas();
                });
            }

            const roleFilter = document.getElementById('users-role-filter');
            if (roleFilter) {
                this.moduleListeners.add(roleFilter, 'change', (e) => {
                    this.userRoleFilter = e.target.value;
                    this.#renderModuleCanvas();
                });
            }

            const btnRefresh = document.getElementById('btn-refresh-users');
            if (btnRefresh) {
                this.moduleListeners.add(btnRefresh, 'click', async () => {
                    try {
                        const { users } = await PlatformService.getRegisteredUsersList({ page: 1, limit: 100 });
                        this.users = users || [];
                        this.userRepoError = null;
                        this.healthState.userRepo = 'ONLINE';
                    } catch (err) {
                        this.users = [];
                        this.userRepoError = err.message || 'Gagal mengambil data pengguna dari repository.';
                        this.healthState.userRepo = 'OFFLINE';
                    }
                    this.#renderModuleCanvas();
                });
            }
        }

        if (this.currentMenu === 'settings') {
            const form = document.getElementById('form-platform-settings');
            const alertBox = document.getElementById('admin-alert');
            const btnSave = document.getElementById('btn-save-settings');

            if (form) {
                this.moduleListeners.add(form, 'submit', async (e) => {
                    e.preventDefault();
                    if (btnSave) {
                        btnSave.disabled = true;
                        btnSave.innerText = 'Menyimpan...';
                    }

                    const payload = {
                        app_version: document.getElementById('setting-version')?.value.trim(),
                        contact_email: document.getElementById('setting-email')?.value.trim(),
                        contact_whatsapp: document.getElementById('setting-whatsapp')?.value.trim(),
                        tiktok_url: document.getElementById('setting-tiktok')?.value.trim(),
                        instagram_url: document.getElementById('setting-instagram')?.value.trim(),
                        youtube_url: document.getElementById('setting-youtube')?.value.trim()
                    };

                    try {
                        await PlatformService.updatePlatformConfig(payload);
                        this.config = { ...this.config, ...payload };
                        if (btnSave) {
                            btnSave.disabled = false;
                            btnSave.innerText = 'Simpan Perubahan';
                        }
                        if (alertBox) {
                            alertBox.style.display = 'block';
                            alertBox.style.background = 'rgba(34, 197, 94, 0.15)';
                            alertBox.style.border = '1px solid #22c55e';
                            alertBox.style.color = '#4ade80';
                            alertBox.innerText = '✅ Konfigurasi berhasil diperbarui secara live!';
                        }
                        const badge = document.getElementById('badge-version');
                        if (badge) badge.innerText = payload.app_version;
                    } catch (err) {
                        if (btnSave) {
                            btnSave.disabled = false;
                            btnSave.innerText = 'Simpan Perubahan';
                        }
                        if (alertBox) {
                            alertBox.style.display = 'block';
                            alertBox.style.background = 'rgba(239, 68, 68, 0.15)';
                            alertBox.style.border = '1px solid #ef4444';
                            alertBox.style.color = '#f87171';
                            alertBox.innerText = `❌ Gagal menyimpan: ${err.message}`;
                        }
                    }
                });
            }
        }
    }

    destroy() {
        this.domListeners.cleanup();
        this.moduleListeners.cleanup();
    }
}

export default AdminPage;