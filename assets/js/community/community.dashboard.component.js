/**
 * TOPCARE AI PLATFORM V2 — COMMUNITY DASHBOARD COMPONENT
 * Path: assets/js/community/community.dashboard.component.js
 * Status: APPROVED & LOCKED (GOLDEN BASELINE)
 * SRP: Assembles Community Hub UI sections into a cohesive single-page layout.
 */

import { COMMUNITY_DATA } from './community.data.js';
import { CommunityRenderer } from './community.renderer.js';

export class CommunityDashboardComponent {
    constructor() {
        this.data = COMMUNITY_DATA;
    }

    render() {
        return `
            <div class="tc-community-wrapper">
                ${CommunityRenderer.renderHero(this.data.hero)}
                ${CommunityRenderer.renderTopics(this.data.topics)}
                ${CommunityRenderer.renderStudyGroups(this.data.studyGroups)}
                ${CommunityRenderer.renderGuidelines(this.data.guidelines)}
                ${CommunityRenderer.renderComingSoon(this.data.comingSoon)}
            </div>
        `;
    }
}

export default CommunityDashboardComponent;