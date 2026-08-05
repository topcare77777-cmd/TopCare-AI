/**
 * TOPCARE AI PLATFORM V2 — ABOUT DASHBOARD COMPONENT
 * Path: assets/js/about/about.dashboard.component.js
 * Status: APPROVED & LOCKED (BUILD 127.0)
 * SRP: Assembles About Us UI sections into a single responsive container.
 */

import { ABOUT_DATA } from './about.data.js';
import { AboutRenderer } from './about.renderer.js';

export class AboutDashboardComponent {
    constructor() {
        this.data = ABOUT_DATA;
    }

    render() {
        return `
            <div class="tc-about-wrapper">
                ${AboutRenderer.renderHero(this.data.hero)}
                ${AboutRenderer.renderVisionMissions(this.data.vision, this.data.missions)}
                ${AboutRenderer.renderWhatWeLearn(this.data.whatWeLearn)}
                ${AboutRenderer.renderValues(this.data.values)}
                ${AboutRenderer.renderLearningSteps(this.data.learningSteps)}
                ${AboutRenderer.renderContextualInfo(this.data.principles, this.data.aboutBook)}
                ${AboutRenderer.renderClosing(this.data.closing)}
            </div>
        `;
    }
}

export default AboutDashboardComponent;