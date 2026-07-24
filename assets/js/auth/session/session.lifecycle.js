/**
 * TopCare AI Platform V2.0.0
 * SessionLifecycle handling browser visibility changes
 * Path: assets/js/auth/session/session.lifecycle.js
 */

class SessionLifecycle {
    constructor(onVisibleCallback) {
        this.onVisibleCallback = onVisibleCallback;
        this._boundHandler = null;
    }

    init() {
        if (typeof document === 'undefined') return;
        this._boundHandler = () => {
            if (!document.hidden && this.onVisibleCallback) {
                this.onVisibleCallback();
            }
        };
        document.addEventListener("visibilitychange", this._boundHandler);
    }

    destroy() {
        if (typeof document === 'undefined' || !this._boundHandler) return;
        document.removeEventListener("visibilitychange", this._boundHandler);
        this._boundHandler = null;
    }
}