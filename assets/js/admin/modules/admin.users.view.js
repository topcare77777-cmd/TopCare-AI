/**
 * TOPCARE AI PLATFORM V3 — ADMIN USERS VIEW
 * Path: assets/js/admin/modules/admin.users.view.js
 */

import { SanitizerUtil } from '../../core/utils/sanitizer.util.js';

export class AdminUsersView {
    static render(users = [], searchQuery = '', roleFilter = 'all', errorMessage = null) {
        if (errorMessage) {
            return `
                <div style="background: rgba(15, 23, 42, 0.8); border: 1px solid rgba(239, 68, 68, 0.3); border-radius: 16px; padding: 2.5rem 1.5rem; text-align: center;">
                    <div style="font-size: 2.5rem; margin-bottom: 0.75rem;">⚠️</div>
                    <h3 style="font-size: 1.15rem; font-weight: 700; color: #f87171; margin-bottom: 0.5rem;">Data Pengguna Gagal Dimuat</h3>
                    <p style="color: #94a3b8; font-size: 0.9rem; max-width: 500px; margin: 0 auto 1.5rem;">${SanitizerUtil.escapeHTML(errorMessage)}</p>
                    <button id="btn-refresh-users" style="padding: 0.65rem 1.25rem; background: #2563eb; color: #fff; border: none; border-radius: 8px; font-weight: 600; cursor: pointer;">Coba Muat Ulang</button>
                </div>
            `;
        }

        const filtered = users.filter(u => {
            const matchRole = roleFilter === 'all' || (u.role && u.role.toLowerCase() === roleFilter.toLowerCase());
            const q = searchQuery.toLowerCase();
            const matchSearch = !searchQuery ||
                (u.full_name && u.full_name.toLowerCase().includes(q)) ||
                (u.email && u.email.toLowerCase().includes(q)) ||
                (u.id && u.id.toLowerCase().includes(q));
            return matchRole && matchSearch;
        });

        return `
            <div style="background: rgba(15, 23, 42, 0.8); border: 1px solid rgba(255, 255, 255, 0.08); border-radius: 16px; padding: 1.75rem;">
                <div style="display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 1rem; margin-bottom: 1.5rem;">
                    <div>
                        <h3 style="font-size: 1.25rem; font-weight: 700; color: #fff; margin: 0 0 0.25rem 0;">👥 Manajemen Pengguna</h3>
                        <p style="color: #94a3b8; font-size: 0.85rem; margin: 0;">Fitur Filter & Search Pengguna (${filtered.length} dari ${users.length} Total).</p>
                    </div>
                    <div style="display: flex; gap: 0.75rem; align-items: center; flex-wrap: wrap;">
                        <input type="text" id="users-search-input" placeholder="Cari nama, email, ID..." value="${SanitizerUtil.escapeHTML(searchQuery)}" style="padding: 0.6rem 1rem; background: rgba(30, 41, 59, 0.7); border: 1px solid rgba(255, 255, 255, 0.15); border-radius: 8px; color: #fff; font-size: 0.85rem; min-width: 200px;" />
                        <select id="users-role-filter" style="padding: 0.6rem 0.85rem; background: rgba(30, 41, 59, 0.7); border: 1px solid rgba(255, 255, 255, 0.15); border-radius: 8px; color: #fff; font-size: 0.85rem;">
                            <option value="all" ${roleFilter === 'all' ? 'selected' : ''}>Semua Role</option>
                            <option value="super_admin" ${roleFilter === 'super_admin' ? 'selected' : ''}>Super Admin</option>
                            <option value="member" ${roleFilter === 'member' ? 'selected' : ''}>Member</option>
                        </select>
                        <button id="btn-refresh-users" title="Refresh User Data" style="padding: 0.6rem 0.9rem; background: rgba(255, 255, 255, 0.08); border: 1px solid rgba(255, 255, 255, 0.15); border-radius: 8px; color: #fff; cursor: pointer;">🔄</button>
                    </div>
                </div>

                <div style="overflow-x: auto;">
                    <table style="width: 100%; border-collapse: collapse; text-align: left; font-size: 0.875rem;">
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
                            ${users.length === 0 ? `
                                <tr><td colspan="5" style="text-align: center; padding: 3rem; color: #94a3b8;">Belum ada pengguna.</td></tr>
                            ` : filtered.length === 0 ? `
                                <tr><td colspan="5" style="text-align: center; padding: 3rem; color: #94a3b8;">Tidak ada data pengguna yang sesuai filter & pencarian.</td></tr>
                            ` : filtered.map(u => `
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
        `;
    }
}