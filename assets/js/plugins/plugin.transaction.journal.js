/**
 * file: assets/js/plugins/plugin.transaction.journal.js
 */

import { Core } from '../core/index.js';

export const JOURNAL_STATES = Object.freeze({
    PREPARING: 'PREPARING',
    COMMITTED: 'COMMITTED',
    ROLLED_BACK: 'ROLLED_BACK',
    FAILED: 'FAILED'
});

export class PluginTransactionJournal {
    constructor(transactionId = `tx_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`) {
        this.transactionId = transactionId;
        this.state = JOURNAL_STATES.PREPARING;
        this.logs = [];
        this.createdAt = Core.Utils.now ? Core.Utils.now() : Date.now();
        Object.seal(this);
    }

    record(action, payload, undoPayload = null) {
        if (this.state !== JOURNAL_STATES.PREPARING) {
            throw new Error(`Cannot record journal entry; transaction ${this.transactionId} is already in state: ${this.state}`);
        }
        this.logs.push({
            action,
            payload,
            undoPayload,
            timestamp: Core.Utils.now ? Core.Utils.now() : Date.now()
        });
        Core.Logger.info(`[Tx:${this.transactionId}] Logged action: ${action}`);
    }

    commit() {
        this.state = JOURNAL_STATES.COMMITTED;
        Core.Logger.info(`[Tx:${this.transactionId}] Transaction COMMITTED successfully.`);
    }

    rollback() {
        this.state = JOURNAL_STATES.ROLLED_BACK;
        Core.Logger.warn(`[Tx:${this.transactionId}] Transaction ROLLED BACK.`);
    }

    getUndoActions() {
        // Return logs in reverse order for strict transactional undo replay
        return [...this.logs].reverse();
    }
}