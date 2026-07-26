// assets/js/coach/coach-dashboard-integration.js
/**
 * @file coach-dashboard-integration.js
 * @description Integration orchestrator for Sprint 30 Phase 1, uniting Dashboard Engine, Progress Widgets, Achievement Panel, and Activity Timeline into a single cohesive UI view.
 * @module Coach/DashboardIntegration
 */

import { CoachDashboard } from './coach-dashboard.js';
import { CoachProgressWidgets } from './coach-progress-widgets.js';
import { CoachAchievementPanel } from './coach-achievement-panel.js';
import { CoachActivityTimeline } from './coach-activity-timeline.js';

export const CoachDashboardIntegration = {
    async renderFullDashboard(containerElement) {
        if (!containerElement) return false;

        // Create a wrapper structure for the complete dashboard view
        containerElement.innerHTML = `
            <div class="coach-dashboard-container container-fluid px-0">
                <div id="coach-dashboard-summary-slot"></div>
                <div id="coach-progress-widgets-slot"></div>
                <div class="row">
                    <div class="col-lg-7">
                        <div id="coach-achievement-panel-slot"></div>
                    </div>
                    <div class="col-lg-5">
                        <div id="coach-activity-timeline-slot"></div>
                    </div>
                </div>
            </div>
        `;

        // Render each component into its designated container slot in a deterministic order
        const summarySlot = containerElement.querySelector('#coach-dashboard-summary-slot');
        const widgetsSlot = containerElement.querySelector('#coach-progress-widgets-slot');
        const achievementSlot = containerElement.querySelector('#coach-achievement-panel-slot');
        const timelineSlot = containerElement.querySelector('#coach-activity-timeline-slot');

        await CoachDashboard.renderDashboardSummary(summarySlot);
        await CoachProgressWidgets.renderWidgets(widgetsSlot);
        await CoachAchievementPanel.renderPanel(achievementSlot);
        await CoachActivityTimeline.renderTimeline(timelineSlot);

        return true;
    }
};