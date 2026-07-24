/**
 * TopCare AI Platform V2.0.0
 * IEventTransport Contract Interface for Distributed Event Brokers (Kafka, RabbitMQ, Redis, WebSocket)
 * Path: assets/js/auth/events/transport/event.transport.interface.js
 */

class IEventTransport {
    async connect() { throw new Error("Not implemented"); }
    async disconnect() { throw new Error("Not implemented"); }
    async send(destinationChannel, eventEnvelope) { throw new Error("Not implemented"); }
    async subscribe(destinationChannel, handler) { throw new Error("Not implemented"); }
}