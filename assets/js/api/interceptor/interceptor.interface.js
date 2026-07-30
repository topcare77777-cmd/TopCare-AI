/**
 * file: assets/js/api/interceptor/interceptor.interface.js
 */

export class InterceptorInterface {
    onRequest(config) { throw new Error("Not implemented"); }
    onRequestError(error) { throw new Error("Not implemented"); }
    onResponse(response) { throw new Error("Not implemented"); }
    onResponseError(error) { throw new Error("Not implemented"); }
}