/**
 * TopCare AI Platform V2.0.0
 * Developer Tools Panel
 * Path: assets/js/core/devtools.js
 */
import ConfigEngine from './config.engine.js';

const DevTools = {
    init() {
        if (!ConfigEngine.debug) return;
        const panel = document.createElement('div');
        panel.id = 'topcare-devtools';
        panel.style.cssText = 'position:fixed;bottom:10px;left:10px;background:rgba(0,0,0,0.85);color:#06b6d4;padding:8px 12px;border-radius:6px;font-size:11px;z-index:999999;font-family:monospace;pointer-events:none;';
        panel.innerHTML = `TC-AI v${ConfigEngine.version} (${ConfigEngine.release}) [DEBUG]`;
        document.body.appendChild(panel);
    }
};

export default DevTools;