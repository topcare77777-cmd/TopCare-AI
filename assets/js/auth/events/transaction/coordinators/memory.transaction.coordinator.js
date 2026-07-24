/**
 * TopCare AI Platform V2.0.0
 * Final Polish MemoryTransactionCoordinator utilizing explicit participant prepare execution
 * Path: assets/js/auth/events/transaction/coordinators/memory.transaction.coordinator.js
 */

class MemoryTransactionCoordinator extends ITransactionCoordinator {
    constructor(tokenGenerator = new CryptoTokenGenerator(), lockManager = null, clock = new SystemClock(), coordinatorId = 'coord-mem-1') {
        super();
        this.tokenGenerator = tokenGenerator;
        this.lockManager = lockManager;
        this.clock = clock;
        this.coordinatorId = coordinatorId;
        this.activeTransactions = new Map();
    }

    async beginTransaction(timeoutMs = 30000, telemetryContext = null) {
        const txContext = new TransactionContext(this.tokenGenerator, timeoutMs, telemetryContext, this.coordinatorId);
        this.activeTransactions.set(txContext.transactionId, txContext);
        return txContext;
    }

    async _checkExpiration(transactionContext) {
        if (transactionContext.isExpired(this.clock.now())) {
            await this.abort(transactionContext, 'Transaction timed out.');
            throw new TransactionException(`Transaction [${transactionContext.transactionId}] expired.`);
        }
    }

    async prepare(transactionContext) {
        await this._checkExpiration(transactionContext);
        if (transactionContext.state !== TransactionState.ACTIVE) {
            throw new TransactionException("Transaction must be ACTIVE to prepare.");
        }

        transactionContext.transitionTo(TransactionState.PREPARING);

        let quorumPassed = true;
        for (const participant of transactionContext.participants.values()) {
            const success = await participant.prepare(transactionContext);
            if (!success || participant.vote !== 'YES') {
                quorumPassed = false;
            }
        }

        if (quorumPassed) {
            transactionContext.transitionTo(TransactionState.PREPARED);
            return true;
        } else {
            await this.abort(transactionContext, 'Participant quorum vote failed.');
            return false;
        }
    }

    async commit(transactionContext) {
        await this._checkExpiration(transactionContext);
        if (transactionContext.state !== TransactionState.PREPARED) {
            throw new TransactionException("Transaction must be PREPARED to commit.");
        }

        transactionContext.transitionTo(TransactionState.COMMITTING);

        for (const participant of transactionContext.participants.values()) {
            participant.state = ParticipantState.COMMITTED;
        }

        transactionContext.transitionTo(TransactionState.COMMITTED);
        this.activeTransactions.delete(transactionContext.transactionId);
        return true;
    }

    async abort(transactionContext, reason = 'Explicit abort') {
        if ([TransactionState.COMMITTED, TransactionState.ABORTED].includes(transactionContext.state)) {
            return true;
        }

        try {
            transactionContext.transitionTo(TransactionState.ABORTING);
        } catch (e) {
            transactionContext.forceAbort();
        }

        for (const participant of transactionContext.participants.values()) {
            participant.state = ParticipantState.ABORTED;
            participant.setVote('NO');
        }

        transactionContext.forceAbort();
        this.activeTransactions.delete(transactionContext.transactionId);
        return true;
    }
}