/**
 * TOPCARE AI PLATFORM V2 — SHARED LESSON READER PAGE
 * Path: assets/js/learning/ai/shared/lesson.card.js
 * Status: APPROVED & LOCKED (BUILD 127.3)
 * SRP: Pure UI Component Renderer for AI Lesson Reading Page View.
 */

export class LessonCard {
    static render(lesson) {
        return `
            <div class="tc-lesson-container">
                <button type="button" class="tc-btn-back-module" id="tc-back-to-modules-btn">
                    ← Kembali ke Daftar Modul
                </button>

                <header class="tc-lesson-header">
                    <span class="tc-ai-badge-level">${lesson.badge}</span>
                    <h1 class="tc-lesson-title">${lesson.title}</h1>
                    <div class="tc-lesson-meta">
                        <span>⏱️ Estimasi: ${lesson.estimation}</span> • <span>📚 Tipe: Modul Edukasi Statis</span>
                    </div>
                </header>

                <main class="tc-lesson-body">
                    ${lesson.content}
                </main>

                <footer class="tc-lesson-footer">
                    <button type="button" class="btn-primary" id="tc-finish-lesson-btn">
                        Selesai Membaca Modul
                    </button>
                </footer>
            </div>
        `;
    }
}

export default LessonCard;