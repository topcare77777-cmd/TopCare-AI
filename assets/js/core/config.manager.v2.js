/**
 * TopCare AI Platform V2.0.0
 * Config Manager V2
 * Path: assets/js/core/config.manager.v2.js
 */
const ConfigManagerV2 = {
    store: new Map(),
    set(key, val) { this.store.set(key, val); },
    get(key) { return this.store.get(key); }
};

export default ConfigManagerV2;