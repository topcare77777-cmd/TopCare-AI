/**
 * file: assets/js/api/api.client.interface.js
 */

export class ApiClientInterface {
    execute(method, endpoint, data, options) { throw new Error("Not implemented"); }
    get(endpoint, options) { throw new Error("Not implemented"); }
    post(endpoint, data, options) { throw new Error("Not implemented"); }
    put(endpoint, data, options) { throw new Error("Not implemented"); }
    patch(endpoint, data, options) { throw new Error("Not implemented"); }
    delete(endpoint, options) { throw new Error("Not implemented"); }
    setProvider(provider) { throw new Error("Not implemented"); }
    addRequestInterceptor(onFulfilled, onRejected) { throw new Error("Not implemented"); }
    addResponseInterceptor(onFulfilled, onRejected) { throw new Error("Not implemented"); }
}