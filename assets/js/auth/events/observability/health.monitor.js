/**
 * TopCare AI Platform V2.0.0
 * Enterprise Health Monitor supporting Kubernetes Liveness, Readiness, and Startup probes
 * Path: assets/js/auth/events/observability/health.monitor.js
 */

class HealthMonitor {
    constructor(eventBus, container) {
        this.eventBus = eventBus;
        this.container = container;
        this.startTime = Date.now();
    }

    async checkLiveness() {
        const startTime = Date.now();
        let isHealthy = true;
        try {
            if (this.container && this.container.lifecycle && this.container.lifecycle.disposed) {
                isHealthy = false;
            }
        } catch (e) {
            isHealthy = false;
        }

        return Object.freeze({
            status: isHealthy ? 'UP' : 'DOWN',
            probe: 'liveness',
            timestamp: new Date().toISOString(),
            durationMs: Date.now() - startTime
        });
    }

    async checkReadiness() {
        const startTime = Date.now();
        const checks = {
            dependencyContainer: { status: 'UP' },
            eventBus: { status: 'UP' },
            deadLetterQueue: { status: 'HEALTHY', count: 0 }
        };
        let isReady = true;

        try {
            if (!this.container || (this.container.lifecycle && this.container.lifecycle.disposed)) {
                checks.dependencyContainer.status = 'DOWN';
                isReady = false;
            }
        } catch (e) {
            checks.dependencyContainer.status = 'ERROR';
            isReady = false;
        }

        try {
            if (this.eventBus && typeof this.eventBus.getDeadLetterQueue === 'function') {
                const dlq = await this.eventBus.getDeadLetterQueue();
                checks.deadLetterQueue.count = dlq.length;
                if (dlq.length > 100) {
                    checks.deadLetterQueue.status = 'DEGRADED';
                }
            }
        } catch (e) {
            checks.eventBus.status = 'ERROR';
            isReady = false;
        }

        return Object.freeze({
            status: isReady ? 'READY' : 'NOT_READY',
            probe: 'readiness',
            timestamp: new Date().toISOString(),
            durationMs: Date.now() - startTime,
            checks
        });
    }

    async checkStartup() {
        const startTime = Date.now();
        return Object.freeze({
            status: 'STARTED',
            probe: 'startup',
            timestamp: new Date().toISOString(),
            durationMs: Date.now() - startTime,
            uptimeMs: Date.now() - this.startTime,
            version: '2.0.0',
            build: 'BUILD 103 Phase 2'
        });
    }
}