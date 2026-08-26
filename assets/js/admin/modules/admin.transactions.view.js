/**
 * TOPCARE AI PLATFORM V3 — ADMIN TRANSACTIONS VIEW
 * Path: assets/js/admin/modules/admin.transactions.view.js
 */

export class AdminTransactionsView {
    static render() {
        return `
            <div>
                <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(220px, 1fr)); gap: 1.25rem; margin-bottom: 1.5rem;">
                    <div style="background: rgba(15, 23, 42, 0.8); border: 1px solid rgba(255, 255, 255, 0.08); border-radius: 14px; padding: 1.25rem;">
                        <div style="color: #94a3b8; font-size: 0.85rem;">Total Transaksi</div>
                        <div style="font-size: 1.5rem; font-weight: 800; color: #fff; margin-top: 0.25rem;">0</div>
                    </div>
                    <div style="background: rgba(15, 23, 42, 0.8); border: 1px solid rgba(255, 255, 255, 0.08); border-radius: 14px; padding: 1.25rem;">
                        <div style="color: #94a3b8; font-size: 0.85rem;">Pending</div>
                        <div style="font-size: 1.5rem; font-weight: 800; color: #eab308; margin-top: 0.25rem;">0</div>
                    </div>
                    <div style="background: rgba(15, 23, 42, 0.8); border: 1px solid rgba(255, 255, 255, 0.08); border-radius: 14px; padding: 1.25rem;">
                        <div style="color: #94a3b8; font-size: 0.85rem;">Berhasil</div>
                        <div style="font-size: 1.5rem; font-weight: 800; color: #22c55e; margin-top: 0.25rem;">0</div>
                    </div>
                    <div style="background: rgba(15, 23, 42, 0.8); border: 1px solid rgba(255, 255, 255, 0.08); border-radius: 14px; padding: 1.25rem;">
                        <div style="color: #94a3b8; font-size: 0.85rem;">Total Revenue</div>
                        <div style="font-size: 1.5rem; font-weight: 800; color: #38bdf8; margin-top: 0.25rem;">Rp 0</div>
                    </div>
                </div>

                <div style="background: rgba(15, 23, 42, 0.8); border: 1px solid rgba(255, 255, 255, 0.08); border-radius: 16px; padding: 3rem 1.5rem; text-align: center;">
                    <div style="font-size: 2.2rem; margin-bottom: 0.5rem;">💳</div>
                    <div style="font-size: 1rem; font-weight: 700; color: #cbd5e1; margin-bottom: 0.25rem;">Data transaksi belum tersedia pada schema database platform.</div>
                    <div style="font-size: 0.85rem; color: #64748b;">Semua riwayat pembayaran dan gateway log akan dicatat setelah modul payment gateway dihubungkan.</div>
                </div>
            </div>
        `;
    }
}