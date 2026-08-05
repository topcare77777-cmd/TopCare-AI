/**
 * TOPCARE AI PLATFORM V2 — SHARED LEVEL NAVIGATOR COMPONENT
 * Path: assets/js/learning/ai/shared/level.navigator.js
 * Status: APPROVED & LOCKED (BUILD 127.3)
 * SRP: Pure UI Renderer for Dynamic AI Level Navigation Tabs.
 */

export class LevelNavigator {
    static render(levels, activeLevelId) {
        return `
            <section class="tc-ai-overview-section">
                <div class="tc-ai-section-header">
                    <h2>Overview Tingkat Pembelajaran</h2>
                    <p>Navigasi tingkat kedalaman materi pembelajaran Artificial Intelligence</p>
                </div>
                <div class="tc-ai-levels-bar">
                    ${levels.map(lvl => `
                        <button type="button" 
                                class="tc-level-tab ${lvl.id === activeLevelId ? 'active' : ''} ${!lvl.active ? 'disabled' : ''}"
                                data-level-id="${lvl.id}"
                                ${!lvl.active ? 'disabled' : ''}>
                            <span class="tc-level-tab-title">${lvl.name}</span>
                            <span class="tc-ai-badge-status ${lvl.active ? 'status-active' : 'status-coming'}">${lvl.badge}</span>
                        </button>
                    `).join('')}
                </div>
            </section>
        `;
    }
}

export default LevelNavigator;