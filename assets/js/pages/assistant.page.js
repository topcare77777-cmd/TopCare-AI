/**
 * TOPCARE AI PLATFORM V2 — ASSISTANT PAGE CONTROLLER
 * Path: assets/js/pages/assistant.page.js
 * Version: 130.1.0 (BUILD 130.1 — PAGE CONTROLLER)
 * Status: APPROVED & LOCKED
 * SRP: Renders Health Assistant Workspace View.
 */

import { ViewManager } from '../core/view-manager.js';
import { Core } from '../core/index.js';

export class AssistantPage {
    constructor(container) {
        this.container = container || ViewManager.getAppHost() || document.body;
        this.isMounted = false;
    }

    async mount() {
        this.render();
        this.isMounted = true;
        if (Core && Core.Logger) {
            Core.Logger.info('[AssistantPage] AI Assistant View mounted successfully.');
        }
    }

    render() {
        this.container.innerHTML = `
            <div class="tc-assistant-page-wrapper" style="max-width: 900px; margin: 40px auto; padding: 24px; color: #F8FAFC;">
                <div style="margin-bottom: 32px; text-align: center;">
                    <span style="font-size: 13px; font-weight: 600; color: #3B82F6; text-transform: uppercase; letter-spacing: 1px;">TopCare AI Workspace</span>
                    <h1 style="margin: 8px 0; font-size: 32px; color: #FFFFFF;">Asisten Kesehatan AI</h1>
                    <p style="color: #94A3B8; font-size: 16px;">Ruang interaksi cerdas untuk konsultasi awal dan analisis kondisi klinis mandiri.</p>
                </div>

                <div style="background: #1E293B; border: 1px solid #334155; border-radius: 16px; padding: 32px; text-align: center;">
                    <div style="font-size: 48px; margin-bottom: 16px;">🤖</div>
                    <h3 style="color: #FFFFFF; margin: 0 0 12px 0;">Asisten AI Siap Membantu Anda</h3>
                    <p style="color: #94A3B8; font-size: 14px; max-width: 500px; margin: 0 auto 24px auto; line-height: 1.6;">
                        Gunakan tombol di bawah untuk memulai sesi pendampingan atau evaluasi kesehatan bersama Coach AI.
                    </p>
                    <a href="#/coach-selection" style="display: inline-block; background: #3B82F6; color: white; padding: 12px 24px; border-radius: 8px; text-decoration: none; font-weight: 600; font-size: 14px;">
                        Pilih Coach AI Sekarang
                    </a>
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

export const assistantPage = new AssistantPage();
export default AssistantPage;