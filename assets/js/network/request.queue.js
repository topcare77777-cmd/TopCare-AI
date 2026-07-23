/**
 * TopCare AI Platform V2.0.0
 * Request Queue
 * Path: assets/js/core/request.queue.js
 */
import Logger from '../core/logger.js';

const RequestQueue = {
    queue: [],
    activeCount: 0,
    maxConcurrency: 3,

    add(task) {
        this.queue.push(task);
        this.process();
    },

    process() {
        if (this.activeCount >= this.maxConcurrency || this.queue.length === 0) return;
        const task = this.queue.shift();
        this.activeCount++;

        task().finally(() => {
            this.activeCount--;
            this.process();
        });
    }
};

export default RequestQueue;