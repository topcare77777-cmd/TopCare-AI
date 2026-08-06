import PERSONALITY_RECOMMENDATIONS_DATA from '../coach.recommendation.data.js';

export const CoachLearningRenderer = {
    render(context) {
        if (!context.hasAssessed) {
            return `
                <div class="tc-coach-cta-box">
                    <p>Mulai Personality Assessment untuk membuka kurikulum pembelajaran AI yang dipersonalisasi khusus untuk karakter Anda.</p>
                    <a href="#/personality" class="tc-btn-coach-primary">Mulai Personality Test →</a>
                </div>
            `;
        }

        const rec = PERSONALITY_RECOMMENDATIONS_DATA[context.dominantPersonality] || PERSONALITY_RECOMMENDATIONS_DATA.Melankolis;

        return `
            <section class="tc-coach-learning-section">
                <h5 class="tc-learning-title">📚 Rekomendasi Modul AI Academy (${rec.recommendedPath}):</h5>
                <div class="tc-learning-grid">
                    ${rec.academyModules.map(m => `
                        <div class="tc-learning-card">
                            <span class="tc-module-tag">${m.level}</span>
                            <strong>${m.title}</strong>
                            <a href="${m.link}" class="tc-module-link">Buka Modul →</a>
                        </div>
                    `).join('')}
                </div>
            </section>
        `;
    }
};