/**
 * TOPCARE AI PLATFORM V3 — SUPER ADMIN PANEL
 * Path: assets/js/pages/admin.page.js
 */

import { supabase } from '../config/supabase.config.js';

export class AdminPage {
    constructor(container) {
        this.container = container || document.getElementById('app') || document.body;
    }

    async mount(target) {
        const container = target || this.container;
        const { data: { user } } = await supabase.auth.getUser();

        if (!user) {
            window.location.hash = '#/login';
            return;
        }

        // Cek Hak Akses Super Admin
        const { data: profile } = await supabase
            .from('profiles')
            .select('role, full_name')
            .eq('id', user.id)
            .single();

        if (profile?.role !== 'super_admin') {
            window.location.hash = '#/dashboard';
            return;
        }

        // Ambil Data Pengguna Beserta Email
        const { data: usersList } = await supabase
            .from('profiles')
            .select('*')
            .order('created_at', { ascending: false });

        // Ambil Data Setting Platform Dinamis
        const { data: settings } = await supabase
            .from('platform_settings')
            .select('*')
            .eq('id', 'app_config')
            .single();

        const currentSettings = settings || {
            app_version: 'v3.0.0',
            contact_whatsapp: '',
            contact_email: '',
            tiktok_url: '',
            instagram_url: '',
            youtube_url: ''
        };

        container.innerHTML = `
            <section style="min-height: 85vh; padding: 2.5rem 1.5rem; max-width: 1200px; margin: 0 auto; color: #fff;">
                <!-- Header Admin -->
                <div style="background: linear-gradient(135deg, rgba(124, 58, 237, 0.35), rgba(37, 99, 235, 0.25)); border: 1px solid rgba(124, 58, 237, 0.4); border-radius: 16px; padding: 2rem; margin-bottom: 2rem; display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 1rem;">
                    <div>
                        <div style="display: flex; align-items: center; gap: 0.5rem; margin-bottom: 0.25rem;">
                            <h1 style="font-size: 1.8rem; font-weight: 700; margin: 0;">👑 Panel Super Admin</h1>
                            <span id="badge-version" style="padding: 0.2rem 0.6rem; border-radius: 6px; background: #38bdf8; color: #0f172a; font-size: 0.75rem; font-weight: 700;">${currentSettings.app_version}</span>
                        </div>
                        <p style="color: #cbd5e1; font-size: 0.95rem; margin: 0;">Kelola data member dan konfigurasi dinamis TopCare AI.</p>
                    </div>
                    <div style="display: flex; gap: 0.75rem;">
                        <a href="#/dashboard" style="padding: 0.6rem 1.2rem; background: rgba(255, 255, 255, 0.1); color: #fff; text-decoration: none; border-radius: 8px; font-weight: 600;">Lihat Member View</a>
                        <button id="btn-admin-logout" style="padding: 0.6rem 1.2rem; background: #ef4444; color: #fff; border: none; border-radius: 8px; font-weight: 600; cursor: pointer;">Keluar</button>
                    </div>
                </div>

                <!-- Navigasi Tab Admin -->
                <div style="display: flex; gap: 1rem; margin-bottom: 1.5rem; border-bottom: 1px solid rgba(255, 255, 255, 0.1); padding-bottom: 0.5rem;">
                    <button id="tab-btn-settings" style="background: none; border: none; color: #38bdf8; font-weight: 700; font-size: 1rem; cursor: pointer; padding: 0.5rem 1rem; border-bottom: 2px solid #38bdf8;">⚙️ Profil & Konfigurasi Platform</button>
                    <button id="tab-btn-users" style="background: none; border: none; color: #94a3b8; font-weight: 600; font-size: 1rem; cursor: pointer; padding: 0.5rem 1rem;">👥 Manajemen Pengguna (${usersList?.length || 0})</button>
                </div>

                <!-- Alert Notifikasi -->
                <div id="admin-alert" style="display: none; padding: 0.75rem 1.25rem; border-radius: 8px; margin-bottom: 1.5rem; font-size: 0.9rem;"></div>

                <!-- TAB 1: FORM PENGATURAN PLATFORM & KONTAK SOSMED -->
                <div id="tab-content-settings" style="display: block;">
                    <form id="form-platform-settings" style="background: rgba(15, 23, 42, 0.9); border: 1px solid rgba(255, 255, 255, 0.1); border-radius: 16px; padding: 2rem;">
                        <h3 style="font-size: 1.25rem; font-weight: 700; color: #38bdf8; margin-bottom: 1.5rem;">Pengaturan Profil & Media Sosial Platform</h3>
                        
                        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 1.5rem; margin-bottom: 1.5rem;">
                            <div>
                                <label style="display: block; font-size: 0.85rem; color: #cbd5e1; margin-bottom: 0.5rem;">App Version</label>
                                <input type="text" id="setting-version" value="${currentSettings.app_version}" required placeholder="misal: v3.1.0" style="width: 100%; padding: 0.75rem; background: rgba(30, 41, 59, 0.8); border: 1px solid rgba(255, 255, 255, 0.15); border-radius: 8px; color: #fff;" />
                            </div>
                            <div>
                                <label style="display: block; font-size: 0.85rem; color: #cbd5e1; margin-bottom: 0.5rem;">Email Kontak Resmi</label>
                                <input type="email" id="setting-email" value="${currentSettings.contact_email || ''}" required placeholder="official@topcareai.com" style="width: 100%; padding: 0.75rem; background: rgba(30, 41, 59, 0.8); border: 1px solid rgba(255, 255, 255, 0.15); border-radius: 8px; color: #fff;" />
                            </div>
                            <div>
                                <label style="display: block; font-size: 0.85rem; color: #cbd5e1; margin-bottom: 0.5rem;">WhatsApp / Kontak Hotline</label>
                                <input type="text" id="setting-whatsapp" value="${currentSettings.contact_whatsapp || ''}" placeholder="+62812xxxx" style="width: 100%; padding: 0.75rem; background: rgba(30, 41, 59, 0.8); border: 1px solid rgba(255, 255, 255, 0.15); border-radius: 8px; color: #fff;" />
                            </div>
                            <div>
                                <label style="display: block; font-size: 0.85rem; color: #cbd5e1; margin-bottom: 0.5rem;">URL TikTok</label>
                                <input type="url" id="setting-tiktok" value="${currentSettings.tiktok_url || ''}" placeholder="https://tiktok.com/@akun" style="width: 100%; padding: 0.75rem; background: rgba(30, 41, 59, 0.8); border: 1px solid rgba(255, 255, 255, 0.15); border-radius: 8px; color: #fff;" />
                            </div>
                            <div>
                                <label style="display: block; font-size: 0.85rem; color: #cbd5e1; margin-bottom: 0.5rem;">URL Instagram</label>
                                <input type="url" id="setting-instagram" value="${currentSettings.instagram_url || ''}" placeholder="https://instagram.com/akun" style="width: 100%; padding: 0.75rem; background: rgba(30, 41, 59, 0.8); border: 1px solid rgba(255, 255, 255, 0.15); border-radius: 8px; color: #fff;" />
                            </div>
                            <div>
                                <label style="display: block; font-size: 0.85rem; color: #cbd5e1; margin-bottom: 0.5rem;">URL YouTube Channel</label>
                                <input type="url" id="setting-youtube" value="${currentSettings.youtube_url || ''}" placeholder="https://youtube.com/@channel" style="width: 100%; padding: 0.75rem; background: rgba(30, 41, 59, 0.8); border: 1px solid rgba(255, 255, 255, 0.15); border-radius: 8px; color: #fff;" />
                            </div>
                        </div>

                        <button type="submit" id="btn-save-settings" style="padding: 0.85rem 2rem; background: #2563eb; color: #fff; font-weight: 700; border: none; border-radius: 8px; cursor: pointer; transition: 0.2s;">
                            Simpan Perubahan
                        </button>
                    </form>
                </div>

                <!-- TAB 2: DAFTAR PENGGUNA TERDAFTAR (DILENGKAPI KOLOM EMAIL) -->
                <div id="tab-content-users" style="display: none;">
                    <div style="background: rgba(15, 23, 42, 0.9); border: 1px solid rgba(255, 255, 255, 0.1); border-radius: 16px; padding: 1.5rem; overflow-x: auto;">
                        <h3 style="font-size: 1.2rem; font-weight: 600; margin-bottom: 1rem; color: #38bdf8;">Daftar Pengguna Terdaftar</h3>
                        <table style="width: 100%; border-collapse: collapse; text-align: left; font-size: 0.9rem;">
                            <thead>
                                <tr style="border-bottom: 1px solid rgba(255, 255, 255, 0.15); color: #94a3b8;">
                                    <th style="padding: 0.75rem 1rem;">User ID</th>
                                    <th style="padding: 0.75rem 1rem;">Nama Lengkap</th>
                                    <th style="padding: 0.75rem 1rem;">Alamat Email</th>
                                    <th style="padding: 0.75rem 1rem;">Role</th>
                                    <th style="padding: 0.75rem 1rem;">Tanggal Daftar</th>
                                </tr>
                            </thead>
                            <tbody>
                                ${(usersList || []).map(u => `
                                    <tr style="border-bottom: 1px solid rgba(255, 255, 255, 0.05);">
                                        <td style="padding: 0.75rem 1rem; font-family: monospace; color: #94a3b8;">${u.id.substring(0, 8)}...</td>
                                        <td style="padding: 0.75rem 1rem; font-weight: 500;">${u.full_name || '-'}</td>
                                        <td style="padding: 0.75rem 1rem; color: #38bdf8; font-family: monospace;">${u.email || '-'}</td>
                                        <td style="padding: 0.75rem 1rem;">
                                            <span style="padding: 0.2rem 0.5rem; border-radius: 4px; font-size: 0.75rem; font-weight: 600; background: ${u.role === 'super_admin' ? '#7c3aed' : '#2563eb'}; color: #fff; text-transform: uppercase;">
                                                ${u.role}
                                            </span>
                                        </td>
                                        <td style="padding: 0.75rem 1rem; color: #94a3b8;">${new Date(u.created_at).toLocaleDateString('id-ID')}</td>
                                    </tr>
                                `).join('')}
                            </tbody>
                        </table>
                    </div>
                </div>
            </section>
        `;

        this.#bindEvents();
    }

