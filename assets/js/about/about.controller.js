/**
 * TOPCARE AI PLATFORM V2 — ABOUT CONTROLLER
 * Path: assets/js/about/about.controller.js
 * Status: APPROVED & LOCKED (BUILD 127.0)
 * SRP: Lifecycle and mount controller for the About domain.
 */

import { AboutDashboardComponent } from './about.dashboard.component.js';

export class AboutController {
    constructor(container) {
        this.container = container;
        this.dashboard = new AboutDashboardComponent();
    }

    init() {
        if (!this.container) return;
        this.container.innerHTML = this.dashboard.render();
    }
}

export default AboutController;