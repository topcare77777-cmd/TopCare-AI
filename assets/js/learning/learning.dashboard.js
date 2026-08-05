/**
 * TOPCARE AI PLATFORM V2 — LEARNING DASHBOARD ENTRY
 * Path: assets/js/learning/learning.dashboard.js
 * Status: APPROVED & LOCKED
 * SRP: Public initialization entry point for the Learning domain.
 */

import { LearningController } from './learning.controller.js';

export class LearningDashboard {
    constructor(hostContainer) {
        this.controller = new LearningController(hostContainer);
    }

    /**
     * Mounts the Learning Domain controller.
     */
    mount() {
        this.controller.init();
    }
}

export default LearningDashboard;