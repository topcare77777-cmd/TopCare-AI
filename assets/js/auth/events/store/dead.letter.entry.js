/**
 * TopCare AI Platform V2.0.0
 * Standardized DeadLetterEntry DTO structure for multi-backend DLQ persistence
 * Path: assets/js/auth/events/store/dead.letter.entry.js
 */

class DeadLetterEntry {
    constructor(envelope, error, attempts) {
        this.id = 'dlq-' + Math.random().toString(36).substring(2, 11);
        this.eventId = envelope.event.id;
        this.eventName = envelope.event.name;
        this.payload = envelope.event.payload;
        this.attempts = attempts;
        this.error = error?.message || String(error);
        this.createdAt = envelope.event.occurredAt;
        this.archivedAt = new Date().toISOString();

        if (typeof deepFreeze === 'function') {
            deepFreeze(this);
        } else {
            Object.freeze(this);
        }
    }
}