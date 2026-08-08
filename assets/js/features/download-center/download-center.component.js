/**
 * TOPCARE AI PLATFORM V2 — DOWNLOAD CENTER COMPONENT FACADE
 * Path: assets/js/features/download-center/download-center.component.js
 * Version: 135.7.0 (BUILD 135.7 — GOLDEN BASELINE FINALIZATION)
 * Status: APPROVED & LOCKED
 * SRP: Facade orchestrator safely resolving DI and isolated, idempotent DOM-based CSS insertion.
 */

import { DownloadCenterView } from './ui/download-center.view.js';
import { Core } from '../../core/index.js';

export class DownloadCenterComponent {
    constructor() {
        this._view = new DownloadCenterView({ logger: Core.Logger });
        this._isMounted = false;
        Object.seal(this);
    }

    async mount(container) {
        if (this._isMounted) return;
        if (!container) {
            throw new Error("[DownloadCenterComponent] Target container element is required for mounting.");
        }

        // Idempotent standard DOM insertion (guaranteed synchronization via browser rendering engine)
        if (!document.getElementById('tc-download-center-css')) {
            const link = document.createElement('link');
            link.id = 'tc-download-center-css';
            link.rel = 'stylesheet';
            link.href = 'assets/css/features/download-center.css';
            document.head.appendChild(link);
        }

        this._view.mount(container);
        this._isMounted = true;
    }

    destroy() {
        if (!this._isMounted) return;
        this._view.destroy();
        this._isMounted = false;
    }
}

export default DownloadCenterComponent;