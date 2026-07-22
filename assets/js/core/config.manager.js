/**
 * TopCare AI Platform V2.0.0
 * Configuration Manager
 * Path: assets/js/core/config.manager.js
 */
const ConfigManager = {
    config: {
        env: 'production',
        version: '2.0.0',
        features: { analytics: true, pwa: true }
    },

    get(key) {
        return key.split('.').reduce((o, i) => (o ? o[i] : undefined), this.config);
    },

    set(key, value) {
        this.config[key] = value;
    }
};

export default ConfigManager;