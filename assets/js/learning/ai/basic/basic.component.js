/**
 * TOPCARE AI PLATFORM V2 — AI LEARNING BASIC: COMPONENT
 * Path: assets/js/learning/ai/basic/basic.component.js
 * Status: APPROVED & LOCKED (BUILD 127.3)
 * SRP: Assembles Basic Level UI sub-components into a cohesive single container.
 */

import { BASIC_HERO_DATA, BASIC_OVERVIEW_DATA } from './basic.data.js';
import { BASIC_MODULES_LIST, LEVEL_STATES_DATA } from './basic.modules.js';
import { BasicRenderer } from './basic.renderer.js';

export class BasicComponent {
    constructor() {
        this.hero = BASIC_HERO_DATA;
        this.overview = BASIC_OVERVIEW_DATA;
        this.levels = LEVEL_STATES_DATA;
        this.modules = BASIC_MODULES_LIST;
    }

    render() {
        return `
            <div class="tc-ai-basic-wrapper">
                ${BasicRenderer.renderHero(this.hero)}
                ${BasicRenderer.renderLevelOverview(this.overview, this.levels)}
                ${BasicRenderer.renderBasicModules(this.modules)}
                ${BasicRenderer.renderFooterCta()}
            </div>
        `;
    }
}

export default BasicComponent;