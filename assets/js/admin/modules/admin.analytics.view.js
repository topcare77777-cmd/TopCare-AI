/**
 * TOPCARE AI PLATFORM V3 — ADMIN ANALYTICS VIEW
 * Path: assets/js/admin/modules/admin.analytics.view.js
 */

export class AdminAnalyticsView {
    static render(users = []) {
        const total = users.length;
        const superAdmins = users.filter(u => u.role === 'super_admin').length;
        const members = users.filter(u => u.role !== 'super_admin').length;

        return `
            <div style="background: rgba(15, 23, 42, 0.8); border: 1px solid rgba(255, 255, 255, 0.08); border-radius: 16px; padding: 1.75rem;">
                <h3 style="font-size: 1.25rem; font-weight: 700; color: #fff; margin: 0 0 0.5rem 0;">📈 Laporan & Analitik Pengguna</h3>
                <p style="color: #94a3b8; font-size: 0.875rem; margin-bottom: 1.5rem;">Distribusi hak akses akun aktual pada database.</p>

                <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(220px, 1fr)); gap: 1.25rem; margin-bottom: 1.5rem;">
                    <div style="background: rgba(30, 41, 59, 0.6); border-radius: 12px; padding: 1.25rem; border-left: 4px solid #38bdf8;">
                        <div style="color: #94a3b8; font-size: 0.8rem;">Total Terdaftar</div>
                        <div style="font-size: 1.6rem; font-weight: 800; color: #fff;">${total}</div>
                    </div>
                    <div style="background: rgba(30, 41, 59, 0.6); border-radius: 12px; padding: 1.25rem; border-left: 4px solid #7c3aed;">
                        <div style="color: #94a3b8; font-size: 0.8rem;">Super Admin</div>
                        <div style="font-size: 1.6rem; font-weight: 800; color: #a855f7;">${superAdmins}</div>
                    </div>
                    <div style="background: rgba(30, 41, 59, 0.6); border-radius: 12px; padding: 1.25rem; border-left: 4px solid #22c55e;">
                        <div style="color: #94a3b8; font-size: 0.8rem;">Member Biasa</div>
                        <div style="font-size: 1.6rem; font-weight: 800; color: #4ade80;">${members}</div>
                    </div>
                </div>

                <div style="padding: 1.25rem; background: rgba(30, 41, 59, 0.4); border-radius: 10px; font-size: 0.85rem; color: #94a3b8;">
                    ℹ️ Analitik membership berbayar dan pendapatan transaksi bernilai <strong>0 / Rp 0</strong> karena tabel subscription belum aktif di backend.
                </div>
            </div>
        `;
    }
}