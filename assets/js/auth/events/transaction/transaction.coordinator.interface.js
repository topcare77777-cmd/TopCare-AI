/**
 * TopCare AI Platform V2.0.0
 * ITransactionCoordinator Contract Interface for Distributed Transaction Life-cycle Management
 * Path: assets/js/auth/events/transaction/transaction.coordinator.interface.js
 */

class ITransactionCoordinator {
    async beginTransaction(timeoutMs) { throw new Error("Not implemented"); }
    async prepare(transactionContext) { throw new Error("Not implemented"); }
    async commit(transactionContext) { throw new Error("Not implemented"); }
    async abort(transactionContext, reason) { throw new Error("Not implemented"); }
}

class TransactionException extends TransportException {
    constructor(message = 'Distributed transaction failed.') {
        super(message, 'DISTRIBUTED_TRANSACTION_ERROR');
    }
}