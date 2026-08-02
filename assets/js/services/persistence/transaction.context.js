/**
 * TOPCARE AI PLATFORM V2 — ATOMIC TRANSACTION CONTEXT WITH PHYSICAL ROLLBACK
 * Path: assets/js/services/persistence/transaction.context.js
 * Status: ACTIVE (HARDENED - LOCKED GOLDEN BASELINE)
 */

import { TRANSACTION_STATES, createTransactionContextDTO } from '../../core/persistence/persistence.dto.js';
import IdProvider from '../../core/utils/id.provider.js';
import TimeProvider from '../../core/time/time.provider.js';

export class RepositoryTransactionContext {
    constructor(storageProvider) {
        this.provider = storageProvider;
        this.txId = IdProvider.nextId('tx_repo');
        this.stagedOperations = new Map(); // key -> dto
        this.originalSnapshots = new Map(); // key -> originalDto (For physical rollback)
        this.state = TRANSACTION_STATES.ACTIVE;
    }

    stageWrite(key, dtoValue) {
        if (this.state !== TRANSACTION_STATES.ACTIVE) {
            throw new Error(`[TransactionContext] Transaction ${this.txId} is no longer ACTIVE.`);
        }
        this.stagedOperations.set(key, dtoValue);
    }

    async commit() {
        if (this.state !== TRANSACTION_STATES.ACTIVE) return false;

        const writtenKeys = [];
        try {
            // 1. Capture physical original snapshots first
            for (const key of this.stagedOperations.keys()) {
                const oldVal = await this.provider.getItem(key);
                this.originalSnapshots.set(key, oldVal);
            }

            // 2. Perform atomic write loop
            for (const [key, dtoVal] of this.stagedOperations.entries()) {
                await this.provider.setItem(key, dtoVal);
                writtenKeys.push(key);
            }

            this.state = TRANSACTION_STATES.COMMITTED;
            return true;

        } catch (err) {
            // 3. True Physical Rollback if failure occurs mid-transaction
            for (const key of writtenKeys) {
                const oldVal = this.originalSnapshots.get(key);
                if (oldVal === null || oldVal === undefined) {
                    await this.provider.removeItem(key);
                } else {
                    await this.provider.setItem(key, oldVal);
                }
            }
            this.state = TRANSACTION_STATES.ROLLED_BACK;
            throw new Error(`[TransactionContext] Transaction commit failed. Physical storage rolled back cleanly: ${err.message}`);
        }
    }
}
