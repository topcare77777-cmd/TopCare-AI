/**
 * TOPCARE AI PLATFORM V2 — SYSTEM TIME PROVIDER
 * Path: assets/js/core/time/time.provider.js
 * Status: ACTIVE (BUILD AC-021 - LOCKED GOLDEN BASELINE)
 * Role: Single Source of Truth for Deterministic & Injectable System Time
 */

let customTimeSource = null;

export const TimeProvider = Object.freeze({
    setInjectableSource(timeFn) {
        customTimeSource = typeof timeFn === 'function' ? timeFn : null;
    },
    now() {
        return customTimeSource ? customTimeSource() : Date.now();
    },
    iso() {
        return new Date(this.now()).toISOString();
    },
    reset() {
        customTimeSource = null;
    }
});

export default TimeProvider;
