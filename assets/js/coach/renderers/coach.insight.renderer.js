import PERSONALITY_RECOMMENDATIONS_DATA from '../coach.recommendation.data.js';

export const CoachInsightRenderer = {
    render(context) {
        if (!context.hasAssessed) return '';
        const rec = PERSONALITY_RECOMMENDATIONS_DATA[context.dominantPersonality] || PERSONALITY_RECOMMENDATIONS_DATA.Melankolis;

        return `
            <section class="tc-coach-insight-box">
                <h5 class="tc-insight-title">💡 Insight Kepribadian & Gaya Belajar</h5>
                <p class="tc-insight-text">Sebagai seorang <strong>${context.dominantPersonality}</strong>, Anda memiliki kekuatan utama pada <em>${rec.strengths.join(', ')}</em>.</p>
                <div class="tc-insight-style">
                    <strong>Gaya Belajar AI Ideal:</strong> ${rec.studyStyle}
                </div>
            </section>
        `;
    }
};