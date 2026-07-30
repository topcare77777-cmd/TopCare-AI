/**
 * file: assets/js/api/interceptor/interceptor.base.js
 */

import { Core } from '../../core/index.js';
import { InterceptorInterface } from './interceptor.interface.js';

export class InterceptorBase extends InterceptorInterface {
    constructor() {
        super();
        this._requestInterceptors = [];
        this._responseInterceptors = [];
        Object.seal(this);
    }

    addRequestInterceptor(onFulfilled, onRejected) {
        if (typeof onFulfilled !== 'function') {
            throw new TypeError("Request interceptor fulfilled handler must be a function.");
        }
        this._requestInterceptors.push({
            fulfilled: onFulfilled,
            rejected: typeof onRejected === 'function' ? onRejected : null
        });
        Core.Logger.debug("ApiClient added request interceptor.");
        return this;
    }

    addResponseInterceptor(onFulfilled, onRejected) {
        if (typeof onFulfilled !== 'function') {
            throw new TypeError("Response interceptor fulfilled handler must be a function.");
        }
        this._responseInterceptors.push({
            fulfilled: onFulfilled,
            rejected: typeof onRejected === 'function' ? onRejected : null
        });
        Core.Logger.debug("ApiClient added response interceptor.");
        return this;
    }

    async executeRequestPipeline(initialConfig) {
        let config = Core.Utils.clone(initialConfig);

        for (const interceptor of this._requestInterceptors) {
            try {
                if (interceptor.fulfilled) {
                    const result = await interceptor.fulfilled(config);
                    if (result !== undefined) {
                        config = Core.Utils.clone(result);
                    }
                }
            } catch (error) {
                if (interceptor.rejected) {
                    const result = await interceptor.rejected(error);
                    if (result !== undefined) {
                        config = Core.Utils.clone(result);
                    }
                } else {
                    throw error;
                }
            }
        }
        return config;
    }

    async executeResponsePipeline(initialResponse) {
        let response = Core.Utils.clone(initialResponse);

        for (const interceptor of this._responseInterceptors) {
            try {
                if (interceptor.fulfilled) {
                    const result = await interceptor.fulfilled(response);
                    if (result !== undefined) {
                        response = Core.Utils.clone(result);
                    }
                }
            } catch (error) {
                let handled = false;
                for (const matchingInterceptor of this._responseInterceptors) {
                    if (matchingInterceptor.rejected) {
                        try {
                            const result = await matchingInterceptor.rejected(error);
                            if (result !== undefined) {
                                response = Core.Utils.clone(result);
                                handled = true;
                                break;
                            }
                        } catch (rejErr) {
                            error = rejErr;
                        }
                    }
                }
                if (!handled) {
                    throw error;
                }
            }
        }
        return response;
    }
}