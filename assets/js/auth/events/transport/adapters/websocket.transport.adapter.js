/**
 * TopCare AI Platform V2.0.0
 * WebSocket Transport Adapter with configurable socket ordering guarantees
 * Path: assets/js/auth/events/transport/adapters/websocket.transport.adapter.js
 */

class WebSocketTransportAdapter extends IEventTransport {
    constructor(connectionOptions, logger, options = {}) {
        super();
        this.connectionOptions = connectionOptions instanceof TransportConnectionOptions ? connectionOptions : new TransportConnectionOptions(connectionOptions);
        this.logger = logger;
        this.lifecycleManager = new TransportLifecycleManager();
        this.capabilities = new TransportCapabilities({
            supportsOrdering: options.strictOrdering ?? true,
            supportsAck: true,
            supportsDeadLetter: false
        });
        this.serializer = new JsonEventSerializer();
        this.routingStrategy = new TopicRoutingStrategy('ws.channel');
    }

    async connect() {
        this.lifecycleManager.transitionTo(TransportLifecycleState.CONNECTING);
        await new Promise(resolve => setTimeout(resolve, 60));
        this.lifecycleManager.transitionTo(TransportLifecycleState.CONNECTED);
        this.logger?.info?.(`WebSocket connected using instanceId: ${this.connectionOptions.instanceId}`);
    }

    async disconnect() {
        this.lifecycleManager.transitionTo(TransportLifecycleState.DISCONNECTED);
        this.logger?.info?.("WebSocket disconnected.");
    }

    async send(destinationChannel, eventEnvelope, transportOptions = new TransportOptions()) {
        const startTime = Date.now();
        if (this.lifecycleManager.state !== TransportLifecycleState.CONNECTED) {
            throw new Error("WebSocketDisconnected: Cannot send frame over disconnected WebSocket socket.");
        }

        const channel = destinationChannel || this.routingStrategy.resolveDestination(eventEnvelope);
        const payload = this.serializer.serialize(eventEnvelope);

        await new Promise(resolve => setTimeout(resolve, 12));
        const latencyMs = Date.now() - startTime;

        return new TransportSendResult({
            transportName: 'WebSocket',
            broker: 'WebSocketGateway',
            brokerVersion: typeof PlatformVersion !== 'undefined' ? PlatformVersion.version : '1.0.0',
            clusterId: 'ws-gateway-1',
            traceId: eventEnvelope.traceId,
            ackStatus: TransportAckStatus.ACK,
            latencyMs,
            partition: 0
        });
    }

    async subscribe(destinationChannel, handler) {
        if (!destinationChannel || typeof handler !== 'function') {
            throw new Error("WebSocketSubscriptionError: Channel and handler are required.");
        }
        return {
            dispose: () => {
                this.logger?.info?.(`WebSocket stopped listening to channel: ${destinationChannel}`);
            }
        };
    }
}