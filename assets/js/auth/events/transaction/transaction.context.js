/**
 * TopCare AI Platform V2.0.0
 * Hardened TransactionContext with strict encapsulated state transitions and crypto IDs
 * Path: assets/js/auth/events/transaction/transaction.context.js
 */

const TransactionState = Object.freeze({
    ACTIVE: 'ACTIVE',
    PREPARING: 'PREPARING',
    PREPARED: 'PREPARED',
    COMMITTING: 'COMMITTING',
    COMMITTED: 'COMMITTED',
    ABORTING: 'ABORTING',
    ABORTED: 'ABORTED'
});

const ALLOWED_TRANSITIONS = Object.freeze({
    [TransactionState.ACTIVE]: [TransactionState.PREPARING, TransactionState.ABORTING, TransactionState.ABORTED],
    [TransactionState.PREPARING]: [TransactionState.PREPARED, TransactionState.ABORTING, TransactionState.ABORTED],
    [TransactionState.PREPARED]: [TransactionState.COMMITTING, TransactionState.ABORTING, TransactionState.ABORTED],
    [TransactionState.COMMITTING]: [TransactionState.COMMITTED, TransactionState.ABORTING],
    [TransactionState.COMMITTED]: [],
    [TransactionState.ABORTING]: [TransactionState.ABORTED],
    [TransactionState.ABORTED]: []
});

class TransactionContext {
    constructor(tokenGenerator = new CryptoTokenGenerator(), timeoutMs = 30000, telemetryContext = null, coordinatorId = 'coord-default') {
        this.tokenGenerator = tokenGenerator;
        this.transactionId = tokenGenerator.generateToken('tx');
        this._state = TransactionState.ACTIVE;
        this.version = 1;
        this.generation = 1;
        this.coordinatorId = coordinatorId;
        this.participants = new Map();
        this.fencingTokens = new Map();
        
        this.traceId = telemetryContext?.traceId || null;
        this.spanId = telemetryContext?.spanId || null;
        this.correlationId = telemetryContext?.correlationId || null;

        this.createdAt = Date.now();
        this.lastUpdatedAt = this.createdAt;
        this.expiresAt = this.createdAt + timeoutMs;
    }

    get state() {
        return this._state;
    }

    transitionTo(newState) {
        const allowed = ALLOWED_TRANSITIONS[this._state];
        if (!allowed || !allowed.includes(newState)) {
            throw new TransactionException(`Invalid transition from [${this._state}] to [${newState}].`);
        }
        this._state = newState;
        this.version++;
        this.lastUpdatedAt = Date.now();
    }

    forceAbort() {
        if (![TransactionState.COMMITTED, TransactionState.ABORTED].includes(this._state)) {
            this._state = TransactionState.ABORTING;
            this._state = TransactionState.ABORTED;
            this.version++;
            this.lastUpdatedAt = Date.now();
        }
    }

    isExpired(currentTimestamp = Date.now()) {
        return currentTimestamp > this.expiresAt;
    }

    addParticipant(serviceName, timeoutMs = 15000) {
        if (this._state !== TransactionState.ACTIVE) {
            throw new TransactionException("Cannot add participant after transaction leaves ACTIVE state.");
        }
        const participant = new TransactionParticipant(serviceName, this.tokenGenerator, timeoutMs);
        this.participants.set(participant.id, participant);
        this.version++;
        return participant;
    }

    registerFencingToken(resourceKey, token) {
        this.fencingTokens.set(resourceKey, token);
    }

    toSnapshot() {
        return new TransactionSnapshot(this, this.coordinatorId);
    }
}