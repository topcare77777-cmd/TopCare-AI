/**
 * TOPCARE AI PLATFORM V2 — LEARNING CONTROLLER
 * Path: assets/js/learning/learning.controller.js
 * Status: APPROVED & LOCKED (BUILD 128 - MULTI-LAYER CONTROLLER)
 * SRP: Manages state transitions across Layer 1 (Hub), Layer 2 (AI Levels), Layer 3 (AI Modules), and Layer 4 (AI Reader).
 */

import { PERSONALITY_PLUS_COURSE } from './learning.data.js';
import { LearningRenderer } from './learning.renderer.js';
import { LearningNavigator } from './learning.navigator.js';
import AI_DASAR_MODULES from './ai/basic/basic.modules.js';

export class LearningController {
    constructor(container) {
        this.container = container;
        this.course = PERSONALITY_PLUS_COURSE;
        this.aiModules = AI_DASAR_MODULES;
        this.navigator = new LearningNavigator(this.course.chapters.length);
        this.activeAiLesson = null;
        
        // VIEW STATES: 'HUB' (Layer 1) | 'AI_LEVELS' (Layer 2) | 'AI_MODULES_DASAR' (Layer 3) | 'AI_READER' (Layer 4) | 'PERSONALITY_DETAIL' | 'READER'
        this.viewState = 'HUB'; 
    }

    init() {
        this.render();
    }

    render() {
        if (!this.container) return;

        switch (this.viewState) {
            case 'HUB': // Layer 1
                this.container.innerHTML = LearningRenderer.renderHubSelection();
                this._bindHubEvents();
                break;

            case 'AI_LEVELS': // Layer 2 (Pilihan Tingkatan Dasar, Menengah, Mahir)
                this.container.innerHTML = LearningRenderer.renderAiLevelSelection();
                this._bindAiLevelEvents();
                break;

            case 'AI_MODULES_DASAR': // Layer 3 (Daftar Modul Tingkat Dasar)
                this.container.innerHTML = LearningRenderer.renderAiDasarModules();
                this._bindAiModuleEvents();
                break;

            case 'AI_READER': // Layer 4 (Membaca Isi Modul AI)
                if (this.activeAiLesson) {
                    this.container.innerHTML = LearningRenderer.renderAiLessonReader(this.activeAiLesson);
                    this._bindAiReaderEvents();
                } else {
                    this.viewState = 'AI_MODULES_DASAR';
                    this.render();
                }
                break;

            case 'PERSONALITY_DETAIL':
                this.container.innerHTML = LearningRenderer.renderPersonalityDetail(this.course);
                this._bindPersonalityDetailEvents();
                break;

            case 'READER':
                this.container.innerHTML = LearningRenderer.renderReader(
                    this.course, 
                    this.navigator.getCurrentIndex()
                );
                this._bindReaderEvents();
                break;

            default:
                this.container.innerHTML = LearningRenderer.renderHubSelection();
                this._bindHubEvents();
                break;
        }
    }

    // LAYER 1 EVENTS
    _bindHubEvents() {
        const selectPersonalityBtn = this.container.querySelector('#tc-select-personality-btn');
        const selectAiBtn = this.container.querySelector('#tc-select-ai-btn');

        if (selectPersonalityBtn) {
            selectPersonalityBtn.onclick = () => {
                this.viewState = 'PERSONALITY_DETAIL';
                this.render();
                window.scrollTo({ top: 0, behavior: 'smooth' });
            };
        }

        if (selectAiBtn) {
            selectAiBtn.onclick = () => {
                this.viewState = 'AI_LEVELS'; // Pindah ke Layer 2
                this.render();
                window.scrollTo({ top: 0, behavior: 'smooth' });
            };
        }
    }

    // LAYER 2 EVENTS (Pilihan Level)
    _bindAiLevelEvents() {
        const backToHubBtn = this.container.querySelector('#tc-back-to-hub-btn');
        const selectDasarBtn = this.container.querySelector('#tc-select-ai-dasar-btn');

        if (backToHubBtn) {
            backToHubBtn.onclick = () => {
                this.viewState = 'HUB'; // Kembali ke Layer 1
                this.render();
                window.scrollTo({ top: 0, behavior: 'smooth' });
            };
        }

        if (selectDasarBtn) {
            selectDasarBtn.onclick = () => {
                this.viewState = 'AI_MODULES_DASAR'; // Pindah ke Layer 3
                this.render();
                window.scrollTo({ top: 0, behavior: 'smooth' });
            };
        }
    }

