/**
 * file: assets/js/core/logger/logger.interface.js
 */

export class LoggerInterface {
    debug(message, context) { throw new Error("Not implemented"); }
    info(message, context) { throw new Error("Not implemented"); }
    warn(message, context) { throw new Error("Not implemented"); }
    error(message, context) { throw new Error("Not implemented"); }
    setLevel(level) { throw new Error("Not implemented"); }
    getLevel() { throw new Error("Not implemented"); }
}