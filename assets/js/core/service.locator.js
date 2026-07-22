/**
 * TopCare AI Platform V2.0.0
 * Service Locator
 * Path: assets/js/core/service.locator.js
 */
import Container from './container.js';

const ServiceLocator = {
    get(name) {
        return Container.get(name);
    },

    register(name, definition, type) {
        Container.register(name, definition, type);
    }
};

export default ServiceLocator;