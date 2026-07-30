/**
 * file: assets/js/endpoints/endpoint.interface.js
 */

export class EndpointInterface {
    get(domain, key) { throw new Error("Not implemented"); }
    has(domain, key) { throw new Error("Not implemented"); }
    getDomain(domain) { throw new Error("Not implemented"); }
    getAll() { throw new Error("Not implemented"); }
}