    #bindEvents() {
        // Tab Handler
        const tabSettings = document.getElementById('tab-btn-settings');
        const tabUsers = document.getElementById('tab-btn-users');
        const contentSettings = document.getElementById('tab-content-settings');
        const contentUsers = document.getElementById('tab-content-users');

        tabSettings?.addEventListener('click', () => {
            tabSettings.style.color = '#38bdf8';
            tabSettings.style.borderBottom = '2px solid #38bdf8';
            tabUsers.style.color = '#94a3b8';
            tabUsers.style.borderBottom = 'none';
            contentSettings.style.display = 'block';
            contentUsers.style.display = 'none';
        });

        tabUsers?.addEventListener('click', () => {
            tabUsers.style.color = '#38bdf8';
            tabUsers.style.borderBottom = '2px solid #38bdf8';
            tabSettings.style.color = '#94a3b8';
            tabSettings.style.borderBottom = 'none';
            contentSettings.style.display = 'none';
            contentUsers.style.display = 'block';
        });

        // Form Submit Handler
        const form = document.getElementById('form-platform-settings');
        const alertBox = document.getElementById('admin-alert');
        const btnSave = document.getElementById('btn-save-settings');

        form?.addEventListener('submit', async (e) => {
            e.preventDefault();
            btnSave.disabled = true;
            btnSave.innerText = 'Menyimpan...';

            const payload = {
                app_version: document.getElementById('setting-version').value.trim(),
                contact_email: document.getElementById('setting-email').value.trim(),
                contact_whatsapp: document.getElementById('setting-whatsapp').value.trim(),
                tiktok_url: document.getElementById('setting-tiktok').value.trim(),
                instagram_url: document.getElementById('setting-instagram').value.trim(),
                youtube_url: document.getElementById('setting-youtube').value.trim(),
                updated_at: new Date().toISOString()
            };

            const { error } = await supabase
                .from('platform_settings')
                .update(payload)
                .eq('id', 'app_config');

            btnSave.disabled = false;
            btnSave.innerText = 'Simpan Perubahan';
            alertBox.style.display = 'block';

            if (!error) {
                alertBox.style.background = 'rgba(34, 197, 94, 0.15)';
                alertBox.style.border = '1px solid #22c55e';
                alertBox.style.color = '#4ade80';
                alertBox.innerText = '✅ Konfigurasi berhasil diperbarui secara live!';
                document.getElementById('badge-version').innerText = payload.app_version;
            } else {
                alertBox.style.background = 'rgba(239, 68, 68, 0.15)';
                alertBox.style.border = '1px solid #ef4444';
                alertBox.style.color = '#f87171';
                alertBox.innerText = `❌ Gagal menyimpan: ${error.message}`;
            }
        });

        // Logout
        document.getElementById('btn-admin-logout')?.addEventListener('click', async () => {
            await supabase.auth.signOut();
            localStorage.clear();
            window.location.hash = '#/login';
        });
    }

    destroy() { }
}

export default AdminPage;