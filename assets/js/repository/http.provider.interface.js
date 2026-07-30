/**
 * file: assets/js/repository/http.provider.interface.js
 */

export class HttpProviderInterface {
    query(endpoint, options) { throw new Error("Not implemented"); }
    mutate(endpoint, payload, options) { throw new Error("Not implemented"); }
}