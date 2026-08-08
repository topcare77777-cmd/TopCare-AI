/**
 * TOPCARE AI PLATFORM V2 — BODY LOCK MANAGER
 * Path: assets/js/features/download-center/utils/body-lock.manager.js
 * Version: 135.7.2 (BUILD 135.7 — ENTERPRISE RELEASE CANDIDATE)
 * Status: APPROVED RELEASE CANDIDATE (PENDING INTEGRATION SUITE)
 * SRP: Pure ES Module Singleton managing document body scroll locks without global window state pollution.
 */

// Encapsulated Module-Scoped State (Instantiated once per realm by ECMAScript spec)
let _lockCount = 0;
let _prevInlineOverflow = '';
let _isPageHideRegistered = false;

class BodyLockManagerEngine {
    constructor() {
        this._registerFailSafe();
        Object.seal(this);
    }

    _registerFailSafe() {
        if (!_isPageHideRegistered && typeof window !== 'undefined') {
            _isPageHideRegistered = true;
            window.addEventListener('pagehide', () => {
                this.forceReleaseAll();
            }, { once: true });
        }
    }

    acquire() {
        _lockCount++;

        if (_lockCount === 1 && typeof document !== 'undefined') {
            // Explicit Contract: Preserve exact inline style override before locking.
            // If empty string, it will naturally fall back to cascade stylesheet rule upon release.
            _prevInlineOverflow = document.body.style.overflow;
            document.body.style.overflow = 'hidden';
        }
    }

    release() {
        _lockCount = Math.max(0, _lockCount - 1);

        if (_lockCount === 0 && typeof document !== 'undefined') {
            // Restore exact inline overflow state
            document.body.style.overflow = _prevInlineOverflow;
            _prevInlineOverflow = '';
        }
    }

    forceReleaseAll() {
        if (_lockCount > 0 && typeof document !== 'undefined') {
            document.body.style.overflow = _prevInlineOverflow;
        }
        _lockCount = 0;
        _prevInlineOverflow = '';
    }
}

export const BodyLockManager = new BodyLockManagerEngine();
export default BodyLockManager;