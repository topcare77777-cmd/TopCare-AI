/**
 * TopCare AI Platform V2.0.0
 * Dependency Injection Container
 * Path: assets/js/core/container.js
 */
import Logger from './logger.js';

const Container = {
    services: new Map(),

    register(name, definition, type = 'singleton') {
        this.services.set(name, { definition, type, instance: null });
        Logger.info(`[Container] Registered service: ${name} (${type})`);
    },

    get(name) {
        const service = this.services.get(name);
        if (!service) throw new Error(`[Container] Service not found: ${name}`);

        if (service.type === 'singleton') {
            if (!service.instance) {
                service.instance = typeof service.definition === 'function' ? service.definition() : service.definition;
            }
            return service.instance;
        }

        return typeof service.definition === 'function' ? service.definition() : service.definition;
    }
};

export default Container;