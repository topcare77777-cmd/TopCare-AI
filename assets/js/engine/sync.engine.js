/**
 * TopCare AI Platform V2.0.0
 * Sync Engine
 * Path: assets/js/core/sync.engine.js
 */
import Logger from '../core/logger.js';
import StorageEngine from './storage.engine.js';

const SyncEngine = {
    queue: [],

    init() {
        this.queue = StorageEngine.get('sync_queue') || [];
    },

    enqueue(action) {
        this.queue.push(action);
        StorageEngine.set('sync_queue', this.queue);
        Logger.info("[SyncEngine] Action enqueued for sync.");
    },

    async sync() {
        if (!navigator.onLine || this.queue.length === 0) return;
        Logger.info("[SyncEngine] Processing offline sync queue...");
        this.queue = [];
        StorageEngine.remove('sync_queue');
    }
};

export default SyncEngine;