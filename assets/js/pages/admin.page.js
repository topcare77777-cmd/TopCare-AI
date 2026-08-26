/**
 * TOPCARE AI PLATFORM V3 — SUPER ADMIN PANEL
 * Path: assets/js/pages/admin.page.js
 * Status: V3-FIX-07.5 HONEST READ-ONLY PREMIUM TAB & IDEMPOTENT LIFECYCLE
 */

import { PlatformService } from '../core/services/platform.service.js';
import { SanitizerUtil } from '../core/utils/sanitizer.util.js';
import { DOMListenerUtil } from '../core/utils/dom-listener.util.js';

export class AdminPage {
    constructor(container) {
        this.container = container || document.getElementById('app') || document.body;
        this.domListeners = new DOMListenerUtil();
        this.users = [];
        this.currentTab = 'settings';
        this.searchQuery = '';
    }

    async mount(target) {
        // Idempotent lifecycle: bersihkan listener lama sebelum re-render
        this.domListeners.cleanup();

        const container = target || this.container;
        const session = await PlatformService.getCurrentUserSession(true);

        if (!session || session.role !== 'super_admin') {
            window.location.hash = session ? '#/dashboard' : '#/login';
            return;
        }

        const { users: usersList } = await PlatformService.getRegisteredUsersList({ page: 1, limit: 100 });
        this.users = usersList || [];
        const currentSettings = await PlatformService.getPlatformConfig();

        const safeVersion = SanitizerUtil.escapeHTML(currentSettings.app_version);
        const safeEmail = SanitizerUtil.escapeHTML(currentSettings.contact_email);
        const safeWhatsapp = SanitizerUtil.escapeHTML(currentSettings.contact_whatsapp);
        const safeTiktok = SanitizerUtil.escapeHTML(currentSettings.tiktok_url);
        const safeInstagram = SanitizerUtil.escapeHTML(currentSettings.instagram_url);
        const safeYoutube = SanitizerUtil.escapeHTML(currentSettings.youtube_url);

        const allPremiumUsers = this.#getPremiumUsers();
        const filteredPremiumUsers = this.#filterPremiumUsers(allPremiumUsers);
        const stats = this.#calculateStats(allPremiumUsers);

        container.innerHTML = `
            <section style="min-height: 90vh; padding: 2.5rem 1.5rem 5rem; max-width: 1200px; margin: 0 auto; color: #fff;">
                <!-- Header Admin -->
                <div style="background: linear-gradient(135deg, rgba(30, 27, 75, 0.7), rgba(15, 23, 42, 0.9)); border: 1px solid rgba(124, 58, 237, 0.3); border-radius: 16px; padding: 2rem; margin-bottom: 2rem; display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 1rem;">
                    <div>
                        <div style="display: flex; align-items: center; gap: 0.6rem; margin-bottom: 0.3rem;">
                            <h1 style="font-size: 1.8rem; font-weight: 800; margin: 0; color: #fff;">👑 Panel Super Admin</h1>
                            <span id="badge-version" style="padding: 0.2rem 0.6rem; border-radius: 6px; background: #38bdf8; color: #0f172a; font-size: 0.75rem; font-weight: 800;">${safeVersion}</span>
                        </div>
                        <p style="color: #94a3b8; font-size: 0.95rem; margin: 0;">Kelola data member dan konfigurasi dinamis TopCare AI.</p>
                    </div>
                    <div style="display: flex; gap: 0.75rem;">
                        <a href="#/dashboard" style="padding: 0.65rem 1.25rem; background: rgba(255, 255, 255, 0.08); color: #fff; text-decoration: none; border-radius: 8px; font-weight: 600; font-size: 0.9rem; border: 1px solid rgba(255,255,255,0.1);">👁️ Lihat Member View</a>
                        <button id="btn-admin-logout" style="padding: 0.65rem 1.25rem; background: #ef4444; color: #fff; border: none; border-radius: 8px; font-weight: 600; cursor: pointer; font-size: 0.9rem;">Keluar</button>
                    </div>
                </div>

                <!-- Navigasi 3 Tab Admin -->
                <div style="display: flex; gap: 1rem; margin-bottom: 2rem; border-bottom: 1px solid rgba(255, 255, 255, 0.1); padding-bottom: 0.5rem; overflow-x: auto;">
                    <button id="tab-btn-settings" style="background: none; border: none; color: ${this.currentTab === 'settings' ? '#38bdf8' : '#94a3b8'}; font-weight: 700; font-size: 0.95rem; cursor: pointer; padding: 0.5rem 1rem; border-bottom: ${this.currentTab === 'settings' ? '2px solid #38bdf8' : 'none'}; white-space: nowrap;">⚙️ Profil & Konfigurasi Platform</button>
                    <button id="tab-btn-users" style="background: none; border: none; color: ${this.currentTab === 'users' ? '#38bdf8' : '#94a3b8'}; font-weight: 700; font-size: 0.95rem; cursor: pointer; padding: 0.5rem 1rem; border-bottom: ${this.currentTab === 'users' ? '2px solid #38bdf8' : 'none'}; white-space: nowrap;">👥 Manajemen Pengguna (${this.users.length})</button>
                    <button id="tab-btn-premium" style="background: none; border: none; color: ${this.currentTab === 'premium' ? '#38bdf8' : '#94a3b8'}; font-weight: 700; font-size: 0.95rem; cursor: pointer; padding: 0.5rem 1rem; border-bottom: ${this.currentTab === 'premium' ? '2px solid #38bdf8' : 'none'}; white-space: nowrap;">⭐ Member Premium (${allPremiumUsers.length})</button>
                </div>

                <div id="admin-alert" style="display: none; padding: 0.75rem 1.25rem; border-radius: 8px; margin-bottom: 1.5rem; font-size: 0.9rem;"></div>

                <!-- TAB 1: FORM PENGATURAN PLATFORM -->
                <div id="tab-content-settings" style="display: ${this.currentTab === 'settings' ? 'block' : 'none'};">
                    <form id="form-platform-settings" style="background: rgba(15, 23, 42, 0.8); border: 1px solid rgba(255, 255, 255, 0.08); border-radius: 16px; padding: 2rem;">
                        <h3 style="font-size: 1.2rem; font-weight: 700; color: #38bdf8; margin-bottom: 1.5rem;">Pengaturan Profil & Media Sosial Platform</h3>
                        
                        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 1.5rem; margin-bottom: 1.5rem;">
                            <div>
                                <label style="display: block; font-size: 0.85rem; color: #94a3b8; margin-bottom: 0.5rem;">App Version</label>
                                <input type="text" id="setting-version" value="${safeVersion}" required style="width: 100%; padding: 0.75rem; background: rgba(30, 41, 59, 0.6); border: 1px solid rgba(255, 255, 255, 0.12); border-radius: 8px; color: #fff;" />
                            </div>
                            <div>
                                <label style="display: block; font-size: 0.85rem; color: #94a3b8; margin-bottom: 0.5rem;">Email Kontak Resmi</label>
                                <input type="email" id="setting-email" value="${safeEmail}" required style="width: 100%; padding: 0.75rem; background: rgba(30, 41, 59, 0.6); border: 1px solid rgba(255, 255, 255, 0.12); border-radius: 8px; color: #fff;" />
                            </div>
                            <div>
                                <label style="display: block; font-size: 0.85rem; color: #94a3b8; margin-bottom: 0.5rem;">WhatsApp / Kontak Hotline</label>
                                <input type="text" id="setting-whatsapp" value="${safeWhatsapp}" style="width: 100%; padding: 0.75rem; background: rgba(30, 41, 59, 0.6); border: 1px solid rgba(255, 255, 255, 0.12); border-radius: 8px; color: #fff;" />
                            </div>
                            <div>
                                <label style="display: block; font-size: 0.85rem; color: #94a3b8; margin-bottom: 0.5rem;">URL TikTok</label>
                                <input type="url" id="setting-tiktok" value="${safeTiktok}" style="width: 100%; padding: 0.75rem; background: rgba(30, 41, 59, 0.6); border: 1px solid rgba(255, 255, 255, 0.12); border-radius: 8px; color: #fff;" />
                            </div>
                            <div>
                                <label style="display: block; font-size: 0.85rem; color: #94a3b8; margin-bottom: 0.5rem;">URL Instagram</label>
                                <input type="url" id="setting-instagram" value="${safeInstagram}" style="width: 100%; padding: 0.75rem; background: rgba(30, 41, 59, 0.6); border: 1px solid rgba(255, 255, 255, 0.12); border-radius: 8px; color: #fff;" />
                            </div>
                            <div>
                                <label style="display: block; font-size: 0.85rem; color: #94a3b8; margin-bottom: 0.5rem;">URL YouTube Channel</label>
                                <input type="url" id="setting-youtube" value="${safeYoutube}" style="width: 100%; padding: 0.75rem; background: rgba(30, 41, 59, 0.6); border: 1px solid rgba(255, 255, 255, 0.12); border-radius: 8px; color: #fff;" />
                            </div>
                        </div>

                        <button type="submit" id="btn-save-settings" style="padding: 0.85rem 2rem; background: #2563eb; color: #fff; font-weight: 700; border: none; border-radius: 8px; cursor: pointer;">
                            Simpan Perubahan
                        </button>
                    </form>
                </div>

                <!-- TAB 2: MANAJEMEN PENGGUNA -->
                <div id="tab-content-users" style="display: ${this.currentTab === 'users' ? 'block' : 'none'};">
                    <div style="background: rgba(15, 23, 42, 0.8); border: 1px solid rgba(255, 255, 255, 0.08); border-radius: 16px; padding: 1.5rem; overflow-x: auto;">
                        <h3 style="font-size: 1.2rem; font-weight: 600; margin-bottom: 1.25rem; color: #38bdf8;">Daftar Pengguna Terdaftar</h3>
                        <table style="width: 100%; border-collapse: collapse; text-align: left; font-size: 0.9rem;">
                            <thead>
                                <tr style="border-bottom: 1px solid rgba(255, 255, 255, 0.1); color: #94a3b8;">
                                    <th style="padding: 0.85rem 1rem;">User ID</th>
                                    <th style="padding: 0.85rem 1rem;">Nama Lengkap</th>
                                    <th style="padding: 0.85rem 1rem;">Alamat Email</th>
                                    <th style="padding: 0.85rem 1rem;">Role</th>
                                    <th style="padding: 0.85rem 1rem;">Tanggal Daftar</th>
                                </tr>
                            </thead>
                            <tbody>
                                ${this.users.map(u => `
                                    <tr style="border-bottom: 1px solid rgba(255, 255, 255, 0.04);">
                                        <td style="padding: 0.85rem 1rem; font-family: monospace; color: #94a3b8;">${SanitizerUtil.escapeHTML(u.id ? u.id.substring(0, 8) : '')}...</td>
                                        <td style="padding: 0.85rem 1rem; font-weight: 600;">${SanitizerUtil.escapeHTML(u.full_name || '-')}</td>
                                        <td style="padding: 0.85rem 1rem; color: #38bdf8; font-family: monospace;">${SanitizerUtil.escapeHTML(u.email || '-')}</td>
                                        <td style="padding: 0.85rem 1rem;">
                                            <span style="padding: 0.2rem 0.6rem; border-radius: 6px; font-size: 0.75rem; font-weight: 700; background: ${u.role === 'super_admin' ? '#7c3aed' : '#2563eb'}; color: #fff; text-transform: uppercase;">
                                                ${SanitizerUtil.escapeHTML(u.role || 'member')}
                                            </span>
                                        </td>
                                        <td style="padding: 0.85rem 1rem; color: #94a3b8;">${u.created_at ? new Date(u.created_at).toLocaleDateString('id-ID') : '-'}</td>
                                    </tr>
                                `).join('')}
                            </tbody>
                        </table>
                    </div>
                </div>

                <!-- TAB 3: MEMBER PREMIUM DASHBOARD -->
                <div id="tab-content-premium" style="display: ${this.currentTab === 'premium' ? 'block' : 'none'};">
                    <div style="background: rgba(15, 23, 42, 0.8); border: 1px solid rgba(255, 255, 255, 0.08); border-radius: 16px; padding: 1.75rem; margin-bottom: 2rem;">
                        <div style="display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 1rem; margin-bottom: 1.5rem;">
                            <div>
                                <h3 style="font-size: 1.25rem; font-weight: 700; color: #fff; margin: 0 0 0.25rem 0;">⭐ Daftar Member Premium</h3>
                                <p style="color: #94a3b8; font-size: 0.85rem; margin: 0;">Kelola pengguna dengan akses Premium.</p>
                            </div>
                            <div style="display: flex; gap: 0.75rem; align-items: center;">
                                <input type="text" id="premium-search-input" placeholder="Cari member premium..." value="${SanitizerUtil.escapeHTML(this.searchQuery)}" style="padding: 0.6rem 1rem; background: rgba(30, 41, 59, 0.7); border: 1px solid rgba(255, 255, 255, 0.15); border-radius: 8px; color: #fff; font-size: 0.85rem; width: 220px;" />
                                <button id="btn-refresh-premium" title="Refresh" style="padding: 0.6rem 0.9rem; background: rgba(255, 255, 255, 0.08); border: 1px solid rgba(255, 255, 255, 0.15); border-radius: 8px; color: #fff; cursor: pointer;">🔄</button>
                            </div>
                        </div>

                        <!-- Table -->
                        <div style="overflow-x: auto;">
                            <table style="width: 100%; border-collapse: collapse; text-align: left; font-size: 0.875rem;">
                                <thead>
                                    <tr style="border-bottom: 1px solid rgba(255, 255, 255, 0.1); color: #94a3b8;">
                                        <th style="padding: 0.85rem 1rem;">Avatar & User ID</th>
                                        <th style="padding: 0.85rem 1rem;">Nama Lengkap</th>
                                        <th style="padding: 0.85rem 1rem;">Email</th>
                                        <th style="padding: 0.85rem 1rem;">Paket Premium</th>
                                        <th style="padding: 0.85rem 1rem;">Status</th>
                                        <th style="padding: 0.85rem 1rem;">Berlaku Hingga</th>
                                        <th style="padding: 0.85rem 1rem;">Tanggal Daftar</th>
                                        <th style="padding: 0.85rem 1rem; text-align: center;">Aksi</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    ${this.#renderPremiumTableRows(filteredPremiumUsers)}
                                </tbody>
                            </table>
                        </div>
                    </div>

                    <!-- 4 Summary Cards (Dihitung dari allPremiumUsers) -->
                    <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(240px, 1fr)); gap: 1.25rem;">
                        <div style="background: rgba(15, 23, 42, 0.8); border: 1px solid rgba(255, 255, 255, 0.08); border-radius: 14px; padding: 1.5rem;">
                            <div style="display: flex; justify-content: space-between; margin-bottom: 1rem; color: #eab308; font-size: 1.5rem;">👑</div>
                            <div style="color: #94a3b8; font-size: 0.85rem; margin-bottom: 0.25rem;">Total Member Premium</div>
                            <div style="font-size: 1.75rem; font-weight: 800; color: #fff;">${stats.total}</div>
                            <div style="color: #94a3b8; font-size: 0.75rem; margin-top: 0.5rem;">Tercatat di database</div>
                        </div>
                        <div style="background: rgba(15, 23, 42, 0.8); border: 1px solid rgba(255, 255, 255, 0.08); border-radius: 14px; padding: 1.5rem;">
                            <div style="display: flex; justify-content: space-between; margin-bottom: 1rem; color: #22c55e; font-size: 1.5rem;">📅</div>
                            <div style="color: #94a3b8; font-size: 0.85rem; margin-bottom: 0.25rem;">Aktif Saat Ini</div>
                            <div style="font-size: 1.75rem; font-weight: 800; color: #fff;">${stats.active}</div>
                            <div style="color: #94a3b8; font-size: 0.75rem; margin-top: 0.5rem;">Berdasarkan masa aktif</div>
                        </div>
                        <div style="background: rgba(15, 23, 42, 0.8); border: 1px solid rgba(255, 255, 255, 0.08); border-radius: 14px; padding: 1.5rem;">
                            <div style="display: flex; justify-content: space-between; margin-bottom: 1rem; color: #38bdf8; font-size: 1.5rem;">🕒</div>
                            <div style="color: #94a3b8; font-size: 0.85rem; margin-bottom: 0.25rem;">Akan Berakhir (30 Hari)</div>
                            <div style="font-size: 1.75rem; font-weight: 800; color: #fff;">${stats.expiringSoon}</div>
                            <div style="color: #94a3b8; font-size: 0.75rem; margin-top: 0.5rem;">Mendekati masa tenggang</div>
                        </div>
                        <div style="background: rgba(15, 23, 42, 0.8); border: 1px solid rgba(255, 255, 255, 0.08); border-radius: 14px; padding: 1.5rem;">
                            <div style="display: flex; justify-content: space-between; margin-bottom: 1rem; color: #a855f7; font-size: 1.5rem;">💵</div>
                            <div style="color: #94a3b8; font-size: 0.85rem; margin-bottom: 0.25rem;">Total Pendapatan</div>
                            <div style="font-size: 1.5rem; font-weight: 800; color: #fff;">${stats.revenueFormatted}</div>
                            <div style="color: #94a3b8; font-size: 0.75rem; margin-top: 0.5rem;">Sumber transaksi belum tersedia</div>
                        </div>
                    </div>
                </div>
            </section>
        `;

        this.#bindEvents();
    }

