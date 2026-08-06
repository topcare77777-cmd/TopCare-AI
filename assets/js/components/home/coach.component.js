/**
 * TOPCARE AI PLATFORM V2 — COACH CONDUCTOR COMPONENT
 * Path: assets/js/coach/coach.component.js
 * Status: APPROVED & LOCKED (BUILD 128)
 * SRP: Component conductor for mounting and patching Coach UI in active hosts.
 */

import { CoachRenderer } from './coach.renderer.js';

export class CoachComponent {
    constructor(container) {
        this.container = container;
        this.isMounted = false;
    }

    mount(targetElement) {
        this.container = targetElement || this.container;
        if (!this.container) return;

        this.render();
        this.isMounted = true;
    }

    render() {
        if (!this.container) return;
        this.container.innerHTML = CoachRenderer.renderCard();
        CoachRenderer.attachImageFallbacks(this.container);
    }

    update() {
        if (this.isMounted) {
            this.render();
        }
    }

    destroy() {
        if (this.container) {
            this.container.innerHTML = '';
        }
        this.isMounted = false;
        this.container = null;
    }
}

export default CoachComponent;