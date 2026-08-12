/**
 * TOPCARE AI PLATFORM V2 — MBTI PAGE FACADE ENTRY POINT
 * Path: assets/js/pages/test-mbti.page.js
 * SRP: Facade wrapper maintaining backwards compatibility with Router.
 */

import { TestMBTIPage as MBTIMainPage } from './mbti/test-mbti.page.js';

export class TestMBTIPage {
    constructor() {
        this._page = new MBTIMainPage();
    }

    async mount(container) {
        await this._page.mount(container);
    }

    destroy() {
        if (this._page && typeof this._page.destroy === 'function') {
            this._page.destroy();
        }
    }
}

export default new TestMBTIPage();