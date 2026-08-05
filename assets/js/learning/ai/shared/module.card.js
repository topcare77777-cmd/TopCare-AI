/**
 * TOPCARE AI PLATFORM V2 — SHARED MODULE CARD COMPONENT
 * Path: assets/js/learning/ai/shared/module.card.js
 * Status: APPROVED & LOCKED (BUILD 127.3)
 * SRP: Reusable UI Component Renderer for AI Module Cards.
 */

export class ModuleCard {
    static render(moduleData) {
        return `
            <article class="tc-ai-learning-card" data-module-id="${moduleData.id}">
                <div class="tc-card-top-header">
                    <span class="tc-card-icon">${moduleData.icon}</span>
                    <span class="tc-ai-badge-level">${moduleData.badge}</span>
                </div>
                <h3 class="tc-card-title">${moduleData.title}</h3>
                <p class="tc-card-description">${moduleData.description}</p>
                
                <div class="tc-card-points-box">
                    <span class="tc-points-label">Yang dipelajari:</span>
                    <ul class="tc-learning-list">
                        ${moduleData.learningPoints.map(pt => `
                            <li><span class="tc-list-check">✓</span> ${pt}</li>
                        `).join('')}
                    </ul>
                </div>

                <div class="tc-card-footer-info">
                    <div class="tc-card-meta">
                        <span class="tc-meta-estimation">⏱️ ${moduleData.estimation}</span>
                        <button type="button" class="tc-btn-open-lesson" data-module-id="${moduleData.id}">
                            Pelajari Modul →
                        </button>
                    </div>
                </div>
            </article>
        `;
    }
}

export default ModuleCard;