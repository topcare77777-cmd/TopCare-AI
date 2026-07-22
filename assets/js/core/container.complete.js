/**
 * TopCare AI Platform V2.0.0
 * DI Container Complete
 * Path: assets/js/core/container.complete.js
 */
const ContainerComplete = {
    services: new Map(),

    bind(key, implementation, type = 'singleton') {
        this.services.set(key, { implementation, type, instance: null });
    },

    resolve(key) {
        const service = this.services.get(key);
        if (!service) throw new Error(`Service not found: ${key}`);
        if (service.type === 'singleton') {
            if (!service.instance) service.instance = new service.implementation();
            return service.instance;
        }
        return new service.implementation();
    }
};

export default ContainerComplete;