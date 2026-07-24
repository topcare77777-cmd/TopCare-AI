/**
 * TopCare AI Platform V2.0.0
 * Enterprise Transport Capability Descriptor with Maturity, Compliance, and Version metadata
 * Path: assets/js/auth/events/transport/transport.capabilities.js
 */

class TransportCapabilityDescriptor {
    constructor(opts = {}) {
        this.supported = opts.supported ?? false;
        this.implementation = opts.implementation || 'None';
        this.maturity = opts.maturity || 'Stable'; // 'Stable', 'Beta', 'Experimental'
        this.compliance = opts.compliance || 'Custom'; // 'AMQP 0.9.1', 'Kafka Protocol', 'Redis RESP', etc.
        this.requiredBrokerVersion = opts.requiredBrokerVersion || '1.0.0';
        this.sinceVersion = opts.sinceVersion || '2.0.0';
        this.deprecated = opts.deprecated ?? false;
        this.details = Object.freeze(opts.details || {});
        if (typeof deepFreeze === 'function') deepFreeze(this);
    }
}

class TransportCapabilities {
    constructor(options = {}) {
        this.supportsOrdering = new TransportCapabilityDescriptor({ supported: true, implementation: 'TCP / Partition Ordering', compliance: 'Transport Level' });
        this.supportsAck = new TransportCapabilityDescriptor({ supported: options.supportsAck ?? true, implementation: options.ackImplementation || 'Broker Acknowledgment' });
        this.supportsTransactions = new TransportCapabilityDescriptor({ supported: options.supportsTransactions ?? false, implementation: 'Two-Phase Commit', maturity: 'Experimental' });
        this.supportsBatching = new TransportCapabilityDescriptor({ supported: options.supportsBatching ?? false, implementation: 'Batch Producer API' });
        this.supportsPriorityQueue = new TransportCapabilityDescriptor({ supported: options.supportsPriorityQueue ?? false, implementation: 'Priority Header Routing' });
        this.supportsReplay = new TransportCapabilityDescriptor({ supported: options.supportsReplay ?? false, implementation: 'Event Log Replay' });
        this.supportsExactlyOnce = new TransportCapabilityDescriptor({ supported: options.supportsExactlyOnce ?? false, implementation: 'Idempotent Producer', maturity: 'Experimental' });
        this.supportsDeadLetter = new TransportCapabilityDescriptor({ supported: options.supportsDeadLetter ?? true, implementation: 'DLQ Exchange / Topic' });
        this.supportsPartitioning = new TransportCapabilityDescriptor({ supported: options.supportsPartitioning ?? false, implementation: 'Key-based Partition Hash' });
        this.supportsConsumerGroups = new TransportCapabilityDescriptor({ supported: options.supportsConsumerGroups ?? false, implementation: 'Consumer Group Coordination' });
        this.supportsCompression = new TransportCapabilityDescriptor({ supported: options.supportsCompression ?? false, implementation: options.compressionAlgo || 'Gzip / Snappy' });
        
        if (typeof deepFreeze === 'function') deepFreeze(this);
        else Object.freeze(this);
    }
}