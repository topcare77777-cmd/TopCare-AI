// assets/js/renderers/personality.renderer.js
/**
 * @file personality.renderer.js
 * @description Personality renderer module supporting landing and V2 quiz route orchestration.
 * @module Renderers/Personality
 */

import { initPersonalityTest } from '../personality/personality-test.js';

export const PersonalityRenderer = {
    renderLanding(container) {
        if (!container) return;
        container.innerHTML = `
            <section class="personality-landing-section section" style="padding: 4rem 2rem; text-align: center;">
                <div class="container-sm" style="max-width: 800px; margin: 0 auto;">
                    <p class="test-kicker" style="color: #3b82f6; font-size: 0.75rem; font-weight: 700; text-transform: uppercase; letter-spacing: 0.1em; margin-bottom: 0.75rem;">TopCare AI · Personality Explorer</p>
                    <h1 style="font-size: 2.5rem; font-weight: 800; color: #fff; margin-bottom: 1.25rem;">Temukan Tipe Temperamen Dasar Anda</h1>
                    <p style="color: #9ca3af; font-size: 1.05rem; line-height: 1.6; margin-bottom: 2.5rem;">Kenali potensi diri melalui asesmen psikologi komprehensif berbasis AI untuk akselerasi karier dan pengembangan personal.</p>
                    <button type="button" id="startPersonalityQuiz" class="btn btn-primary" style="background: linear-gradient(135deg, #2563eb 0%, #3b82f6 100%); color: #fff; padding: 0.85rem 2rem; border-radius: 999px; font-weight: 600; font-size: 1rem; border: none; cursor: pointer; box-shadow: 0 8px 25px rgba(37, 99, 235, 0.4);">
                        Ikuti Quiz Personality AI →
                    </button>
                </div>
            </section>
        `;

        const startBtn = container.querySelector('#startPersonalityQuiz');
        if (startBtn) {
            startBtn.addEventListener('click', () => {
                window.location.hash = '#/personality-test';
            });
        }
    },

    renderQuiz(container) {
        if (!container) return;
        container.innerHTML = `<div id="personality-test"></div>`;
        initPersonalityTest();
    }
};

export default PersonalityRenderer;