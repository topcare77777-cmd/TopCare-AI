/**
 * TopCare AI Platform V2.0.0
 * Inbox Pattern & Idempotency Store with TTL, Compaction, and Max Retention Cleanup
 * Path: assets/js/auth/events/resilience/inbox.repository.js
 */

class InboxRepository {
    constructor(options = {}) {
        this.ttlMs = options.ttlMs || 86400000; // 24 hours default TTL
        this.maxRetentionCount = options.maxRetentionCount || 10000;
        this.processedStore = new Map(); // eventId -> { processedAt, expiresAt, metadata }
    }

    async isProcessed(eventId) {
        const entry = this.processedStore.get(eventId);
        if (!entry) return false;

        if (Date.now() > entry.expiresAt) {
            this.processedStore.delete(eventId);
            return false;
        }
        return true;
    }

    async markProcessed(eventId, metadata = {}) {
        const now = Date.now();
        this.processedStore.set(eventId, {
            processedAt: now,
            expiresAt: now + this.ttlMs,
            metadata: Object.freeze(metadata)
        });

        this.compact();
    }

    compact() {
        const now = Date.now();
        // 1. Remove expired entries
        for (const [id, entry] of this.processedStore.entries()) {
            if (now > entry.expiresAt) {
                this.processedStore.delete(id);
            }
        }

        // 2. Enforce max retention count compaction (LRU style drop oldest)
        if (this.processedStore.size > this.maxRetentionCount) {
            const sortedEntries = Array.from(this.processedStore.entries()).sort((a, b) => a[1].processedAt - b[1].processedAt);
            const overflowCount = this.processedStore.size - this.maxRetentionCount;
            for (let i = 0; i < overflowCount; i++) {
                this.processedStore.delete(sortedEntries[i][0]);
            }
        }
    }

    async clear() {
        this.processedStore.clear();
    }
}