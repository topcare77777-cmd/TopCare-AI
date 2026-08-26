/**
 * TOPCARE AI PLATFORM V3 — ADMIN SETTINGS VIEW
 * Path: assets/js/admin/modules/admin.settings.view.js
 */

import { SanitizerUtil } from '../../core/utils/sanitizer.util.js';

export class AdminSettingsView {
    static render(config = {}) {
        const safeVersion = SanitizerUtil.escapeHTML(config.app_version || 'v3.0.0');
        const safeEmail = SanitizerUtil.escapeHTML(config.contact_email || '');
        const safeWhatsapp = SanitizerUtil.escapeHTML(config.contact_whatsapp || '');
        const safeTiktok = SanitizerUtil.escapeHTML(config.tiktok_url || '');
        const safeInstagram = SanitizerUtil.escapeHTML(config.instagram_url || '');
        const safeYoutube = SanitizerUtil.escapeHTML(config.youtube_url || '');

        return `
            <form id="form-platform-settings" style="background: rgba(15, 23, 42, 0.8); border: 1px solid rgba(255, 255, 255, 0.08); border-radius: 16px; padding: 2rem;">
                <h3 style="font-size: 1.25rem; font-weight: 700; color: #38bdf8; margin-bottom: 0.5rem;">⚙️ Pengaturan Profil & Platform</h3>
                <p style="color: #94a3b8; font-size: 0.875rem; margin-bottom: 1.5rem;">Konfigurasi kontak resmi dan metadata global TopCare AI.</p>
                
                <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 1.5rem; margin-bottom: 2rem;">
                    <div>
                        <label style="display: block; font-size: 0.85rem; color: #94a3b8; margin-bottom: 0.5rem;">App Version</label>
                        <input type="text" id="setting-version" value="${safeVersion}" required style="width: 100%; padding: 0.75rem; background: rgba(30, 41, 59, 0.6); border: 1px solid rgba(255, 255, 255, 0.12); border-radius: 8px; color: #fff;" />
                    </div>
                    <div>
                        <label style="display: block; font-size: 0.85rem; color: #94a3b8; margin-bottom: 0.5rem;">Email Kontak Resmi</label>
                        <input type="email" id="setting-email" value="${safeEmail}" required style="width: 100%; padding: 0.75rem; background: rgba(30, 41, 59, 0.6); border: 1px solid rgba(255, 255, 255, 0.12); border-radius: 8px; color: #fff;" />
                    </div>
                    <div>
                        <label style="display: block; font-size: 0.85rem; color: #94a3b8; margin-bottom: 0.5rem;">WhatsApp / Hotline</label>
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
        `;
    }
}