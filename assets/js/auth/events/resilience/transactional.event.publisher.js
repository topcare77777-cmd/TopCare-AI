/**
 * TopCare AI Platform V2.0.0
 * Transactional Event Publisher linking application database operations with Outbox Repository
 * Path: assets/js/auth/events/resilience/transactional.event.publisher.js
 */

class TransactionalEventPublisher {
    constructor(outboxRepository, transport, metricsCollector = null) {
        this.outboxRepo = outboxRepository;
        this.transport = transport;
        this.metrics = metricsCollector;
    }

    async publishWithinTransaction(sendContext) {
        // Save to Outbox store within the transaction boundary
        const outboxId = await this.outboxRepo.save(sendContext);
        return outboxId;
    }

    async dispatchPendingOutboxMessages(limit = 20) {
        const pending = await this.outboxRepo.getPending(limit);
        for (const msg of pending) {
            try {
                const startTime = Date.now();
                const result = await this.transport.send(msg.destinationChannel, msg.envelope, msg.options);
                const latencyMs = Date.now() - startTime;
                
                await this.outboxRepo.markPublished(msg.id);
                this.metrics?.recordSend(latencyMs, true);
            } catch (error) {
                await this.outboxRepo.markFailed(msg.id, error);
                this.metrics?.recordRetry();
            }
        }
    }
}