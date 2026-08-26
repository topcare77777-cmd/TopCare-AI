/**
 * TOPCARE AI PLATFORM V3 — ADMIN PREMIUM VIEW
 * Path: assets/js/admin/modules/admin.premium.view.js
 */

export class AdminPremiumView {
    static render() {
        return `
            <div style="background: rgba(15, 23, 42, 0.8); border: 1px solid rgba(255, 255, 255, 0.08); border-radius: 16px; padding: 1.75rem;">
                <div style="display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 1rem; margin-bottom: 1.5rem;">
                    <div>
                        <h3 style="font-size: 1.25rem; font-weight: 700; color: #fff; margin: 0 0 0.25rem 0;">⭐ Daftar Member Premium</h3>
                        <p style="color: #94a3b8; font-size: 0.85rem; margin: 0;">Kelola pengguna dengan akses Premium.</p>
                    </div>
                    <div style="display: flex; gap: 0.75rem; align-items: center;">
                        <input type="text" placeholder="Cari member premium..." disabled style="padding: 0.6rem 1rem; background: rgba(30, 41, 59, 0.4); border: 1px solid rgba(255, 255, 255, 0.08); border-radius: 8px; color: #64748b; font-size: 0.85rem;" />
                        <button disabled style="padding: 0.6rem 0.9rem; background: rgba(255, 255, 255, 0.04); border: 1px solid rgba(255, 255, 255, 0.08); border-radius: 8px; color: #64748b;">🔄</button>
                    </div>
                </div>

                <div style="text-align: center; padding: 4rem 1.5rem; background: rgba(30, 41, 59, 0.3); border: 1px dashed rgba(255, 255, 255, 0.12); border-radius: 12px;">
                    <div style="font-size: 2.5rem; margin-bottom: 0.75rem;">📂</div>
                    <div style="font-size: 1.1rem; font-weight: 700; color: #cbd5e1; margin-bottom: 0.35rem;">Belum ada sumber data membership Premium.</div>
                    <div style="font-size: 0.875rem; color: #64748b; max-width: 500px; margin: 0 auto;">
                        Tabel relasi membership, subscription, dan paket berbayar belum terkonfigurasi pada schema database PostgreSQL saat ini.
                    </div>
                </div>
            </div>
        `;
    }
}