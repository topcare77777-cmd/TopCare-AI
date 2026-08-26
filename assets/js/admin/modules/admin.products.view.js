/**
 * TOPCARE AI PLATFORM V3 — ADMIN PRODUCTS VIEW
 * Path: assets/js/admin/modules/admin.products.view.js
 */

export class AdminProductsView {
    static render() {
        return `
            <div style="background: rgba(15, 23, 42, 0.8); border: 1px solid rgba(255, 255, 255, 0.08); border-radius: 16px; padding: 1.75rem;">
                <h3 style="font-size: 1.25rem; font-weight: 700; color: #fff; margin: 0 0 0.5rem 0;">📦 Konten & Produk Digital</h3>
                <p style="color: #94a3b8; font-size: 0.875rem; margin-bottom: 1.5rem;">Administrasi katalog marketplace dan download center.</p>

                <div style="text-align: center; padding: 3.5rem 1.5rem; background: rgba(30, 41, 59, 0.3); border: 1px dashed rgba(255, 255, 255, 0.12); border-radius: 12px;">
                    <div style="font-size: 2.2rem; margin-bottom: 0.75rem;">🏷️</div>
                    <div style="font-size: 1.05rem; font-weight: 700; color: #cbd5e1; margin-bottom: 0.35rem;">Data produk belum memiliki admin source yang authoritative.</div>
                    <div style="font-size: 0.85rem; color: #64748b;">Katalog publik saat ini dikelola melalui modul konten statis mandiri.</div>
                </div>
            </div>
        `;
    }
}