/**
 * TOPCARE AI PLATFORM V3 — ADMIN SIDEBAR COMPONENT
 * Path: assets/js/admin/admin.sidebar.component.js
 */

export class AdminSidebarComponent {
    static render(activeMenu = 'dashboard', isOpenMobile = false) {
        const menuItems = [
            { id: 'dashboard', label: 'Dashboard', icon: '📊' },
            { id: 'users', label: 'Manajemen Pengguna', icon: '👥' },
            { id: 'premium', label: 'Member Premium', icon: '⭐', badge: 'PREMIUM' },
            { id: 'products', label: 'Konten & Produk', icon: '📦' },
            { id: 'transactions', label: 'Transaksi', icon: '💳' },
            { id: 'analytics', label: 'Laporan & Analitik', icon: '📈' },
            { id: 'settings', label: 'Pengaturan Platform', icon: '⚙️' },
            { id: 'audit', label: 'Audit Log', icon: '📜' },
            { id: 'health', label: 'System Health', icon: '🛡️' }
        ];

        return `
            <style>
                #admin-sidebar-backdrop {
                    display: none;
                    position: fixed;
                    inset: 0;
                    background: rgba(0,0,0,0.65);
                    z-index: 998;
                    backdrop-filter: blur(2px);
                }
                #admin-sidebar {
                    width: 250px;
                    background: #030712;
                    border-right: 1px solid rgba(255, 255, 255, 0.08);
                    display: flex;
                    flex-direction: column;
                    min-height: 100vh;
                    flex-shrink: 0;
                    box-sizing: border-box;
                    transition: transform 0.3s ease;
                }
                #btn-close-sidebar {
                    display: none;
                    background: none;
                    border: none;
                    color: #94a3b8;
                    font-size: 1.25rem;
                    cursor: pointer;
                    padding: 0.25rem;
                }
                @media (max-width: 1023px) {
                    #admin-sidebar {
                        position: fixed;
                        top: 0;
                        left: 0;
                        bottom: 0;
                        z-index: 999;
                        transform: ${isOpenMobile ? 'translateX(0)' : 'translateX(-100%)'};
                    }
                    #admin-sidebar-backdrop {
                        display: ${isOpenMobile ? 'block' : 'none'};
                    }
                    #btn-close-sidebar {
                        display: block;
                    }
                }
                @media (min-width: 1024px) {
                    #admin-sidebar {
                        position: relative;
                        transform: none !important;
                    }
                    #admin-sidebar-backdrop {
                        display: none !important;
                    }
                    #btn-close-sidebar {
                        display: none !important;
                    }
                }
            </style>

            <!-- Backdrop Mobile -->
            <div id="admin-sidebar-backdrop"></div>

            <!-- Sidebar Container -->
            <aside id="admin-sidebar">
                <div style="padding: 1.5rem 1.25rem; border-bottom: 1px solid rgba(255, 255, 255, 0.06); display: flex; justify-content: space-between; align-items: center;">
                    <div style="font-size: 0.75rem; font-weight: 800; color: #a855f7; letter-spacing: 0.1em; text-transform: uppercase;">Super Admin Panel</div>
                    <button id="btn-close-sidebar" title="Tutup Menu">✕</button>
                </div>

                <nav style="padding: 1rem 0.75rem; display: flex; flex-direction: column; gap: 0.35rem; flex: 1;">
                    ${menuItems.map(item => {
            const isActive = activeMenu === item.id;
            const bg = isActive ? 'linear-gradient(135deg, rgba(124, 58, 237, 0.25), rgba(37, 99, 235, 0.2))' : 'transparent';
            const color = isActive ? '#38bdf8' : '#94a3b8';
            const border = isActive ? '1px solid rgba(56, 189, 248, 0.3)' : '1px solid transparent';
            const fontWeight = isActive ? '700' : '500';

            return `
                            <button class="admin-nav-item" data-menu="${item.id}" style="width: 100%; display: flex; align-items: center; justify-content: space-between; padding: 0.7rem 0.85rem; border-radius: 10px; background: ${bg}; color: ${color}; border: ${border}; font-weight: ${fontWeight}; font-size: 0.875rem; cursor: pointer; text-align: left; transition: 0.2s;">
                                <div style="display: flex; align-items: center; gap: 0.65rem;">
                                    <span style="font-size: 1.1rem;">${item.icon}</span>
                                    <span>${item.label}</span>
                                </div>
                                ${item.badge ? `<span style="padding: 0.15rem 0.45rem; border-radius: 4px; background: #7c3aed; color: #fff; font-size: 0.65rem; font-weight: 800;">${item.badge}</span>` : ''}
                            </button>
                        `;
        }).join('')}
                </nav>

                <div style="padding: 1rem 1.25rem; border-top: 1px solid rgba(255, 255, 255, 0.06); font-size: 0.75rem; color: #64748b;">
                    <div>👑 TopCare Admin Core</div>
                    <div style="margin-top: 0.25rem;">© 2026 All rights reserved.</div>
                </div>
            </aside>
        `;
    }
}