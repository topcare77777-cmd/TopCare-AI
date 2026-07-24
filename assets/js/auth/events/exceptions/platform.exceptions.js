/**
 * TopCare AI Platform V2.0.0
 * Granular Exception Hierarchy with Transient vs Permanent transport classifications
 * Path: assets/js/auth/events/exceptions/platform.exceptions.js
 */

class PlatformException extends Error {
    constructor(message, code = 'PLATFORM_ERROR') {
        super(message);
        this.name = this.constructor.name;
        this.code = code;
        this.timestamp = new Date().toISOString();
        Error.captureStackTrace?.(this, this.constructor);
    }
}

class ConfigurationException extends PlatformException {
    constructor(message) { super(message, 'CONFIG_ERROR'); }
}

class ValidationException extends PlatformException {
    constructor(message) { super(message, 'VALIDATION_ERROR'); }
}

class SerializationException extends PlatformException {
    constructor(message) { super(message, 'SERIALIZATION_ERROR'); }
}

class TransportException extends PlatformException {
    constructor(message, code = 'TRANSPORT_ERROR') { super(message, code); }
}

class RetryableTransportException extends TransportException {
    constructor(message, code = 'RETRYABLE_TRANSPORT_ERROR') { super(message, code); }
}

class TransientTransportException extends RetryableTransportException {
    constructor(message, code = 'TRANSIENT_TRANSPORT_ERROR') { super(message, code); }
}

class PermanentTransportException extends TransportException {
    constructor(message, code = 'PERMANENT_TRANSPORT_ERROR') { super(message, code); }
}

class FatalTransportException extends PermanentTransportException {
    constructor(message, code = 'FATAL_TRANSPORT_ERROR') { super(message, code); }
}

class BrokerUnavailableException extends TransientTransportException {
    constructor(message = 'Broker cluster is temporarily unavailable.') { super(message, 'BROKER_UNAVAILABLE'); }
}

class ConnectionLostException extends TransientTransportException {
    constructor(message = 'Connection to message broker was lost.') { super(message, 'CONNECTION_LOST'); }
}

class TransportTimeoutException extends TransientTransportException {
    constructor(message = 'Transport operation timed out.') { super(message, 'TRANSPORT_TIMEOUT'); }
}

class AuthenticationException extends FatalTransportException {
    constructor(message = 'Broker authentication failed permanently.') { super(message, 'AUTH_FAILED'); }
}