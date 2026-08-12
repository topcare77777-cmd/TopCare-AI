/**
 * TOPCARE AI PLATFORM V2
 * Path: assets/js/view/view.mount.base.js
 * Status: STRIPPED OBSOLETE LEGACY ROUTER IMPORTS
 */

export class ViewMountBase {
    constructor(container) {
        this.container = container;
    }
    async mountView(viewContent) {
        if (this.container) {
            this.container.innerHTML = viewContent;
        }
    }
    destroy() {
        if (this.container) {
            this.container.innerHTML = '';
        }
    }
}
export default ViewMountBase;