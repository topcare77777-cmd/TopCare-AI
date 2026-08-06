/**
 * file: assets/js/api/interceptor/interceptor.manager.js
 * Version: 131.1.0
 * Status: RESTORED & COMPATIBILITY PATCH
 * SRP: Interceptor Pipeline Registration & Execution
 */


export class InterceptorManager {

    constructor() {

        this._requestInterceptors = [];
        this._responseInterceptors = [];

        Object.seal(this);

    }


    addRequestInterceptor(interceptor) {

        if (
            interceptor &&
            typeof interceptor === 'function'
        ) {

            this._requestInterceptors.push(interceptor);

        } else if (interceptor) {

            this._requestInterceptors.push(interceptor);

        }

        return this;

    }


    addResponseInterceptor(interceptor) {

        if (
            interceptor &&
            typeof interceptor === 'function'
        ) {

            this._responseInterceptors.push(interceptor);

        } else if (interceptor) {

            this._responseInterceptors.push(interceptor);

        }

        return this;

    }


    removeRequestInterceptor(interceptor) {

        this._requestInterceptors =
            this._requestInterceptors.filter(
                item => item !== interceptor
            );

        return this;

    }


    removeResponseInterceptor(interceptor) {

        this._responseInterceptors =
            this._responseInterceptors.filter(
                item => item !== interceptor
            );

        return this;

    }


    getRequestInterceptors() {

        return [
            ...this._requestInterceptors
        ];

    }


    getResponseInterceptors() {

        return [
            ...this._responseInterceptors
        ];

    }


    async executeRequest(config) {

        let result = config;


        for (const interceptor of this._requestInterceptors) {

            if (
                interceptor &&
                typeof interceptor === 'function'
            ) {

                result =
                    await interceptor(result);

            }
            else if (
                interceptor &&
                typeof interceptor.request === 'function'
            ) {

                result =
                    await interceptor.request(result);

            }

        }


        return result;

    }


    async executeResponse(response) {

        let result = response;


        for (const interceptor of this._responseInterceptors) {

            if (
                interceptor &&
                typeof interceptor === 'function'
            ) {

                result =
                    await interceptor(result);

            }
            else if (
                interceptor &&
                typeof interceptor.response === 'function'
            ) {

                result =
                    await interceptor.response(result);

            }

        }


        return result;

    }


    clear() {

        this._requestInterceptors.length = 0;
        this._responseInterceptors.length = 0;

    }

}


InterceptorManager.initialize = function () {

    if (!this._instance) {

        this._instance =
            new InterceptorManager();

    }


    return this._instance;

};


export default InterceptorManager;