    // LAYER 3 EVENTS (Daftar Modul Dasar 1, 2, 3)
    _bindAiModuleEvents() {
        const backToLevelsBtn = this.container.querySelector('#tc-back-to-ai-levels-btn');
        const openLessonBtns = this.container.querySelectorAll('.tc-btn-open-lesson, .tc-ai-clickable-card');

        if (backToLevelsBtn) {
            backToLevelsBtn.onclick = () => {
                this.viewState = 'AI_LEVELS'; // Kembali ke Layer 2
                this.render();
                window.scrollTo({ top: 0, behavior: 'smooth' });
            };
        }

        openLessonBtns.forEach(btn => {
            btn.onclick = (e) => {
                e.stopPropagation();
                const lessonId = btn.getAttribute('data-lesson-id');
                const selectedModule = this.aiModules.find(m => m.id === lessonId);
                
                if (selectedModule) {
                    this.activeAiLesson = selectedModule;
                    this.viewState = 'AI_READER'; // Pindah ke Layer 4
                    this.render();
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                }
            };
        });
    }

    // LAYER 4 EVENTS (Membaca Modul)
    _bindAiReaderEvents() {
        const backToModulesBtn = this.container.querySelector('#tc-back-to-ai-modules-btn');
        const finishLessonBtn = this.container.querySelector('#tc-finish-ai-lesson-btn');

        const returnToModules = () => {
            this.activeAiLesson = null;
            this.viewState = 'AI_MODULES_DASAR'; // Kembali ke Layer 3
            this.render();
            window.scrollTo({ top: 0, behavior: 'smooth' });
        };

        if (backToModulesBtn) backToModulesBtn.onclick = returnToModules;
        if (finishLessonBtn) finishLessonBtn.onclick = returnToModules;
    }

    _bindPersonalityDetailEvents() {
        const backToHubBtn = this.container.querySelector('#tc-back-to-hub-btn');
        const startCourseBtn = this.container.querySelector('#tc-start-course-btn');

        if (backToHubBtn) {
            backToHubBtn.onclick = () => {
                this.viewState = 'HUB';
                this.render();
                window.scrollTo({ top: 0, behavior: 'smooth' });
            };
        }

        if (startCourseBtn) {
            startCourseBtn.onclick = () => {
                this.navigator.setIndex(0);
                this.viewState = 'READER';
                this.render();
                window.scrollTo({ top: 0, behavior: 'smooth' });
            };
        }
    }

    _bindReaderEvents() {
        const backToDetailBtn = this.container.querySelector('#tc-back-to-detail-btn');
        const prevBtn = this.container.querySelector('#tc-prev-chapter-btn');
        const nextBtn = this.container.querySelector('#tc-next-chapter-btn');
        const navBtns = this.container.querySelectorAll('.tc-chapter-nav-btn');
        const quizForm = this.container.querySelector('#tc-quiz-form');

        if (backToDetailBtn) {
            backToDetailBtn.onclick = () => {
                this.viewState = 'PERSONALITY_DETAIL';
                this.render();
                window.scrollTo({ top: 0, behavior: 'smooth' });
            };
        }

        if (prevBtn) {
            prevBtn.onclick = () => {
                this.navigator.previous();
                this.render();
                window.scrollTo({ top: 0, behavior: 'smooth' });
            };
        }

        if (nextBtn) {
            nextBtn.onclick = () => {
                this.navigator.next();
                this.render();
                window.scrollTo({ top: 0, behavior: 'smooth' });
            };
        }

        navBtns.forEach(btn => {
            btn.onclick = () => {
                const idx = parseInt(btn.getAttribute('data-index'), 10);
                if (!isNaN(idx)) {
                    this.navigator.setIndex(idx);
                    this.render();
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                }
            };
        });

        if (quizForm) {
            quizForm.onsubmit = (e) => {
                e.preventDefault();
                this._evaluateQuiz(quizForm);
            };
        }
    }

    _evaluateQuiz(form) {
        const resultBox = this.container.querySelector('#tc-quiz-result');
        if (!resultBox) return;

        const currentChapter = this.course.chapters[this.navigator.getCurrentIndex()];
        if (!currentChapter || !currentChapter.questions) return;

        let score = 0;
        const total = currentChapter.questions.length;

        currentChapter.questions.forEach(q => {
            const selected = form.querySelector(`input[name="q_${q.id}"]:checked`);
            if (selected && parseInt(selected.value, 10) === q.answerIndex) {
                score++;
            }
        });

        resultBox.style.display = 'block';
        resultBox.innerHTML = `
            <h4>Hasil Tes Pemahaman</h4>
            <p>Skor Anda: <strong>${score} / ${total}</strong> (${Math.round((score / total) * 100)}%)</p>
            <p>${score === total ? 'Sempurna! Anda telah memahami konsep dasar empat temperamen dengan sangat baik.' : 'Bagus! Anda dapat membaca ulang materi untuk lebih mendalami kepribadian.'}</p>
        `;
    }
}

export default LearningController;