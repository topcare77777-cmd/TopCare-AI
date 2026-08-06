/**
 * file: assets/js/router/history.service.js
 * Version: 131.0.0
 * Status: RESTORED
 * SRP: Browser History Hash Management
 */

export class HistoryService {

    constructor() {
        this.current = window.location.hash || '#/home';
        Object.seal(this);
    }


    getHash() {
        return window.location.hash.replace('#', '') || '/home';
    }


    push(path) {
        const target = `#${path.startsWith('/') ? path : '/' + path}`;

        if (window.location.hash !== target) {
            window.location.hash = target;
        }
    }


    replace(path) {
        const target = `#${path.startsWith('/') ? path : '/' + path}`;

        window.location.replace(target);
    }


    listen(callback) {

        window.addEventListener(
            'hashchange',
            () => {
                this.current = this.getHash();

                if (typeof callback === 'function') {
                    callback(this.current);
                }
            }
        );

    }

}


export const History = new HistoryService();

export default History;