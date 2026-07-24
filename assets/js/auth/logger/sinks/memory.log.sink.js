/**
 * TopCare AI Platform V2.0.0
 * Memory Log Sink receiving raw log objects for testing
 * Path: assets/js/auth/logger/sinks/memory.log.sink.js
 */

class MemoryLogSink extends LogSinkInterface {
    constructor() {
        super();
        this.logs = [];
    }

    write(logEntry) {
        this.logs.push(logEntry);
    }

    clear() {
        this.logs = [];
    }
}