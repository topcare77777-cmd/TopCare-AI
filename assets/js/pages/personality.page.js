// assets/js/pages/personality.page.js

import { initPersonalityTest } from '../personality/personality-test.js';

export const personalityPage = {

    container: null,

    beforeEnter() {},

    async mount(container) {

        this.container = container;

        if (!this.container) {
            return;
        }

        this.container.innerHTML = `
            <div id="personality-test"
                 style="width:100%; max-width:860px; margin:0 auto;">
            </div>
        `;

        const target = this.container.querySelector(
            '#personality-test'
        );

        if (target) {
            await initPersonalityTest(target);
        }
    },

    afterEnter() {},

    beforeLeave() {},

    destroy() {
        if (this.container) {
            this.container.innerHTML = '';
        }
    },

    cleanup() {
        this.container = null;
    }
};

export default personalityPage;