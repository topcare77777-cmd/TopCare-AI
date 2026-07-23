/**
 * TopCare AI Platform V2.0.0
 * Environment Manager
 * Path: assets/js/core/environment.manager.js
 */
const EnvironmentManager = {
    current: 'production',

    isDevelopment() { return this.current === 'development'; },
    isTesting() { return this.current === 'testing'; },
    isProduction() { return this.current === 'production'; },

    set(env) {
        this.current = env;
    }
};

export default EnvironmentManager;