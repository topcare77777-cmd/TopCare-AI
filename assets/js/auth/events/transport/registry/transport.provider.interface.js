/**
 * TopCare AI Platform V2.0.0
 * Formal ITransportProvider Interface with full Lifecycle, Priority, and Metadata Contract
 * Path: assets/js/auth/events/transport/registry/transport.provider.interface.js
 */

class ITransportProvider {
    capabilities() { throw new Error("Not implemented"); }
    priority() { throw new Error("Not implemented"); }
    supports(channel) { throw new Error("Not implemented"); }
    metadata() { throw new Error("Not implemented"); }
    version() { throw new Error("Not implemented"); }
    async health(instance) { throw new Error("Not implemented"); }
    async reload(instance) { throw new Error("Not implemented"); }
    async dispose(instance) { throw new Error("Not implemented"); }
    create(connectionOptions, logger, options) { throw new Error("Not implemented"); }
}