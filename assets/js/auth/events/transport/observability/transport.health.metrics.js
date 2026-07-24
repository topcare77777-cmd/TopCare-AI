/**
 * TopCare AI Platform V2.0.0
 * Kubernetes-Grade Health Condition with observedGeneration and lastProbeTime
 * Path: assets/js/auth/events/transport/observability/transport.health.metrics.js
 */

class TransportHealthCondition {
    constructor(type, status, reason, message, observedGeneration = 1) {
        this.type = type;
        this.status = status;
        this.reason = reason;
        this.message = message;
        this.observedGeneration = observedGeneration;
        this.lastProbeTime = new Date().toISOString();
        this.lastTransitionTime = new Date().toISOString();
        if (typeof deepFreeze === 'function') deepFreeze(this);
    }
}

class TransportHealth {
    constructor(transportName, lifecycleState, metricsCollector, generation = 1) {
        this.transportName = transportName;
        this.state = lifecycleState;
        this.metrics = metricsCollector.getSnapshot();
        
        const isConnected = lifecycleState === 'CONNECTED';
        const hasNoErrors = this.metrics.deadLetterCount === 0;

        this.conditions = [
            new TransportHealthCondition(
                'Ready',
                isConnected && hasNoErrors ? 'True' : 'False',
                isConnected ? 'Healthy' : 'BrokerUnavailable',
                isConnected ? 'Operational' : 'Disconnected',
                generation
            ),
            new TransportHealthCondition(
                'Liveness',
                isConnected ? 'True' : 'False',
                isConnected ? 'ActiveHeartbeat' : 'ConnectionLost',
                isConnected ? 'Active' : 'Inactive',
                generation
            )
        ];

        this.liveness = isConnected ? 'UP' : 'DOWN';
        this.readiness = isConnected && hasNoErrors ? 'READY' : 'NOT_READY';
        this.timestamp = new Date().toISOString();
        if (typeof deepFreeze === 'function') deepFreeze(this);
    }
}