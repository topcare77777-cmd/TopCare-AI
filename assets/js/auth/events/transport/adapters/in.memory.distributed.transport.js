/**
 * TopCare AI Platform V2.0.0
 * Hardened InMemoryDistributedTransport with corrected channel unsubscription cleanup
 * Path: assets/js/auth/events/transport/adapters/in.memory.distributed.transport.js
 */

class InMemoryDistributedTransport extends IEventTransport {
    constructor(logger, options = {}) {
        super();
        this.logger = logger;
        this.channels = new Map();
        this.lifecycleManager = new TransportLifecycleManager();
        this.capabilities = new TransportCapabilities(options.capabilities);
        this.serializer = options.serializer || new JsonEventSerializer();
        this.routingStrategy = options.routingStrategy || new TopicRoutingStrategy();
    }

    getState() {
        return this.lifecycleManager.state;
    }

    async connect() {
        this.lifecycleManager.transitionTo(TransportLifecycleState.CONNECTING);
        await new Promise(resolve => setTimeout(resolve, 50));
        this.lifecycleManager.transitionTo(TransportLifecycleState.CONNECTED);
        this.logger?.info?.("Distributed Transport connected successfully.");
    }

    async disconnect() {
        this.lifecycleManager.transitionTo(TransportLifecycleState.DISCONNECTED);
        this.channels.clear();
        this.logger?.info?.("Distributed Transport disconnected.");
    }

    async send(destinationChannel, eventEnvelope, transportOptions = new TransportOptions()) {
        if (this.lifecycleManager.state !== TransportLifecycleState.CONNECTED) {
            throw new Error(`TransportDisconnected: Cannot send event when state is ${this.lifecycleManager.state}.`);
        }
        if (!(eventEnvelope instanceof EventEnvelope)) {
            throw new Error("InvalidArgument: Transport send requires a valid EventEnvelope.");
        }

        const serializedPayload = this.serializer.serialize(eventEnvelope);
        const targetChannel = destinationChannel || this.routingStrategy.resolveDestination(eventEnvelope);

        const listeners = this.channels.get(targetChannel);
        if (listeners && listeners.size > 0) {
            const promises = Array.from(listeners).map(async listener => {
                try {
                    const deserializedEnvelope = this.serializer.deserialize(serializedPayload);
                    const ack = await listener(deserializedEnvelope, transportOptions);
                    return ack || TransportAcknowledgement.ack();
                } catch (e) {
                    this.logger?.error?.(`Transport error handling envelope on channel [${targetChannel}]:`, e);
                    return TransportAcknowledgement.nack(e.message);
                }
            });
            await Promise.all(promises);
        }
    }

    async subscribe(destinationChannel, handler) {
        if (!this.channels.has(destinationChannel)) {
            this.channels.set(destinationChannel, new Set());
        }
        this.channels.get(destinationChannel).add(handler);

        return {
            dispose: () => {
                const listeners = this.channels.get(destinationChannel);
                if (listeners) {
                    listeners.delete(handler);
                    if (listeners.size === 0) {
                        this.channels.delete(destinationChannel);
                    }
                }
            }
        };
    }
}