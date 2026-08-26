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

        // Ambil Daftar Semua User dari Supabase
        const { data: usersList } = await supabase
            .from('profiles')
            .select('*')
            .order('created_at', { ascending: false });

        container.innerHTML = `
            <section style="min-height: 85vh; padding: 3rem 1.5rem; max-width: 1200px; margin: 0 auto; color: #fff;">
                <div style="background: linear-gradient(135deg, rgba(124, 58, 237, 0.3), rgba(37, 99, 235, 0.2)); border: 1px solid rgba(124, 58, 237, 0.4); border-radius: 16px; padding: 2rem; margin-bottom: 2rem; display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 1rem;">
                    <div>
                        <h1 style="font-size: 1.8rem; font-weight: 700; margin-bottom: 0.25rem;">👑 Panel Super Admin TopCare AI</h1>
                        <p style="color: #cbd5e1; font-size: 0.95rem;">Halo, ${profile.full_name || 'Admin'}! Anda memiliki kendali penuh atas sistem.</p>
                    </div>
                    <div style="display: flex; gap: 0.75rem;">
                        <a href="#/dashboard" style="padding: 0.6rem 1.2rem; background: rgba(255, 255, 255, 0.1); color: #fff; text-decoration: none; border-radius: 8px; font-weight: 600;">Lihat Member View</a>
                        <button id="btn-admin-logout" style="padding: 0.6rem 1.2rem; background: #ef4444; color: #fff; border: none; border-radius: 8px; font-weight: 600; cursor: pointer;">Keluar</button>
                    </div>
                </div>

                <div style="background: rgba(15, 23, 42, 0.9); border: 1px solid rgba(255, 255, 255, 0.1); border-radius: 16px; padding: 1.5rem; overflow-x: auto;">
                    <h3 style="font-size: 1.2rem; font-weight: 600; margin-bottom: 1rem; color: #38bdf8;">Daftar Pengguna Terdaftar (${usersList?.length || 0})</h3>
                    <table style="width: 100%; border-collapse: collapse; text-align: left; font-size: 0.9rem;">
                        <thead>
                            <tr style="border-bottom: 1px solid rgba(255, 255, 255, 0.15); color: #94a3b8;">
                                <th style="padding: 0.75rem 1rem;">User ID</th>
                                <th style="padding: 0.75rem 1rem;">Nama Lengkap</th>
                                <th style="padding: 0.75rem 1rem;">Role</th>
                                <th style="padding: 0.75rem 1rem;">Tanggal Daftar</th>
                            </tr>
                        </thead>
                        <tbody>
                            ${(usersList || []).map(u => `
                                <tr style="border-bottom: 1px solid rgba(255, 255, 255, 0.05);">
                                    <td style="padding: 0.75rem 1rem; font-family: monospace; color: #94a3b8;">${u.id.substring(0, 8)}...</td>
                                    <td style="padding: 0.75rem 1rem; font-weight: 500;">${u.full_name || '-'}</td>
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
            </section>
        `;

        document.getElementById('btn-admin-logout')?.addEventListener('click', async () => {
            await supabase.auth.signOut();
            localStorage.clear();
            window.location.hash = '#/login';
        });
    }

    destroy() { }
}

export default AdminPage;