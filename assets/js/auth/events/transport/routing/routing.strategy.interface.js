/**
 * TopCare AI Platform V2.0.0
 * IRoutingStrategy Contract Interface for decoupled destination channel resolution
 * Path: assets/js/auth/events/transport/routing/routing.strategy.interface.js
 */

class IRoutingStrategy {
    resolveDestination(envelope, options = {}) { throw new Error("Not implemented"); }
}

class TopicRoutingStrategy extends IRoutingStrategy {
    constructor(defaultPrefix = 'events.topic') {
        super();
        this.defaultPrefix = defaultPrefix;
    }

    resolveDestination(envelope, options = {}) {
        const eventName = envelope.event.name.toLowerCase().replace(/_/g, '.');
        return `${this.defaultPrefix}.${eventName}`;
    }
}