/**
 * @file coach.js
 * @description Main controller orchestrating AI Coach lifecycle, state synchronization, voice greeting, and lesson navigation.
 * @module Coach/Controller
 */

import { CoachState, CoachStatus } from './coach-state.js';
import { CoachUI } from './coach-ui.js';
import { CoachPersonality } from './coach-personality.js';
import { CoachLoader } from './coach-loader.js';
import { CoachStorage } from './coach-storage.js';
import { CoachVoice } from './coach-voice.js';
import { CoachEvents } from './coach-events.js';

export const CoachController = {
    lessons: [],

    /**
     * Initializes and mounts the AI Coach application inside the target container.
     * @param {HTMLElement} container 
     */
    async init(container) {
        if (!container) return;

        try {
            // 1. Set loading state & render initial shell
            CoachState.updateRuntime({ status: CoachStatus.LOADING });
            const profile = CoachPersonality.getProfile();
            CoachState.updateProfile(profile);

            container.innerHTML = CoachUI.renderContainer(CoachState.getState('profile'));

            // 2. Load lesson datasets and restore saved progress
            this.lessons = await CoachLoader.loadAllLessons();
            const savedProgress = CoachStorage.loadProgress();
            
            const initialIndex = savedProgress && savedProgress.currentLessonIndex < this.lessons.length 
                ? savedProgress.currentLessonIndex 
                : 0;

            CoachState.updateProgress(initialIndex, this.lessons.length);

            // 3. Subscribe UI to state changes for reactive rendering
            this.setupStateSubscription(container);

            // 4. Bind events via CoachEvents manager
            CoachEvents.bindEvents(container, {
                getCurrentLessonText: () => this.getCurrentLessonSpokenText(),
                onNext: () => this.nextLesson(),
                onPrev: () => this.prevLesson()
            });

            // 5. Render active lesson view
            this.renderActiveLesson(container);

            // 6. Execute automated welcome and initial lesson speech
            this.startWelcomeSequence();

        } catch (err) {
            console.error("Failed to initialize AI Coach controller:", err);
            CoachState.updateRuntime({ status: CoachStatus.ERROR });
            container.innerHTML = `
                <div class="coach-page-wrapper">
                    <div class="coach-shell text-center" style="padding: 4rem 2rem;">
                        <h2 style="color: #ef4444; margin-bottom: 1rem;">Gagal Memuat AI Coach</h2>
                        <p style="color: #9ca3af; margin-bottom: 2rem;">Terjadi kesalahan saat memuat modul pembelajaran. Silakan coba beberapa saat lagi.</p>
                        <a href="#/home" class="btn btn-primary">Kembali ke Beranda</a>
                    </div>
                </div>
            `;
        }
    },

    /**
     * Sets up reactive state subscription to update UI indicators seamlessly.
     * @param {HTMLElement} container 
     */
    setupStateSubscription(container) {
        CoachState.subscribe((currentState) => {
            const statusEl = container.querySelector('#coach-speech-status');
            const statusLabel = container.querySelector('#status-text-label');
            const pulseDot = container.querySelector('.pulse-dot');
            const pauseBtn = container.querySelector('#btn-coach-pause');
            const resumeBtn = container.querySelector('#btn-coach-resume');

            if (!statusEl || !statusLabel || !pulseDot) return;

            const status = currentState.runtime.status;
            statusLabel.textContent = this.getStatusLabelText(status);

            // Update pulse dot style classes
            pulseDot.className = `pulse-dot ${status}`;

            // Toggle pause / resume visibility based on state
            if (pauseBtn && resumeBtn) {
                if (status === CoachStatus.PAUSED) {
                    pauseBtn.classList.add('is-hidden');
                    resumeBtn.classList.remove('is-hidden');
                } else {
                    pauseBtn.classList.remove('is-hidden');
                    resumeBtn.classList.add('is-hidden');
                }
            }
        });
    },

    getStatusLabelText(status) {
        switch (status) {
            case CoachStatus.LOADING: return "Memuat Sistem...";
            case CoachStatus.SPEAKING: return "AI Sedang Berbicara...";
            case CoachStatus.PAUSED: return "Pemutaran Dijeda";
            case CoachStatus.FINISHED: return "Sesi Selesai";
            case CoachStatus.ERROR: return "Terjadi Kesalahan";
            default: return "Siap";
        }
    },

    renderActiveLesson(container) {
        const lessonContainer = container.querySelector('#coach-lesson-container');
        if (!lessonContainer || this.lessons.length === 0) return;

        const runtime = CoachState.getState('runtime');
        const progress = CoachState.getState('progress');
        const currentLesson = this.lessons[runtime.currentLessonIndex];

        lessonContainer.innerHTML = CoachUI.renderLesson(
            currentLesson, 
            runtime.currentLessonIndex, 
            this.lessons.length, 
            progress.percent
        );
    },

    getCurrentLessonSpokenText() {
        const runtime = CoachState.getState('runtime');
        const currentLesson = this.lessons[runtime.currentLessonIndex];
        if (!currentLesson) return "";
        return `${currentLesson.title}. ${currentLesson.content}`;
    },

    startWelcomeSequence() {
        const profile = CoachState.getState('profile');
        let greeting = `Halo ${profile.name}.`;
        
        if (profile.hasAssessment && profile.primary) {
            greeting += ` Berdasarkan hasil asesmen Anda, temperamen utama Anda adalah ${profile.primary}.`;
        } else {
            greeting += ` Mari kita mulai perjalanan pengembangan diri Anda bersama TopCare AI Coach.`;
        }

        const lessonText = this.getCurrentLessonSpokenText();
        const fullSequenceText = `${greeting} ${lessonText}`;

        // Update dialogue box text visually
        const dialogueBox = document.getElementById('coach-dialogue-text');
        if (dialogueBox) {
            dialogueBox.innerHTML = `<p class="coach-greeting-text">🤖 <strong>AI Coach:</strong> ${fullSequenceText}</p>`;
        }

        CoachState.updateRuntime({
            status: CoachStatus.SPEAKING,
            activeSpeechText: fullSequenceText
        });

        CoachVoice.speak(fullSequenceText, () => {
            CoachState.updateRuntime({
                status: CoachStatus.IDLE,
                activeSpeechText: ""
            });
        });
    },

    nextLesson() {
        const runtime = CoachState.getState('runtime');
        if (runtime.currentLessonIndex < this.lessons.length - 1) {
            const nextIdx = runtime.currentLessonIndex + 1;
            CoachState.updateProgress(nextIdx, this.lessons.length);
            CoachStorage.saveProgress(CoachState.getState());

            const container = document.getElementById('main-content');
            this.renderActiveLesson(container);

            // Automatically read new lesson
            const text = this.getCurrentLessonSpokenText();
            CoachState.updateRuntime({ status: CoachStatus.SPEAKING, activeSpeechText: text });
            CoachVoice.speak(text, () => {
                CoachState.updateRuntime({ status: CoachStatus.IDLE, activeSpeechText: "" });
            });
        }
    },

    prevLesson() {
        const runtime = CoachState.getState('runtime');
        if (runtime.currentLessonIndex > 0) {
            const prevIdx = runtime.currentLessonIndex - 1;
            CoachState.updateProgress(prevIdx, this.lessons.length);
            CoachStorage.saveProgress(CoachState.getState());

            const container = document.getElementById('main-content');
            this.renderActiveLesson(container);

            // Automatically read previous lesson
            const text = this.getCurrentLessonSpokenText();
            CoachState.updateRuntime({ status: CoachStatus.SPEAKING, activeSpeechText: text });
            CoachVoice.speak(text, () => {
                CoachState.updateRuntime({ status: CoachStatus.IDLE, activeSpeechText: "" });
            });
        }
    },

    destroy() {
        CoachVoice.destroy();
        CoachState.resetRuntime();
    }
};