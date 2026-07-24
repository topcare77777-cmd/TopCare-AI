/**
 * TopCare AI Platform V2.0.0
 * Modularized Transport Connection Options DTOs with Deep Freeze
 * Path: assets/js/auth/events/transport/dto/transport.connection.options.js
 */

class ConnectionOptions {
    constructor(opts = {}) {
        this.endpoint = opts.endpoint || 'localhost';
        this.port = opts.port || 0;
        if (typeof deepFreeze === 'function') deepFreeze(this);
    }
}

class AuthenticationOptions {
    constructor(opts = {}) {
        this.username = opts.username || null;
        this.password = opts.password || null;
        this.token = opts.token || null;
        if (typeof deepFreeze === 'function') deepFreeze(this);
    }
}

class TlsOptions {
    constructor(opts = {}) {
        this.useTls = opts.useTls ?? false;
        this.rejectUnauthorized = opts.rejectUnauthorized ?? true;
        this.caCertificate = opts.caCertificate || null;
        if (typeof deepFreeze === 'function') deepFreeze(this);
    }
}

class RetryOptions {
    constructor(opts = {}) {
        this.type = opts.type || 'exponential';
        this.maxAttempts = opts.maxAttempts || 3;
        this.initialDelayMs = opts.initialDelayMs || 100;
        if (typeof deepFreeze === 'function') deepFreeze(this);
    }
}

class CompressionOptions {
    constructor(opts = {}) {
        this.algorithm = opts.algorithm || 'none'; // 'none', 'gzip', 'snappy'
        this.level = opts.level || 6;
        if (typeof deepFreeze === 'function') deepFreeze(this);
    }
}

class HeartbeatOptions {
    constructor(opts = {}) {
        this.intervalMs = opts.intervalMs || 15000;
        this.timeoutMs = opts.timeoutMs || 5000;
        if (typeof deepFreeze === 'function') deepFreeze(this);
    }
}

class TransportConnectionOptions {
    constructor(options = {}) {
        if (!options.clientId) throw new ConfigurationException("Mandatory 'clientId' missing.");
        if (!options.instanceId) throw new ConfigurationException("Mandatory 'instanceId' missing.");

        this.clientId = options.clientId;
        this.instanceId = options.instanceId;
        this.applicationName = options.applicationName || 'TopCarePlatform';
        
        this.connection = new ConnectionOptions(options.connection);
        this.authentication = new AuthenticationOptions(options.authentication);
        this.tls = new TlsOptions(options.tls);
        this.retry = new RetryOptions(options.retry);
        this.compression = new CompressionOptions(options.compression);
        this.heartbeat = new HeartbeatOptions(options.heartbeat);
        
        this.customProperties = Object.freeze(options.customProperties || {});
        if (typeof deepFreeze === 'function') deepFreeze(this);
        else Object.freeze(this);
    }
}