/**
 * TOPCARE AI PLATFORM V2 — AI LEARNING BASE RENDERER
 * Path: assets/js/learning/ai/ai.renderer.js
 * Status: APPROVED & LOCKED (BUILD 127.3)
 * SRP: Reusable Master UI Renderer for AI Learning Views.
 */

import LevelNavigator from './shared/level.navigator.js';
import ModuleCard from './shared/module.card.js';
import LessonCard from './shared/lesson.card.js';

export const AiRenderer = {
    renderModuleCatalog(heroMetadata, levels, activeLevelId, modules) {
        return `
            <div class="tc-ai-basic-wrapper">
                <header class="tc-ai-basic-hero">
                    <div class="tc-ai-hero-glow"></div>
                    <span class="tc-ai-badge">${heroMetadata.heroBadge}</span>
                    <h1 class="tc-ai-hero-title">${heroMetadata.title}</h1>
                    <p class="tc-ai-hero-subtitle">${heroMetadata.subtitle}</p>
                </header>

                ${LevelNavigator.render(levels, activeLevelId)}

                <section class="tc-ai-modules-section">
                    <div class="tc-ai-section-header">
                        <h2>Daftar Modul Pembelajaran</h2>
                        <p>Pilih modul di bawah ini untuk mulai membaca materi</p>
                    </div>
                    <div class="tc-ai-card-grid">
                        ${modules.map(m => ModuleCard.render(m)).join('')}
                    </div>
                </section>
            </div>
        `;
    },

    renderLessonReader(lesson) {
        return LessonCard.render(lesson);
    }
};

export default AiRenderer;