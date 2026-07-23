/**
 * TopCare AI Platform V2.0.0
 * Health Check API
 * Path: assets/js/core/health.check.api.js
 */
const HealthCheckApi = {
    check() { return { status: 'HEALTHY', timestamp: Date.now() }; }
};

export default HealthCheckApi;