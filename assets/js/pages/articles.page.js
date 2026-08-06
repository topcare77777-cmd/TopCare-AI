/**
 * TOPCARE AI PLATFORM V2 — ARTIKEL PAGE CONTROLLER
 /**
 * Path: assets/js/pages/articles.page.js
 */
 * Version: 130.1.0(BUILD 130.1 — PAGE CONTROLLER)
    * Status: APPROVED & LOCKED
        * SRP: Renders Articles & Knowledge Base Catalog Page.
 */

import { ViewManager } from '../core/view-manager.js';
import { Core } from '../core/index.js';

export class ArtikelPage {
    constructor(container) {
        this.container = container || ViewManager.getAppHost() || document.body;
        this.isMounted = false;
    }

    async mount() {
        this.render();
        this.isMounted = true;
        if (Core && Core.Logger) {
            Core.Logger.info('[ArtikelPage] Article Catalog View mounted successfully.');
        }
    }

    render() {
        this.container.innerHTML = `
            <div class="tc-artikel-page-wrapper" style="max-width: 1000px; margin: 40px auto; padding: 24px; color: #F8FAFC;">
                <div style="margin-bottom: 32px; text-align: center;">
                    <span style="font-size: 13px; font-weight: 600; color: #3B82F6; text-transform: uppercase; letter-spacing: 1px;">TopCare AI Knowledge Base</span>
                    <h1 style="margin: 8px 0; font-size: 32px; color: #FFFFFF;">Artikel & Edukasi Kesehatan AI</h1>
                    <p style="color: #94A3B8; font-size: 16px;">Wawasan ilmiah terpercaya seputar kesehatan emosional, psikologi, dan kecerdasan buatan.</p>
                </div>

                <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 24px;">
                    <div style="background: #1E293B; border: 1px solid #334155; border-radius: 12px; padding: 24px;">
                        <span style="font-size: 12px; color: #10B981; font-weight: 600;">PSIKOLOGI & EMPATI</span>
                        <h3 style="margin: 8px 0; font-size: 18px; color: white;">Memahami Peran AI Coach dalam Pendampingan Emosional</h3>
                        <p style="font-size: 14px; color: #94A3B8; line-height: 1.6;">Bagaimana pendekatan berbasis empati buatan membantu pengguna mengelola stres harian secara mandiri.</p>
                    </div>

                    <div style="background: #1E293B; border: 1px solid #334155; border-radius: 12px; padding: 24px;">
                        <span style="font-size: 12px; color: #3B82F6; font-weight: 600;">PERSONALITAS</span>
                        <h3 style="margin: 8px 0; font-size: 18px; color: white;">Mengenal 4 Temperamen Utama Manusia</h3>
                        <p style="font-size: 14px; color: #94A3B8; line-height: 1.6;">Eksplorasi mendalam tipe Sanguinis, Koleris, Melankolis, dan Plegmatis dalam tes kepribadian TopCare.</p>
                    </div>
                </div>
            </div>
        `;
    }

    destroy() {
        if (this.container) {
            this.container.innerHTML = '';
        }
        this.isMounted = false;
    }
}

export const artikelPage = new ArtikelPage();
export default ArtikelPage; s