/**
 * TopCare AI Platform V2.0.0
 * Structured Logger delegating object creation to LogEntryFactory and supporting Child Loggers
 * Path: assets/js/auth/logger/structured.logger.js
 */

const LogLevel = Object.freeze({
    DEBUG: 0,
    INFO: 1,
    WARN: 2,
    ERROR: 3,
    NONE: 4
});

class StructuredLogger extends LoggerInterface {
    constructor(options = {}) {
        super();
        this.minimumLevel = options.minimumLevel !== undefined ? options.minimumLevel : LogLevel.INFO;
        this.environment = options.environment || "production";
        this.sinks = options.sinks || [new ConsoleLogSink()];
        this.defaultMeta = options.defaultMeta || {};
    }

    addSink(sink) {
        this.sinks.push(sink);
    }

    child(childMeta = {}) {
        return new StructuredLogger({
            minimumLevel: this.minimumLevel,
            environment: this.environment,
            sinks: this.sinks,
            defaultMeta: { ...this.defaultMeta, ...childMeta }
        });
    }

    _log(levelNum, levelName, message, meta) {
        if (levelNum >= this.minimumLevel) {
            const mergedMeta = { ...this.defaultMeta, ...meta };
            const entry = LogEntryFactory.create(levelName, message, mergedMeta, this.environment);
            this.sinks.forEach(sink => sink.write(entry));
        }
    }

    debug(message, meta) { this._log(LogLevel.DEBUG, "DEBUG", message, meta); }
    info(message, meta) { this._log(LogLevel.INFO, "INFO", message, meta); }
    warn(message, meta) { this._log(LogLevel.WARN, "WARN", message, meta); }
    error(message, meta) { this._log(LogLevel.ERROR, "ERROR", message, meta); }
}