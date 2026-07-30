/**
 * file: assets/js/endpoints/endpoint.manager.js
 */

import { EndpointBase } from './endpoint.base.js';

export class EndpointManager {
    static initialize(engine) {
        if (!(engine instanceof EndpointBase)) {
            throw new TypeError("EndpointManager requires an instance of EndpointBase.");
        }
        return engine;
    }
}