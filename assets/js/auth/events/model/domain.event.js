/**
 * TopCare AI Platform V2.0.0
 * Pure DomainEvent strictly containing business facts, aggregate ID, version, and payload
 * Path: assets/js/auth/events/model/domain.event.js
 */

class DomainEvent {
    constructor(name, payload, options = {}) {
        const idGen = options.idGenerator || new CryptoEventIdGenerator();
        this.id = options.id || idGen.generate();
        this.name = name;
        this.version = options.version || 1;
        this.aggregateId = options.aggregateId || null;
        this.causationId = options.causationId || null;
        this.schemaVersion = options.schemaVersion || "1.0.0";
        this.occurredAt = options.occurredAt || new Date().toISOString();
        this.payload = payload;

        if (typeof deepFreeze === 'function') {
            deepFreeze(this);
        } else {
            Object.freeze(this);
        }
    }
}