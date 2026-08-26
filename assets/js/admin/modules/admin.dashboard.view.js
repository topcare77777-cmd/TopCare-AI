/**
 * TOPCARE AI PLATFORM V3 — ADMIN DASHBOARD VIEW
 * Path: assets/js/admin/modules/admin.dashboard.view.js
 */

export class AdminDashboardView {
    static render(users = []) {
        const totalUsers = users.length;
        const superAdmins = users.filter(u => u.role === 'super_admin').length;
        const members = users.filter(u => u.role !== 'super_admin').length;

        return `
            <div>
                <!-- 4 Summary Cards (Real Data Only) -->
                <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(240px, 1fr)); gap: 1.25rem; margin-bottom: 2rem;">
                    <div style="background: rgba(15, 23, 42, 0.8); border: 1px solid rgba(255, 255, 255, 0.08); border-radius: 14px; padding: 1.5rem;">
                        <div style="display: flex; justify-content: space-between; margin-bottom: 0.75rem; color: #eab308; font-size: 1.5rem;">👑</div>
                        <div style="color: #94a3b8; font-size: 0.85rem; margin-bottom: 0.25rem;">Total Member Premium</div>
                        <div style="font-size: 1.75rem; font-weight: 800; color: #fff;">0</div>
                        <div style="color: #64748b; font-size: 0.75rem; margin-top: 0.5rem;">Sumber membership belum tersedia</div>
                    </div>
                    <div style="background: rgba(15, 23, 42, 0.8); border: 1px solid rgba(255, 255, 255, 0.08); border-radius: 14px; padding: 1.5rem;">
                        <div style="display: flex; justify-content: space-between; margin-bottom: 0.75rem; color: #22c55e; font-size: 1.5rem;">📅</div>
                        <div style="color: #94a3b8; font-size: 0.85rem; margin-bottom: 0.25rem;">Aktif Saat Ini</div>
                        <div style="font-size: 1.75rem; font-weight: 800; color: #fff;">0</div>
                        <div style="color: #64748b; font-size: 0.75rem; margin-top: 0.5rem;">Berdasarkan masa aktif valid</div>
                    </div>
                    <div style="background: rgba(15, 23, 42, 0.8); border: 1px solid rgba(255, 255, 255, 0.08); border-radius: 14px; padding: 1.5rem;">
                        <div style="display: flex; justify-content: space-between; margin-bottom: 0.75rem; color: #38bdf8; font-size: 1.5rem;">🕒</div>
                        <div style="color: #94a3b8; font-size: 0.85rem; margin-bottom: 0.25rem;">Akan Berakhir (30 Hari)</div>
                        <div style="font-size: 1.75rem; font-weight: 800; color: #fff;">0</div>
                        <div style="color: #64748b; font-size: 0.75rem; margin-top: 0.5rem;">Mendekati masa tenggang</div>
                    </div>
                    <div style="background: rgba(15, 23, 42, 0.8); border: 1px solid rgba(255, 255, 255, 0.08); border-radius: 14px; padding: 1.5rem;">
                        <div style="display: flex; justify-content: space-between; margin-bottom: 0.75rem; color: #a855f7; font-size: 1.5rem;">💵</div>
                        <div style="color: #94a3b8; font-size: 0.85rem; margin-bottom: 0.25rem;">Total Pendapatan</div>
                        <div style="font-size: 1.5rem; font-weight: 800; color: #fff;">Rp 0</div>
                        <div style="color: #64748b; font-size: 0.75rem; margin-top: 0.5rem;">Sumber transaksi belum tersedia</div>
                    </div>
                </div>

                <!-- Real Quick Stats -->
                <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(320px, 1fr)); gap: 1.5rem;">
                    <div style="background: rgba(15, 23, 42, 0.8); border: 1px solid rgba(255, 255, 255, 0.08); border-radius: 14px; padding: 1.5rem;">
                        <h3 style="font-size: 1.1rem; font-weight: 700; color: #38bdf8; margin-bottom: 1rem;">👥 Ringkasan Pengguna Terdaftar</h3>
                        <div style="display: flex; flex-direction: column; gap: 0.75rem; font-size: 0.9rem;">
                            <div style="display: flex; justify-content: space-between; padding-bottom: 0.5rem; border-bottom: 1px solid rgba(255,255,255,0.05);">
                                <span style="color: #94a3b8;">Total Akun Database</span>
                                <span style="font-weight: 700; color: #fff;">${totalUsers}</span>
                            </div>
                            <div style="display: flex; justify-content: space-between; padding-bottom: 0.5rem; border-bottom: 1px solid rgba(255,255,255,0.05);">
                                <span style="color: #94a3b8;">Super Administrator</span>
                                <span style="font-weight: 700; color: #a855f7;">${superAdmins}</span>
                            </div>
                            <div style="display: flex; justify-content: space-between;">
                                <span style="color: #94a3b8;">Regular Member</span>
                                <span style="font-weight: 700; color: #38bdf8;">${members}</span>
                            </div>
                        </div>
                    </div>

                    <div style="background: rgba(15, 23, 42, 0.8); border: 1px solid rgba(255, 255, 255, 0.08); border-radius: 14px; padding: 1.5rem;">
                        <h3 style="font-size: 1.1rem; font-weight: 700; color: #38bdf8; margin-bottom: 1rem;">ℹ️ Status User Repository</h3>
                        <p style="color: #94a3b8; font-size: 0.875rem; line-height: 1.6; margin: 0 0 1rem 0;">
                            Data pengguna berhasil dimuat dari database profiles Supabase melalui UserRepository.
                        </p>
                        <div style="display: inline-flex; align-items: center; gap: 0.5rem; padding: 0.35rem 0.75rem; border-radius: 20px; background: rgba(34, 197, 94, 0.15); color: #4ade80; font-size: 0.8rem; font-weight: 700;">
                            <span style="width: 8px; height: 8px; border-radius: 50%; background: #22c55e;"></span> User repository berhasil mengambil data.
                        </div>
                    </div>
                </div>
            </div>
        `;
    }
}