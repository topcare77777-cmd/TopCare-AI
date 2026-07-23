/**
 * TopCare AI Platform V2.0.0
 * Config Engine (Enterprise Hardened)
 * Path: assets/js/core/config.engine.js
 */
const ConfigEngine = {
    env: 'production',
    version: '2.0.0',
    release: 'RC-3',
    buildNumber: '2026.0723.3',
    timestamp: '2026-07-23T02:00:52Z',
    debug: false,
    apiBase: '',
    features: {
        pwa: true,
        analytics: true,
        devTools: false,
        errorBoundary: true
    },
    get(key) {
        return key.split('.').reduce((o, i) => (o ? o[i] : undefined), this);
    }
};

export default ConfigEngine;