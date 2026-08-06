import COACH_IDENTITY from '../coach.identity.js';

export const CoachHeaderRenderer = {
    render(context) {
        if (!context.hasAssessed) {
            return `
                <header class="tc-coach-header tc-coach-glass">
                    <div class="tc-coach-avatar-box">
                        <img src="${COACH_IDENTITY.avatar}" alt="${COACH_IDENTITY.name}" class="tc-coach-avatar-img">
                    </div>
                    <div class="tc-coach-identity-info">
                        <span class="tc-coach-badge">${COACH_IDENTITY.title}</span>
                        <h3 class="tc-coach-name">${COACH_IDENTITY.name}</h3>
                        <p class="tc-coach-welcome">${COACH_IDENTITY.welcomeMessage}</p>
                    </div>
                </header>
            `;
        }

        return `
            <header class="tc-coach-header tc-coach-glass">
                <div class="tc-coach-avatar-box active">
                    <img src="${COACH_IDENTITY.avatar}" alt="${COACH_IDENTITY.name}" class="tc-coach-avatar-img">
                </div>
                <div class="tc-coach-identity-info">
                    <span class="tc-coach-badge active">Companion Aktif</span>
                    <h3 class="tc-coach-name">Halo, ${context.userName} 👋</h3>
                    <p class="tc-coach-welcome">Saya <strong>${COACH_IDENTITY.name}</strong>. Terima kasih telah menyelesaikan Assessment Personality Plus.</p>
                </div>
            </header>
        `;
    }
};