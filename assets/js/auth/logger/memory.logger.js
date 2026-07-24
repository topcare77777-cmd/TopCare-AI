/**
 * TopCare AI Platform V2.0.0
 * Memory Logger Implementation for Unit Testing
 * Path: assets/js/auth/logger/memory.logger.js
 */

class MemoryLogger extends LoggerInterface {
    constructor() {
        super();
        this.logs = [];
    }

    info(message, meta) { this.logs.push({ level: 'INFO', message, meta, time: Date.now() }); }
    warn(message, meta) { this.logs.push({ level: 'WARN', message, meta, time: Date.now() }); }
    error(message, meta) { this.logs.push({ level: 'ERROR', message, meta, time: Date.now() }); }
    debug(message, meta) { this.logs.push({ level: 'DEBUG', message, meta, time: Date.now() }); }
    
    clear() { this.logs = []; }
}