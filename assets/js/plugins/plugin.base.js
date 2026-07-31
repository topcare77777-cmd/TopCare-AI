/**
 * file: assets/js/plugins/plugin.base.js (AsyncMutex excerpt with strict FIFO & thread-safe re-check)
 */

export class AsyncMutex {
    constructor() {
        this._queue = [];
        this._locked = false;
        this._closed = false;
        this._activeTicket = null;
        Object.seal(this);
    }

    async acquire(options = {}) {
        if (this._closed) {
            throw new Error("AsyncMutex is closed. Acquisition rejected.");
        }

        const timeoutMs = options.timeoutMs !== undefined ? options.timeoutMs : 10000;
        const signal = options.signal;

        if (signal && signal.aborted) {
            throw new Error("AsyncMutex acquisition aborted.");
        }

        return new Promise((resolve, reject) => {
            // Strict thread-safe re-check before enqueueing
            if (this._closed) {
                return reject(new Error("AsyncMutex is closed during enqueue."));
            }

            const abortController = new AbortController();
            const ticket = { resolve, reject, timer: null, abortHandler: null, abortController };

            const cleanup = () => {
                if (ticket.timer) clearTimeout(ticket.timer);
                if (signal && ticket.abortHandler) {
                    signal.removeEventListener('abort', ticket.abortHandler);
                }
            };

            if (signal) {
                ticket.abortHandler = () => {
                    const idx = this._queue.indexOf(ticket);
                    if (idx !== -1) {
                        this._queue.splice(idx, 1);
                        cleanup();
                        reject(new Error("AsyncMutex acquisition aborted."));
                    }
                };
                signal.addEventListener('abort', ticket.abortHandler);
            }

            if (timeoutMs > 0) {
                ticket.timer = setTimeout(() => {
                    const idx = this._queue.indexOf(ticket);
                    if (idx !== -1) {
                        this._queue.splice(idx, 1);
                        cleanup();
                        reject(new Error("AsyncMutex acquisition timed out."));
                    }
                }, timeoutMs);
            }

            this._queue.push(ticket);
            this._dispatch();
        });
    }

    async runExclusive(taskFn, options = {}) {
        const { release, signal } = await this.acquire(options);
        try {
            return await taskFn(signal);
        } finally {
            release();
        }
    }

    cancelAll(reason = "Mutex closed and queue cancelled.") {
        this._closed = true;
        while (this._queue.length > 0) {
            const ticket = this._queue.shift();
            if (ticket.timer) clearTimeout(ticket.timer);
            ticket.reject(new Error(reason));
        }
        if (this._activeTicket && this._activeTicket.abortController) {
            this._activeTicket.abortController.abort(new Error(reason));
        }
    }

    _dispatch() {
        if (this._locked || this._closed || this._queue.length === 0) return;
        this._locked = true;
        const ticket = this._queue.shift();

        if (ticket.timer) clearTimeout(ticket.timer);
        if (ticket.signal && ticket.abortHandler) {
            ticket.signal.removeEventListener('abort', ticket.abortHandler);
        }

        this._activeTicket = ticket;

        let released = false;
        const release = () => {
            if (released) return;
            released = true;
            this._locked = false;
            this._activeTicket = null;
            this._dispatch();
        };

        ticket.resolve({
            release,
            signal: ticket.abortController.signal
        });
    }
}