/**
 * TOPCARE AI PLATFORM V2 — LEARNING HUB RENDERER
 * Path: assets/js/learning/learning.renderer.js
 * Status: APPROVED & LOCKED (BUILD 128.4 — BACKGROUND IMAGE LAYOUT)
 * SRP: Pure UI Component templates generator with background image positioning.
 */

import AssetsRegistry from '../core/registries/assets.registry.js';
import AI_DASAR_MODULES from './ai/basic/basic.modules.js';

export const LearningRenderer = {
    /**
     * LAYER 1: Index Hub Selection (Personality vs AI)
     */
    renderHubSelection() {
        return `
            <div class="tc-learning-container">
                <!-- BACKGROUND PREVIEW IMAGE LAYER -->
                <div class="tc-learning-bg-preview">
                    <img src="${AssetsRegistry.images.learning.center}" 
                         alt="Learning Center Background" 
                         class="tc-image-bg-effect" 
                         loading="lazy" 
                         decoding="async">
                </div>

                <header class="tc-learning-hero">
                    <div class="tc-learning-hero-glow"></div>
                    <span class="tc-learning-badge">Pusat Belajar TopCare AI</span>
                    <h1 class="tc-learning-title">Pilih Kategori Pembelajaran</h1>
                    <p class="tc-learning-subtitle">
                        Pilih jalur pembelajaran yang ingin Anda dalami hari ini untuk meningkatkan potensi diri dan keterampilan teknis.
                    </p>
                </header>

                <div class="tc-hub-selection-grid">
                    <!-- PERSONALITY CARD -->
                    <article class="tc-hub-card tc-card-personality">
                        <div class="tc-hub-card-header">
                            <span class="tc-hub-icon">🧠</span>
                            <span class="tc-hub-badge-status">Modul Interaktif</span>
                        </div>
                        <h2 class="tc-hub-card-title">Belajar Personality Plus</h2>
                        <p class="tc-hub-card-desc">
                            Pahami karakter diri, empat temperamen dasar (Koleris, Sanguinis, Melankolis, Plegmatis), dan strategi komunikasi karya Florence Littauer.
                        </p>
                        <div class="tc-hub-card-footer">
                            <button type="button" class="btn-primary tc-btn-hub-select" id="tc-select-personality-btn">
                                Masuk Pembelajaran Personality →
                            </button>
                        </div>
                    </article>

                    <!-- AI CARD -->
                    <article class="tc-hub-card tc-card-ai">
                        <div class="tc-hub-card-header">
                            <span class="tc-hub-icon">🤖</span>
                            <span class="tc-hub-badge-status">3 Tingkat Level</span>
                        </div>
                        <h2 class="tc-hub-card-title">Belajar AI (Artificial Intelligence)</h2>
                        <p class="tc-hub-card-desc">
                            Eksplorasi modul kecerdasan buatan terstruktur yang dibagi ke dalam 3 Tingkat Pembelajaran: Level Dasar, Menengah, dan Mahir.
                        </p>
                        <div class="tc-hub-card-footer">
                            <button type="button" class="btn-primary tc-btn-hub-select tc-btn-ai" id="tc-select-ai-btn">
                                Masuk Pembelajaran AI →
                            </button>
                        </div>
                    </article>
                </div>
            </div>
        `;
    },

    /**
     * LAYER 2: AI Level Selection Hub
     */
    renderAiLevelSelection() {
        return `
            <div class="tc-learning-container">
                <button type="button" class="tc-btn-back-hub" id="tc-back-to-hub-btn">
                    ← Kembali ke Pilihan Belajar Utama
                </button>

                <header class="tc-learning-hero tc-hero-left">
                    <span class="tc-learning-badge">🤖 Modul Artificial Intelligence</span>
                    <h1 class="tc-learning-title">Pilih Tingkat Pembelajaran AI</h1>
                    <p class="tc-learning-subtitle">
                        Pilih tingkat kedalaman materi AI yang sesuai dengan kebutuhan dan pemahaman Anda saat ini.
                    </p>
                </header>

                <div class="tc-ai-levels-grid">
                    <article class="tc-ai-level-card">
                        <div class="tc-level-card-top">
                            <span class="tc-level-icon">🌱</span>
                            <span class="tc-level-tag tag-dasar">Level 1</span>
                        </div>
                        <h3>AI Tingkat Dasar</h3>
                        <p>Pengantar awal konsep kecerdasan buatan, Machine Learning dasar, serta etika dan privasi penggunaan AI.</p>
                        <span class="tc-level-count">${AI_DASAR_MODULES.length} Modul Pembelajaran</span>
                        <button type="button" class="tc-btn-level-select" id="tc-select-ai-dasar-btn">
                            Buka Level Dasar →
                        </button>
                    </article>

                    <article class="tc-ai-level-card">
                        <div class="tc-level-card-top">
                            <span class="tc-level-icon">🌿</span>
                            <span class="tc-level-tag tag-menengah">Level 2</span>
                        </div>
                        <h3>AI Tingkat Menengah</h3>
                        <p>Pendalaman Deep Learning, Large Language Models (LLM), Generative AI, dan struktur Prompt Engineering.</p>
                        <span class="tc-level-count">4 Modul Pembelajaran</span>
                        <button type="button" class="tc-btn-level-select" id="tc-select-ai-menengah-btn" disabled style="opacity: 0.6; cursor: not-allowed;">
                            Segera Hadir
                        </button>
                    </article>

                    <article class="tc-ai-level-card">
                        <div class="tc-level-card-top">
                            <span class="tc-level-icon">🌳</span>
                            <span class="tc-level-tag tag-mahir">Level 3</span>
                        </div>
                        <h3>AI Tingkat Mahir</h3>
                        <p>Penerapan praktis AI untuk produktivitas kerja, strategi bisnis, pendidikan, dan navigasi ekosistem tools AI.</p>
                        <span class="tc-level-count">4 Modul Pembelajaran</span>
                        <button type="button" class="tc-btn-level-select" id="tc-select-ai-mahir-btn" disabled style="opacity: 0.6; cursor: not-allowed;">
                            Segera Hadir
                        </button>
                    </article>
                </div>
            </div>
        `;
    },

    /**
     * LAYER 3: AI Module List View for Level Dasar
     */
    renderAiDasarModules() {
        return `
            <div class="tc-learning-container">
                <button type="button" class="tc-btn-back-hub" id="tc-back-to-ai-levels-btn">
                    ← Kembali ke Pilihan Tingkat AI
                </button>

                <header class="tc-learning-hero tc-hero-left">
                    <span class="tc-learning-badge">🤖 Pembelajaran AI — Level Dasar</span>
                    <h1 class="tc-learning-title">Modul AI Tingkat Dasar</h1>
                    <p class="tc-learning-subtitle">
                        Klik salah satu modul di bawah ini untuk membaca isi pembahasan materi lengkap.
                    </p>
                </header>

                <div class="tc-ai-grid">
                    ${AI_DASAR_MODULES.map(m => `
                        <article class="tc-ai-card tc-ai-clickable-card" data-lesson-id="${m.id}">
                            <div class="tc-ai-card-top">
                                <span class="tc-ai-icon">${m.icon}</span>
                                <span class="tc-ai-badge">${m.badge}</span>
                            </div>
                            <h3 class="tc-ai-title">${m.title}</h3>
                            <p class="tc-ai-desc">${m.description}</p>
                            <div class="tc-card-points-box">
                                <ul class="tc-learning-list">
                                    ${m.learningPoints ? m.learningPoints.map(pt => `<li>✓ ${pt}</li>`).join('') : ''}
                                </ul>
                            </div>
                            <div class="tc-card-action-bar">
                                <button type="button" class="tc-btn-open-lesson" data-lesson-id="${m.id}">
                                    Buka & Pelajari Materi →
                                </button>
                            </div>
                        </article>
                    `).join('')}
                </div>
            </div>
        `;
    },

    /**
     * LAYER 4: AI Lesson Reader View
     */
    renderAiLessonReader(lesson) {
        return `
            <div class="tc-lesson-container">
                <button type="button" class="tc-btn-back-hub" id="tc-back-to-ai-modules-btn">
                    ← Kembali ke Modul Level Dasar
                </button>

                <header class="tc-lesson-header">
                    <span class="tc-ai-badge-level">${lesson.badge}</span>
                    <h1 class="tc-lesson-title">${lesson.title}</h1>
                    <div class="tc-lesson-meta">
                        <span>⏱️ Estimasi: ${lesson.estimation || '30 Menit'}</span> • <span>📚 Tipe: Modul Edukasi Statis</span>
                    </div>
                </header>

                <main class="tc-lesson-body">
                    ${lesson.content}
                </main>

                <footer class="tc-lesson-footer">
                    <button type="button" class="btn-primary" id="tc-finish-ai-lesson-btn">
                        Selesai Membaca Modul
                    </button>
                </footer>
            </div>
        `;
    },

    renderPersonalityDetail(course) {
        return `
            <div class="tc-learning-container">
                <button type="button" class="tc-btn-back-hub" id="tc-back-to-hub-btn">
                    ← Kembali ke Pilihan Belajar
                </button>

                <header class="tc-learning-hero tc-hero-left">
                    <span class="tc-learning-badge">📚 Modul Personality Plus</span>
                    <h1 class="tc-learning-title">${course.title}</h1>
                    <p class="tc-learning-subtitle">${course.subtitle} — Berdasarkan karya ${course.author}</p>
                </header>

                <div class="tc-learning-single-grid">
                    <article class="tc-course-card">
                        <div class="tc-card-header">
                            <div class="tc-card-header-text">
                                <h2>${course.title}</h2>
                                <p class="tc-card-author">Oleh ${course.author}</p>
                            </div>
                        </div>
                        <p class="tc-card-description">${course.description}</p>
                        
                        <div class="tc-chapter-preview">
                            <h3 class="tc-preview-title">Daftar Bab Pembelajaran:</h3>
                            <ul class="tc-chapter-list-preview">
                                ${course.chapters.map((chapterItem) => `
                                    <li><span class="tc-chapter-num">✓</span> ${chapterItem.title}</li>
                                `).join('')}
                            </ul>
                        </div>

                        <div class="tc-card-action">
                            <button type="button" class="btn-primary tc-btn-start" id="tc-start-course-btn">
                                Mulai Membaca Modul
                            </button>
                        </div>
                    </article>
                </div>
            </div>
        `;
    },

    renderReader(course, activeChapterIndex) {
        const chapter = course.chapters[activeChapterIndex];
        const totalChapters = course.chapters.length;

        return `
            <div class="tc-reader-container">
                <div class="tc-reader-sidebar">
                    <button type="button" class="tc-btn-back" id="tc-back-to-detail-btn">
                        ← Kembali ke Modul Personality
                    </button>
                    <h3 class="tc-sidebar-title">${course.title}</h3>
                    <nav class="tc-chapter-nav">
                        ${course.chapters.map((navChapter, navIdx) => `
                            <button type="button" 
                                    class="tc-chapter-nav-btn ${navIdx === activeChapterIndex ? 'active' : ''}" 
                                    data-index="${navIdx}">
                                <span class="tc-nav-step">${navIdx + 1}</span>
                                <span class="tc-nav-label">${navChapter.title}</span>
                            </button>
                        `).join('')}
                    </nav>
                </div>

                <main class="tc-reader-main">
                    <div class="tc-reader-header">
                        <span class="tc-reader-progress-label">Bab ${activeChapterIndex + 1} dari ${totalChapters}</span>
                        <h2 class="tc-reader-chapter-title">${chapter.title}</h2>
                    </div>

                    <div class="tc-reader-body">
                        ${chapter.type === 'QUIZ' ? this._renderQuiz(chapter) : chapter.content}
                    </div>

                    <footer class="tc-reader-footer">
                        <button type="button" 
                                class="tc-btn-nav-prev" 
                                id="tc-prev-chapter-btn" 
                                ${activeChapterIndex === 0 ? 'disabled' : ''}>
                            ← Bab Sebelumnya
                        </button>
                        <button type="button" 
                                class="btn-primary tc-btn-nav-next" 
                                id="tc-next-chapter-btn" 
                                ${activeChapterIndex === totalChapters - 1 ? 'disabled' : ''}>
                            Bab Selanjutnya →
                        </button>
                    </footer>
                </main>
            </div>
        `;
    },

    _renderQuiz(chapter) {
        return `
            <div class="tc-quiz-wrapper">
                <p class="tc-quiz-intro">Uji pemahaman Anda mengenai materi empat temperamen Personality Plus dengan menjawab pertanyaan berikut:</p>
                <form id="tc-quiz-form">
                    ${chapter.questions.map((quizQuestion, qIdx) => `
                        <fieldset class="tc-quiz-fieldset">
                            <legend class="tc-quiz-question">${qIdx + 1}. ${quizQuestion.question}</legend>
                            <div class="tc-quiz-options">
                                ${quizQuestion.options.map((optionText, oIdx) => `
                                    <label class="tc-quiz-option">
                                        <input type="radio" name="q_${quizQuestion.id}" value="${oIdx}" required>
                                        <span>${optionText}</span>
                                    </label>
                                `).join('')}
                            </div>
                        </fieldset>
                    `).join('')}
                    <button type="submit" class="btn-primary tc-btn-submit-quiz">Kirim Jawaban</button>
                </form>
                <div id="tc-quiz-result" class="tc-quiz-result-box" style="display: none;"></div>
            </div>
        `;
    }
};

export default LearningRenderer;