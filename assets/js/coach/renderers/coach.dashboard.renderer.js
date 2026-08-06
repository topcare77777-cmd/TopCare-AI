export const CoachDashboardRenderer = {
    render(context) {
        if (!context.hasAssessed) return '';

        return `
            <div class="tc-coach-dashboard-grid">
                <div class="tc-coach-stat-card">
                    <span class="tc-stat-label">Dominan</span>
                    <h4 class="tc-stat-value">${context.dominantPersonality}</h4>
                    <small class="tc-stat-sub">Sekunder: ${context.secondaryPersonality}</small>
                </div>
                <div class="tc-coach-stat-card">
                    <span class="tc-stat-label">Progress Academy</span>
                    <h4 class="tc-stat-value">${context.currentLevel}</h4>
                    <small class="tc-stat-sub">${context.academyProgress}% Selesai</small>
                </div>
            </div>
        `;
    }
};