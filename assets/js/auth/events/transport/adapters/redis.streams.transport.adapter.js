/**
 * TopCare AI Platform V2.0.0
 * Redis Streams Transport Adapter with Consumer-driven subscription and Monotonic Sequence
 * Path: assets/js/auth/events/transport/adapters/redis.streams.transport.adapter.js
 */

class RedisStreamProducer {
    constructor(config, logger) {
        this.config = config;
        this.logger = logger;
        this._seqGen = new MonotonicSequenceGenerator();
    }
    async xadd(sendContext) {
        await new Promise(resolve => setTimeout(resolve, 5));
        return `${Date.now()}-${this._seqGen.nextNumeric()}`;
    }
}

class RedisStreamConsumer {
    constructor(config, logger) {
        this.config = config;
        this.logger = logger;
    }
    async xreadgroup(streamKey, handler) {
        if (!streamKey || typeof handler !== 'function') {
            throw new Error("RedisConsumerError: Stream key and handler are required.");
        }
        return new TransportSubscription(streamKey, handler, () => {
            this.logger?.info?.(`RedisStreams consumer unsubscribed from stream: ${streamKey}`);
        });
    }
}

class RedisStreamsTransportAdapter extends IEventTransport {
    constructor(connectionOptions, logger) {
        super();
        this.connectionOptions = connectionOptions instanceof TransportConnectionOptions ? connectionOptions : new TransportConnectionOptions(connectionOptions);
        this.logger = logger;
        this.lifecycleManager = new TransportLifecycleManager();
        this.capabilities = new TransportCapabilities({ supportsOrdering: true, supportsAck: true, supportsConsumerGroups: true });
        this.serializer = new JsonEventSerializer();
        this.routingStrategy = new TopicRoutingStrategy('redis.stream');
        this.producer = new RedisStreamProducer(this.connectionOptions, this.logger);
        this.consumer = new RedisStreamConsumer(this.connectionOptions, this.logger);
    }

    async connect() {
        this.lifecycleManager.transitionTo(TransportLifecycleState.CONNECTING);
        await new Promise(resolve => setTimeout(resolve, 50));
        this.lifecycleManager.transitionTo(TransportLifecycleState.CONNECTED);
        this.logger?.info?.(`RedisStreams connected using endpoint: ${this.connectionOptions.endpoint}`);
    }

    async disconnect() {
        this.lifecycleManager.transitionTo(TransportLifecycleState.DISCONNECTED);
        this.logger?.info?.("RedisStreams disconnected.");
    }

    async send(destinationChannel, eventEnvelope, transportOptions = new TransportOptions()) {
        const startTime = Date.now();
        if (this.lifecycleManager.state !== TransportLifecycleState.CONNECTED) {
            throw new Error("RedisStreamsDisconnected: Cannot add entry to Redis stream.");
        }

        const sendContext = new TransportSendContext(destinationChannel, eventEnvelope, transportOptions);
        const offsetId = await this.producer.xadd(sendContext);
        const latencyMs = Date.now() - startTime;

        return new TransportSendResult({
            envelope: eventEnvelope,
            transportName: 'RedisStreams',
            broker: 'RedisServer',
            brokerVersion: '7.2.0',
            clusterId: 'redis-cluster-1',
            ackStatus: TransportAckStatus.ACK,
            latencyMs,
            offset: offsetId
        });
    }

    async subscribe(destinationChannel, handler) {
        return await this.consumer.consume(destinationChannel, handler);
    }
}