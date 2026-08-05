/**
 * TOPCARE AI PLATFORM V2 — COMMUNITY CONTROLLER
 * Path: assets/js/community/community.controller.js
 * Status: APPROVED & LOCKED (GOLDEN BASELINE)
 * SRP: Lifecycle and mount controller for the Community domain.
 */

import { CommunityDashboardComponent } from './community.dashboard.component.js';

export class CommunityController {
    constructor(container) {
        this.container = container;
        this.dashboard = new CommunityDashboardComponent();
    }

    init() {
        if (!this.container) return;
        this.container.innerHTML = this.dashboard.render();
    }
}

export default CommunityController;