    /**
     * Sumber data premium murni: mengembalikan array kosong karena tabel membership belum ada di schema database saat ini
     */
    #getPremiumUsers() {
        return [];
    }

    #filterPremiumUsers(allPremiumUsers) {
        if (!this.searchQuery) return allPremiumUsers;
        const q = this.searchQuery.toLowerCase();
        return allPremiumUsers.filter(u =>
            (u.full_name && u.full_name.toLowerCase().includes(q)) ||
            (u.email && u.email.toLowerCase().includes(q))
        );
    }

    #calculateStats(allPremiumUsers) {
        return {
            total: allPremiumUsers.length,
            active: 0,
            expiringSoon: 0,
            revenueFormatted: 'Rp 0'
        };
    }

    #renderPremiumTableRows(filteredPremiumUsers) {
        if (filteredPremiumUsers.length === 0) {
            return `
                <tr>
                    <td colspan="8" style="text-align: center; padding: 3.5rem 1.5rem; color: #94a3b8;">
                        <div style="font-size: 2rem; margin-bottom: 0.75rem;">📂</div>
                        <div style="font-size: 1rem; font-weight: 700; color: #cbd5e1; margin-bottom: 0.25rem;">Belum ada sumber data membership Premium.</div>
                        <div style="font-size: 0.85rem; color: #64748b;">Membership & transaksi berbayar belum tersedia pada schema database platform saat ini.</div>
                    </td>
                </tr>
            `;
        }

        return '';
    }

    #bindEvents() {
        const tabSettings = document.getElementById('tab-btn-settings');
        const tabUsers = document.getElementById('tab-btn-users');
        const tabPremium = document.getElementById('tab-btn-premium');

        const contentSettings = document.getElementById('tab-content-settings');
        const contentUsers = document.getElementById('tab-content-users');
        const contentPremium = document.getElementById('tab-content-premium');

        const setTab = (activeTab) => {
            this.currentTab = activeTab;
            if (tabSettings) {
                tabSettings.style.color = activeTab === 'settings' ? '#38bdf8' : '#94a3b8';
                tabSettings.style.borderBottom = activeTab === 'settings' ? '2px solid #38bdf8' : 'none';
            }
            if (tabUsers) {
                tabUsers.style.color = activeTab === 'users' ? '#38bdf8' : '#94a3b8';
                tabUsers.style.borderBottom = activeTab === 'users' ? '2px solid #38bdf8' : 'none';
            }
            if (tabPremium) {
                tabPremium.style.color = activeTab === 'premium' ? '#38bdf8' : '#94a3b8';
                tabPremium.style.borderBottom = activeTab === 'premium' ? '2px solid #38bdf8' : 'none';
            }
            if (contentSettings) contentSettings.style.display = activeTab === 'settings' ? 'block' : 'none';
            if (contentUsers) contentUsers.style.display = activeTab === 'users' ? 'block' : 'none';
            if (contentPremium) contentPremium.style.display = activeTab === 'premium' ? 'block' : 'none';
        };

        if (tabSettings) this.domListeners.add(tabSettings, 'click', () => setTab('settings'));
        if (tabUsers) this.domListeners.add(tabUsers, 'click', () => setTab('users'));
        if (tabPremium) this.domListeners.add(tabPremium, 'click', () => setTab('premium'));

        const searchInput = document.getElementById('premium-search-input');
        if (searchInput) {
            this.domListeners.add(searchInput, 'input', (e) => {
                this.searchQuery = e.target.value;
                const allPremiumUsers = this.#getPremiumUsers();
                const filteredPremiumUsers = this.#filterPremiumUsers(allPremiumUsers);
                const tbody = document.querySelector('#tab-content-premium tbody');
                if (tbody) tbody.innerHTML = this.#renderPremiumTableRows(filteredPremiumUsers);
            });
        }

        const btnRefresh = document.getElementById('btn-refresh-premium');
        if (btnRefresh) {
            this.domListeners.add(btnRefresh, 'click', async () => {
                const targetTab = this.currentTab;
                await this.mount();
                setTab(targetTab);
            });
        }

        const form = document.getElementById('form-platform-settings');
        const alertBox = document.getElementById('admin-alert');
        const btnSave = document.getElementById('btn-save-settings');

        if (form) {
            this.domListeners.add(form, 'submit', async (e) => {
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

        const btnLogout = document.getElementById('btn-admin-logout');
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

export default AdminPage;