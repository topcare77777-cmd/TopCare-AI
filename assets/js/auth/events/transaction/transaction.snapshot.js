/**
 * TopCare AI Platform V2.0.0
 * Enriched Immutable TransactionSnapshot DTO with version, generation, and coordinator metadata
 * Path: assets/js/auth/events/transaction/transaction.snapshot.js
 */

class TransactionSnapshot {
    constructor(context, coordinatorId = 'coord-default') {
        this.transactionId = context.transactionId;
        this.state = context.state;
        this.version = context.version;
        this.generation = context.generation;
        this.coordinatorId = coordinatorId;
        this.traceId = context.traceId;
        this.spanId = context.spanId;
        this.correlationId = context.correlationId;
        this.createdAt = context.createdAt;
        this.lastUpdatedAt = context.lastUpdatedAt;
        this.expiresAt = context.expiresAt;
        this.participants = Array.from(context.participants.values()).map(p => ({
            id: p.id,
            service: p.service,
            state: p.state,
            vote: p.vote
        }));
        if (typeof deepFreeze === 'function') deepFreeze(this);
        else Object.freeze(this);
    }
}