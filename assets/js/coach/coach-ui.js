// assets/js/coach/coach-ui.js
/**
 * @file coach-ui.js
 * @description Pure UI template renderer integrating progress components into both Home and Lesson views.
 * @module Coach/UI
 */

export const CoachUI = {
    renderHome(profile, progress) {
        return `
            <div class="coach-container section">
                <div class="container-sm coach-shell">
                    ${this.renderHeader(profile)}
                    <div class="coach-dashboard-card" style="background: ${profile.report.primaryMeta.color};">
                        <div class="coach-avatar-area">
                            <span class="coach-emoji">${profile.report.primaryMeta.icon}</span>
                            <h2>Halo, ${profile.name}</h2>
                        </div>
                        <p class="coach-summary">${profile.report.primaryMeta.summary}</p>
                    </div>
                    <div class="coach-progress-section" style="margin: 1.5rem 0;">
                        ${this.renderProgress(progress)}
                    </div>
                    <div class="coach-welcome-box">
                        <h3>Selamat Datang di AI Coach</h3>
                        <p>Program pembelajaran personal yang dirancang khusus berdasarkan profil temperamen ${profile.primary} Anda.</p>
                        <a href="#/coach/lesson" class="btn btn-primary" data-action="start-learning">Mulai Pembelajaran</a>
                    </div>
                </div>
            </div>
        `;
    },

    renderLesson(profile, lessonData, progress) {
        return `
            <div class="coach-container section">
                <div class="container-sm coach-shell">
                    ${this.renderHeader(profile)}
                    <div class="coach-progress-section" style="margin-bottom: 1.5rem;">
                        ${this.renderProgress(progress)}
                    </div>
                    <div class="coach-lesson-box">
                        <span class="lesson-badge">${profile.primary} Development</span>
                        <h2>${lessonData.title}</h2>
                        <p>${lessonData.content}</p>
                        <div class="test-actions">
                            <a href="#/coach" class="btn btn-secondary">Kembali ke Beranda</a>
                            <button type="button" class="btn btn-primary" data-action="complete-lesson">Selesai & Lanjut</button>
                        </div>
                    </div>
                </div>
            </div>
        `;
    },

    renderHeader(profile) {
        return `
            <div class="test-header-row">
                <p class="test-kicker" style="margin: 0;">TopCare AI Coach · ${profile.primary || 'Eksplorasi'}</p>
                <a href="#/personality" class="btn btn-secondary" style="text-decoration: none;">Ulangi Tes</a>
            </div>
        `;
    },

    renderProgress(progress) {
        const percentage = ((progress.currentLessonIndex + 1) / (progress.totalLessons || 1)) * 100;
        return `
            <div class="test-progress" aria-label="Progres belajar">
                <span style="width: ${percentage}%"></span>
            </div>
            <p class="test-counter">Pelajaran ${progress.currentLessonIndex + 1} dari ${progress.totalLessons}</p>
        `;
    },

    renderEmptyState() {
        return `
            <div class="coach-container section">
                <div class="container-sm coach-shell text-center">
                    <h2>Belum Ada Data Asesmen</h2>
                    <p>Silakan selesaikan Tes Kepribadian V2 terlebih dahulu agar AI Coach dapat menyesuaikan materi untuk Anda.</p>
                    <a href="#/personality" class="btn btn-primary">Mulai Tes Kepribadian</a>
                </div>
            </div>
        `;
    },

    renderErrorState(errorMessage) {
        return `
            <div class="coach-container section">
                <div class="container-sm coach-shell text-center">
                    <h2>${errorMessage}</h2>
                    <p>Terjadi kendala saat memuat modul pembelajaran AI Coach. Silakan muat ulang halaman.</p>
                    <a href="#/coach" class="btn btn-primary">Coba Lagi</a>
                </div>
            </div>
        `;
    }
};