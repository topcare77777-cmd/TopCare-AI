/**
 * TopCare AI Platform V2.0.0
 * Parallel Async Health Check & Diagnostics conforming to Startup, Liveness, and Readiness endpoints
 * Path: assets/js/auth/diagnostics/health.check.js
 */

class HealthCheckDiagnostics {
    static async run(container) {
        const startTime = Date.now();

        const checkStorage = async () => {
            const s = Date.now();
            try {
                const storage = container.resolve(TOKENS.Storage);
                storage.setItem("health_probe", "ok");
                const probe = storage.getItem("health_probe");
                storage.removeItem("health_probe");
                const passed = probe === "ok";
                return {
                    name: "Storage",
                    status: passed ? "PASS" : "FAIL",
                    duration: `${Date.now() - s}ms`,
                    severity: "CRITICAL",
                    error: passed ? null : "Probe verification failed",
                    timestamp: new Date().toISOString()
                };
            } catch (e) {
                return {
                    name: "Storage",
                    status: "FAIL",
                    duration: `${Date.now() - s}ms`,
                    severity: "CRITICAL",
                    error: e.message,
                    timestamp: new Date().toISOString()
                };
            }
        };

        const checkProvider = async () => {
            const s = Date.now();
            try {
                const provider = container.resolve(TOKENS.Provider);
                const passed = Boolean(provider);
                return {
                    name: "Provider",
                    status: passed ? "PASS" : "FAIL",
                    duration: `${Date.now() - s}ms`,
                    severity: "HIGH",
                    error: passed ? null : "Provider instance missing",
                    timestamp: new Date().toISOString()
                };
            } catch (e) {
                return {
                    name: "Provider",
                    status: "FAIL",
                    duration: `${Date.now() - s}ms`,
                    severity: "HIGH",
                    error: e.message,
                    timestamp: new Date().toISOString()
                };
            }
        };

        const checkSession = async () => {
            const s = Date.now();
            try {
                const sessionManager = container.resolve(TOKENS.SessionManager);
                const passed = Boolean(sessionManager);
                return {
                    name: "SessionManager",
                    status: passed ? "PASS" : "FAIL",
                    duration: `${Date.now() - s}ms`,
                    severity: "HIGH",
                    error: passed ? null : "SessionManager instance missing",
                    timestamp: new Date().toISOString()
                };
            } catch (e) {
                return {
                    name: "SessionManager",
                    status: "FAIL",
                    duration: `${Date.now() - s}ms`,
                    severity: "HIGH",
                    error: e.message,
                    timestamp: new Date().toISOString()
                };
            }
        };

        const checks = await Promise.all([checkStorage(), checkProvider(), checkSession()]);
        const isHealthy = checks.every(c => c.status === "PASS");

        return {
            status: isHealthy ? "Healthy" : "Unhealthy",
            startup: "READY",
            liveness: isHealthy ? "ALIVE" : "DEGRADED",
            readiness: isHealthy ? "READY" : "NOT_READY",
            totalDuration: `${Date.now() - startTime}ms`,
            checks
        };
    }
}