/**
 * TopCare AI Platform V2.0.0
 * Abstract OutboxRepository Interface and MemoryOutboxRepository Implementation
 * Path: assets/js/auth/events/resilience/outbox.repository.js
 */

class IOutboxRepository {
    async save(sendContext) { throw new Error("Not implemented"); }
    async getPending(limit) { throw new Error("Not implemented"); }
    async markPublished(id) { throw new Error("Not implemented"); }
    async markFailed(id, error) { throw new Error("Not implemented"); }
}

class OutboxMessage {
    constructor(sendContext) {
        this.id = 'out-' + Math.random().toString(36).substring(2, 11);
        this.destinationChannel = sendContext.destinationChannel;
        this.envelope = sendContext.envelope;
        this.options = sendContext;
        this.status = 'PENDING';
        this.attempts = 0;
        this.lastError = null;
        this.createdAt = new Date().toISOString();
        if (typeof deepFreeze === 'function') deepFreeze(this);
    }
}

class MemoryOutboxRepository extends IOutboxRepository {
    constructor() {
        super();
        this.store = new Map();
    }

    async save(sendContext) {
        const msg = new OutboxMessage(sendContext);
        this.store.set(msg.id, msg);
        return msg.id;
    }

    async getPending(limit = 50) {
        const pending = [];
        for (const msg of this.store.values()) {
            if (msg.status === 'PENDING') {
                pending.push(msg);
                if (pending.length >= limit) break;
            }
        }
        return pending;
    }

    async markPublished(id) {
        const msg = this.store.get(id);
        if (msg) {
            const updated = Object.assign(Object.create(Object.getPrototypeOf(msg)), msg, { status: 'PUBLISHED' });
            this.store.set(id, updated);
        }
    }

    async markFailed(id, error) {
        const msg = this.store.get(id);
        if (msg) {
            const updated = Object.assign(Object.create(Object.getPrototypeOf(msg)), msg, {
                attempts: msg.attempts + 1,
                lastError: error?.message || String(error)
            });
            this.store.set(id, updated);
        }
    }
}