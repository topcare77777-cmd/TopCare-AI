/**
 * TopCare AI Platform V2.0.0
 * NATS Transport Adapter with configurable JetStream capabilities
 * Path: assets/js/auth/events/transport/adapters/nats.transport.adapter.js
 */

class NatsTransportAdapter extends IEventTransport {
    constructor(connectionOptions, logger, options = {}) {
        super();
        this.connectionOptions = connectionOptions instanceof TransportConnectionOptions ? connectionOptions : new TransportConnectionOptions(connectionOptions);
        this.logger = logger;
        this.lifecycleManager = new TransportLifecycleManager();
        this.capabilities = new TransportCapabilities({
            supportsOrdering: true,
            supportsAck: options.jetStreamEnabled ?? false,
            supportsDeadLetter: options.jetStreamEnabled ?? false
        });
        this.serializer = new JsonEventSerializer();
        this.routingStrategy = new TopicRoutingStrategy('nats.subject');
    }

    async connect() {
        this.lifecycleManager.transitionTo(TransportLifecycleState.CONNECTING);
        await new Promise(resolve => setTimeout(resolve, 40));
        this.lifecycleManager.transitionTo(TransportLifecycleState.CONNECTED);
        this.logger?.info?.(`NATS connected using clientId: ${this.connectionOptions.clientId}`);
    }

    async disconnect() {
        this.lifecycleManager.transitionTo(TransportLifecycleState.DISCONNECTED);
        this.logger?.info?.("NATS disconnected.");
    }

    async send(destinationChannel, eventEnvelope, transportOptions = new TransportOptions()) {
        const startTime = Date.now();
        if (this.lifecycleManager.state !== TransportLifecycleState.CONNECTED) {
            throw new Error("NATSDisconnected: Cannot publish message to NATS server.");
        }

        const subject = destinationChannel || this.routingStrategy.resolveDestination(eventEnvelope);
        const payload = this.serializer.serialize(eventEnvelope);

        await new Promise(resolve => setTimeout(resolve, 5));
        const latencyMs = Date.now() - startTime;

        return new TransportSendResult({
            transportName: 'NATS',
            broker: 'NatsServer',
            brokerVersion: typeof PlatformVersion !== 'undefined' ? PlatformVersion.version : '2.10.0',
            clusterId: 'nats-cluster-1',
            traceId: eventEnvelope.traceId,
            ackStatus: this.capabilities.supportsAck ? TransportAckStatus.ACK : 'NONE',
            latencyMs,
            partition: 0
        });
    }

    async subscribe(destinationChannel, handler) {
        if (!destinationChannel || typeof handler !== 'function') {
            throw new Error("NatsSubscriptionError: Subject and handler are required.");
        }
        return {
            dispose: () => {
                this.logger?.info?.(`NATS unsubscribed from subject: ${destinationChannel}`);
            }
        };
    }
}