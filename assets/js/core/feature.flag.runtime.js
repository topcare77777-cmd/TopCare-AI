/**
 * TopCare AI Platform V2.0.0
 * Feature Flag Runtime
 * Path: assets/js/core/feature.flag.runtime.js
 */
const FeatureFlagRuntime = {
    flags: new Map(),
    isEnabled(key) { return !!this.flags.get(key); },
    set(key, val) { this.flags.set(key, val); }
};

export default FeatureFlagRuntime;