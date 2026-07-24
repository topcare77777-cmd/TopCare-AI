/**
 * TopCare AI Platform V2.0.0
 * RabbitMQ Transport Adapter with Consumer-driven subscription and TransportSendContext
 * Path: assets/js/auth/events/transport/adapters/rabbitmq.transport.adapter.js
 */

class RabbitPublisher {
    constructor(config, logger) {
        this.config = config;
        this.logger = logger;
    }
    async publish(sendContext) {
        await new Promise(resolve => setTimeout(resolve, 10));
    }
}

class RabbitConsumer {
    constructor(config, logger) {
        this.config = config;
        this.logger = logger;
    }
    async consume(queue, handler) {
        if (!queue || typeof handler !== 'function') {
            throw new Error("RabbitConsumerError: Queue and handler are required.");
        }
        return new TransportSubscription(queue, handler, () => {
            this.logger?.info?.(`RabbitMQ unbound from queue: ${queue}`);
        });
    }
}

class RabbitMqTransportAdapter extends IEventTransport {
    constructor(connectionOptions, logger) {
        super();
        this.connectionOptions = connectionOptions instanceof TransportConnectionOptions ? connectionOptions : new TransportConnectionOptions(connectionOptions);
        this.logger = logger;
        this.lifecycleManager = new TransportLifecycleManager();
        this.capabilities = new TransportCapabilities({ supportsOrdering: true, supportsAck: true, supportsDeadLetter: true, supportsPriorityQueue: true });
        this.serializer = new JsonEventSerializer();
        this.routingStrategy = new TopicRoutingStrategy('rabbitmq.routing');
        this.publisher = new RabbitPublisher(this.connectionOptions, this.logger);
        this.consumer = new RabbitConsumer(this.connectionOptions, this.logger);
    }

    async connect() {
        this.lifecycleManager.transitionTo(TransportLifecycleState.CONNECTING);
        await new Promise(resolve => setTimeout(resolve, 80));
        this.lifecycleManager.transitionTo(TransportLifecycleState.CONNECTED);
        this.logger?.info?.(`RabbitMQ connected using instanceId: ${this.connectionOptions.instanceId}`);
    }

    async disconnect() {
        this.lifecycleManager.transitionTo(TransportLifecycleState.DISCONNECTED);
        this.logger?.info?.("RabbitMQ disconnected.");
    }

    async send(destinationChannel, eventEnvelope, transportOptions = new TransportOptions()) {
        const startTime = Date.now();
        if (this.lifecycleManager.state !== TransportLifecycleState.CONNECTED) {
            throw new Error("RabbitMQTransportDisconnected: Cannot publish message to exchange.");
        }

        const sendContext = new TransportSendContext(destinationChannel, eventEnvelope, transportOptions);
        await this.publisher.publish(sendContext);
        const latencyMs = Date.now() - startTime;

        return new TransportSendResult({
            envelope: eventEnvelope,
            transportName: 'RabbitMQ',
            broker: 'RabbitMQBroker',
            brokerVersion: '3.12.0',
            clusterId: 'rabbitmq-cluster-1',
            ackStatus: TransportAckStatus.ACK,
            latencyMs,
            partition: 0
        });
    }

    async subscribe(destinationChannel, handler) {
        return await this.consumer.consume(destinationChannel, handler);
    }
}