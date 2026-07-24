/**
 * TopCare AI Platform V2.0.0
 * SessionTimer using recursive setTimeout to prevent overlap
 * Path: assets/js/auth/session/session.timer.js
 */

class SessionTimer {
    constructor(intervalMs, callback) {
        this.intervalMs = intervalMs;
        this.callback = callback;
        this.timeoutId = null;
        this.isRunning = false;
    }

    start() {
        if (this.isRunning) return;
        this.isRunning = true;
        this._schedule();
    }

    _schedule() {
        if (!this.isRunning) return;
        this.timeoutId = setTimeout(() => {
            if (this.callback) this.callback();
            if (this.isRunning) {
                this._schedule();
            }
        }, this.intervalMs);
    }

    stop() {
        this.isRunning = false;
        if (this.timeoutId) {
            clearTimeout(this.timeoutId);
            this.timeoutId = null;
        }
    }
}