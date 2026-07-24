/**
 * TopCare AI Platform V2.0.0
 * Hardened TransactionParticipant using ITokenGenerator for cryptographic IDs and explicit prepare method
 * Path: assets/js/auth/events/transaction/transaction.participant.js
 */

const ParticipantState = Object.freeze({
    REGISTERED: 'REGISTERED',
    PREPARING: 'PREPARING',
    PREPARED: 'PREPARED',
    COMMITTING: 'COMMITTING',
    COMMITTED: 'COMMITTED',
    ABORTING: 'ABORTING',
    ABORTED: 'ABORTED'
});

class TransactionParticipant {
    constructor(serviceName, tokenGenerator = new CryptoTokenGenerator(), timeoutMs = 15000) {
        this.id = tokenGenerator.generateToken('part');
        this.service = serviceName;
        this.state = ParticipantState.REGISTERED;
        this.vote = 'PENDING'; // PENDING, YES, NO
        this.timeoutMs = timeoutMs;
        this.deadline = Date.now() + timeoutMs;
        this.metadata = Object.freeze({});
    }

    setVote(vote) {
        if (!['PENDING', 'YES', 'NO'].includes(vote)) {
            throw new ValidationException(`Invalid participant vote: '${vote}'.`);
        }
        this.vote = vote;
    }

    async prepare(transactionContext) {
        this.state = ParticipantState.PREPARING;
        // Simulate remote participant voting logic
        await new Promise(resolve => setTimeout(resolve, 10));
        this.setVote('YES');
        this.state = ParticipantState.PREPARED;
        return this.vote === 'YES';
    }
}