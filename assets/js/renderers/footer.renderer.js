/**
 * TOPCARE AI PLATFORM V3 — GLOBAL FOOTER RENDERER
 * Path: assets/js/renderers/footer.renderer.js
 * Status: V3-FIX-03 SECURED URL & DYNAMIC SETTINGS
 */

import { PlatformService } from '../core/services/platform.service.js';
import { SanitizerUtil } from '../core/utils/sanitizer.util.js';
import { UrlUtil } from '../core/utils/url.util.js';

export class FooterRenderer {
    /**
     * Render string HTML footer publik dengan URL validated & safe content
     */
    static async render() {
        const config = await PlatformService.getPlatformConfig();

        const safeVersion = SanitizerUtil.escapeHTML(config.app_version || 'v3.0.0');
        const safeEmailText = SanitizerUtil.escapeHTML(config.contact_email || 'support@topcareai.com');

        // Strict URL Validation
        const mailtoHref = UrlUtil.sanitizeMailto(config.contact_email, '#');
        const whatsappHref = UrlUtil.formatWhatsAppUrl(config.contact_whatsapp);
        const instagramHref = UrlUtil.sanitizeWebUrl(config.instagram_url, '#');
        const tiktokHref = UrlUtil.sanitizeWebUrl(config.tiktok_url, '#');
        const youtubeHref = UrlUtil.sanitizeWebUrl(config.youtube_url, '#');

        return `
            <footer style="background: #090d16; border-top: 1px solid rgba(255, 255, 255, 0.08); padding: 4rem 1.5rem 2rem; color: #94a3b8; font-size: 0.9rem;">
                <div style="max-width: 1200px; margin: 0 auto; display: grid; grid-template-columns: repeat(auto-fit, minmax(220px, 1fr)); gap: 2.5rem; margin-bottom: 3rem;">
                    
                    <!-- Kolom 1: Brand & Bio -->
                    <div>
                        <div style="display: flex; align-items: center; gap: 0.5rem; margin-bottom: 1rem;">
                            <span style="font-size: 1.3rem; font-weight: 800; color: #fff; letter-spacing: -0.5px;">✨ TopCare <span style="color: #38bdf8;">AI</span></span>
                            <span style="padding: 0.15rem 0.5rem; border-radius: 4px; background: rgba(56, 189, 248, 0.15); color: #38bdf8; font-size: 0.75rem; font-weight: 700;">${safeVersion}</span>
                        </div>
                        <p style="line-height: 1.6; margin-bottom: 1.5rem; color: #64748b;">
                            Platform AI untuk belajar, berkembang, mengenal potensi diri, dan membangun ekosistem masa depan.
                        </p>
                        
                        <!-- Sosmed Icons Dinamis Validated -->
                        <div style="display: flex; gap: 0.75rem; align-items: center;">
                            <a href="${instagramHref}" target="_blank" rel="noopener noreferrer" title="Instagram" style="width: 36px; height: 36px; border-radius: 8px; background: rgba(255,255,255,0.05); display: flex; align-items: center; justify-content: center; color: #cbd5e1; text-decoration: none;">
                                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/></svg>
                            </a>
                            <a href="${tiktokHref}" target="_blank" rel="noopener noreferrer" title="TikTok" style="width: 36px; height: 36px; border-radius: 8px; background: rgba(255,255,255,0.05); display: flex; align-items: center; justify-content: center; color: #cbd5e1; text-decoration: none;">
                                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5"/></svg>
                            </a>
                            <a href="${youtubeHref}" target="_blank" rel="noopener noreferrer" title="YouTube" style="width: 36px; height: 36px; border-radius: 8px; background: rgba(255,255,255,0.05); display: flex; align-items: center; justify-content: center; color: #cbd5e1; text-decoration: none;">
                                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M2.5 17a24.12 24.12 0 0 1 0-10 2 2 0 0 1 1.4-1.4 49.56 49.56 0 0 1 16.2 0A2 2 0 0 1 21.5 7a24.12 24.12 0 0 1 0 10 2 2 0 0 1-1.4 1.4 49.55 49.55 0 0 1-16.2 0A2 2 0 0 1 2.5 17"/><polygon points="10 15 15 12 10 9 10 15"/></svg>
                            </a>
                            <a href="${whatsappHref}" target="_blank" rel="noopener noreferrer" title="WhatsApp" style="width: 36px; height: 36px; border-radius: 8px; background: rgba(255,255,255,0.05); display: flex; align-items: center; justify-content: center; color: #cbd5e1; text-decoration: none;">
                                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
                            </a>
                        </div>
                    </div>

                    <!-- Kolom 2: Platform -->
                    <div>
                        <h4 style="color: #fff; font-size: 0.95rem; font-weight: 600; margin-bottom: 1.25rem;">Platform</h4>
                        <ul style="list-style: none; padding: 0; margin: 0; display: flex; flex-direction: column; gap: 0.75rem;">
                            <li><a href="#/learning" style="color: #94a3b8; text-decoration: none;">Belajar AI</a></li>
                            <li><a href="#/personality" style="color: #94a3b8; text-decoration: none;">Personality Test</a></li>
                            <li><a href="#/creator" style="color: #94a3b8; text-decoration: none;">Creator Hub</a></li>
                            <li><a href="#/marketplace" style="color: #94a3b8; text-decoration: none;">Prompt Marketplace</a></li>
                        </ul>
                    </div>

                    <!-- Kolom 3: Perusahaan -->
                    <div>
                        <h4 style="color: #fff; font-size: 0.95rem; font-weight: 600; margin-bottom: 1.25rem;">Perusahaan</h4>
                        <ul style="list-style: none; padding: 0; margin: 0; display: flex; flex-direction: column; gap: 0.75rem;">
                            <li><a href="#/about" style="color: #94a3b8; text-decoration: none;">Tentang Kami</a></li>
                            <li><a href="#/community" style="color: #94a3b8; text-decoration: none;">Komunitas Global</a></li>
                            <li><a href="#/premium" style="color: #94a3b8; text-decoration: none;">Langganan Premium</a></li>
                            <li><a href="${mailtoHref}" style="color: #38bdf8; text-decoration: none;">${safeEmailText}</a></li>
                        </ul>
                    </div>

                    <!-- Kolom 4: Hotline Bantuan -->
                    <div>
                        <h4 style="color: #fff; font-size: 0.95rem; font-weight: 600; margin-bottom: 1.25rem;">Hotline Bantuan</h4>
                        <p style="color: #64748b; line-height: 1.5; margin-bottom: 1rem;">Butuh asistensi cepat atau penawaran kemitraan?</p>
                        <a href="${whatsappHref}" target="_blank" rel="noopener noreferrer" style="display: inline-block; padding: 0.6rem 1.2rem; background: rgba(37, 99, 235, 0.2); border: 1px solid rgba(37, 99, 235, 0.4); color: #38bdf8; border-radius: 8px; font-weight: 600; text-decoration: none;">
                            Chat WhatsApp →
                        </a>
                    </div>
                </div>

                <!-- Bottom Legal Bar -->
                <div style="max-width: 1200px; margin: 0 auto; border-top: 1px solid rgba(255, 255, 255, 0.05); padding-top: 2rem; display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 1rem; color: #64748b; font-size: 0.8rem;">
                    <div>© 2026 TopCare AI Platform. All rights reserved.</div>
                    <div style="display: flex; gap: 1.5rem;">
                        <a href="#/privacy" style="color: #94a3b8; text-decoration: none;">Kebijakan Privasi</a>
                        <a href="#/terms" style="color: #94a3b8; text-decoration: none;">Syarat & Ketentuan</a>
                    </div>
                </div>
            </footer>
        `;
    }
}

export default FooterRenderer;