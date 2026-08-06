/**
 * TOPCARE AI PLATFORM V2 — UNIFIED COACH RENDERER
 * Path: assets/js/coach/coach.renderer.js
 * Status: APPROVED & LOCKED (BUILD 128)
 * SRP: Pure View Generator using Design System Classes.
 */

import COACH_IDENTITY from './coach.identity.js';
import CoachMemory from './coach.memory.js';
import { PERSONALITY_RECOMMENDATIONS_DATA } from './coach.recommendation.data.js';

export const CoachRenderer = {
    renderCard() {
        const memory = CoachMemory.getMemory();

        if (!memory.hasAssessed) {
            return `
                <div class="tc-coach-card-container">
                    <div class="tc-coach-header">
                        <div class="tc-coach-avatar-box">
                            <img src="${COACH_IDENTITY.avatar}" alt="${COACH_IDENTITY.name}" class="tc-coach-avatar-img" onerror="this.src='${COACH_IDENTITY.fallbackAvatar}'">
                        </div>
                        <div class="tc-coach-identity-info">
                            <span class="tc-coach-badge">${COACH_IDENTITY.title}</span>
                            <h3 class="tc-coach-name">${COACH_IDENTITY.name}</h3>
                            <p class="tc-coach-welcome">${COACH_IDENTITY.welcomeMessage}</p>
                        </div>
                    </div>
                    <div class="tc-coach-cta-box">
                        <p class="tc-coach-welcome" style="margin-bottom: 1.25rem;">Selesaikan Personality Assessment untuk membuka pendampingan AI cerdas yang disesuaikan dengan temperamen dan gaya belajar Anda.</p>
                        <a href="#/personality" class="tc-btn-coach-primary">Mulai Personality Assessment →</a>
                    </div>
                </div>
            `;
        }

        const recs = PERSONALITY_RECOMMENDATIONS_DATA[memory.dominantPersonality] || PERSONALITY_RECOMMENDATIONS_DATA.Melankolis;

        return `
            <div class="tc-coach-card-container">
                <!-- HEADER & PERSONAL GREETING -->
                <div class="tc-coach-header">
                    <div class="tc-coach-avatar-box">
                        <img src="${COACH_IDENTITY.avatar}" alt="${COACH_IDENTITY.name}" class="tc-coach-avatar-img" onerror="this.src='${COACH_IDENTITY.fallbackAvatar}'">
                    </div>
                    <div class="tc-coach-identity-info">
                        <span class="tc-coach-badge active">Personal Companion Active</span>
                        <h3 class="tc-coach-name">Halo, ${memory.userName} 👋</h3>
                        <p class="tc-coach-welcome">Saya <strong>${COACH_IDENTITY.name}</strong>. Selamat, Anda telah menyelesaikan Personality Plus Assessment!</p>
                    </div>
                </div>

                <!-- PERSONALITY & ACADEMY PROGRESS DASHBOARD -->
                <div class="tc-coach-dashboard-grid">
                    <div class="tc-coach-stat-card">
                        <span class="tc-stat-label">Tipe Kepribadian</span>
                        <h4 class="tc-stat-value">${memory.dominantPersonality}</h4>
                        <small class="tc-stat-sub">Sekunder: ${memory.secondaryPersonality || '-'}</small>
                    </div>
                    <div class="tc-coach-stat-card">
                        <span class="tc-stat-label">Progress AI Academy</span>
                        <h4 class="tc-stat-value">${memory.currentLevel}</h4>
                        <small class="tc-stat-sub">${memory.academyProgress}% Selesai</small>
                    </div>
                </div>

                <!-- COMPANION INSIGHT & SCOPE -->
                <div class="tc-coach-insight-box">
                    <h5 class="tc-insight-title">💡 Insight Pendampingan Kepribadian</h5>
                    <p class="tc-insight-text">Berdasarkan tipe dominan <strong>${memory.dominantPersonality}</strong>, gaya belajar AI ideal Anda adalah <em>"${recs.studyStyle}"</em>.</p>
                    <strong style="font-size: 0.85rem; color: #a78bfa;">Saya akan menjadi pendamping Anda untuk:</strong>
                    <ul class="tc-companion-scope">
                        <li>✓ Memahami kekuatan karakter (${recs.strengths[0]})</li>
                        <li>✓ Mengembangkan potensi & gaya komunikasi</li>
                        <li>✓ Memilih jalur belajar AI yang sesuai (${recs.recommendedPath})</li>
                        <li>✓ Memberikan rekomendasi modul AI Academy</li>
                    </ul>
                </div>

                <!-- AI ACADEMY MODULE RECOMMENDATIONS -->
                <div class="tc-coach-learning-section">
                    <h5 class="tc-learning-title">📚 Rekomendasi Modul AI Academy Terpilih:</h5>
                    <div class="tc-learning-grid">
                        ${recs.academyModules.map(m => `
                            <div class="tc-learning-card">
                                <div>
                                    <span class="tc-module-tag">${m.level}</span>
                                    <h6 class="tc-module-title">${m.title}</h6>
                                </div>
                                <a href="${m.link}" class="tc-module-link">Pelajari Modul →</a>
                            </div>
                        `).join('')}
                    </div>
                </div>
            </div>
        `;
    }
};

export default CoachRenderer;