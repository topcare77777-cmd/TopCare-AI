/**
 * TopCare AI Platform V2.0.0
 * Console Log Sink receiving raw log object and applying formatter
 * Path: assets/js/auth/logger/sinks/console.log.sink.js
 */

class ConsoleLogSink extends LogSinkInterface {
    constructor(formatter) {
        super();
        this.formatter = formatter || new JsonLogFormatter();
    }

    write(logEntry) {
        const output = this.formatter.format(logEntry);
        switch (logEntry.level) {
            case "DEBUG": console.debug(output); break;
            case "INFO": console.info(output); break;
            case "WARN": console.warn(output); break;
            case "ERROR": console.error(output); break;
            default: console.log(output);
        }
    }
}