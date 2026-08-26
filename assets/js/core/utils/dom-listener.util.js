/**
 * TOPCARE AI PLATFORM V3 — SCOPED DOM LISTENER UTILITY
 * Path: assets/js/core/utils/dom-listener.util.js
 * Status: V3-FIX-06 LIFECYCLE CLEANUP CORE
 */

export class DOMListenerUtil {
    constructor() {
        this.listeners = [];
    }

    /**
     * Mendaftarkan event listener dan menyimpannya ke registry instance untuk lifecycle cleanup
     * @param {EventTarget} target - Element DOM, window, atau document
     * @param {string} event - Nama event (contoh: 'click', 'submit', 'tcr:platform-settings-updated')
     * @param {Function} handler - Callback fungsi (sync / async)
     * @param {Object|boolean} options - Event listener options (capture, passive, dll.)
     */
    add(target, event, handler, options = false) {
        if (!target || typeof target.addEventListener !== 'function' || typeof handler !== 'function') {
            return;
        }

        target.addEventListener(event, handler, options);
        this.listeners.push({ target, event, handler, options });
    }

    /**
     * Melepas seluruh listener yang terdaftar pada instance ini (Dipanggil di destroy())
     */
    cleanup() {
        while (this.listeners.length > 0) {
            const { target, event, handler, options } = this.listeners.pop();
            try {
                if (target && typeof target.removeEventListener === 'function') {
                    target.removeEventListener(event, handler, options);
                }
            } catch (err) {
                console.warn('[DOMListenerUtil] Error removing listener:', err);
            }
        }
    }

    /**
     * Mendapatkan jumlah listener aktif yang sedang dikelola (untuk assertion / testing)
     */
    get count() {
        return this.listeners.length;
    }
}

export default DOMListenerUtil;