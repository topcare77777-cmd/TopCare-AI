/**
 * TopCare AI Platform V2.0.0
 * Service Provider
 * Path: assets/js/core/service.provider.js
 */
const ServiceProvider = {
    providers: [],
    register(provider) { this.providers.push(provider); },
    boot() { this.providers.forEach(p => p.boot && p.boot()); }
};

export default ServiceProvider;