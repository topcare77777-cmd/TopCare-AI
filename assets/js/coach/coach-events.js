/**
 * @file coach-events.js
 * @description Centralized event delegation and user interaction handler for AI Coach V1.
 * @module Coach/Events
 */

import { CoachState, CoachStatus } from './coach-state.js';
import { CoachVoice } from './coach-voice.js';
import { CoachStorage } from './coach-storage.js';

export const CoachEvents = {
    /**
     * Binds all DOM interaction events for the AI Coach interface.
     * @param {Object} container - The container element or root DOM scope
     * @param {Object} callbacks - Controller callbacks for complex actions (next, prev, home, render)
     */
    bindEvents(container, callbacks = {}) {
        if (!container) return;

        // Helper event listener matcher
        container.addEventListener('click', (e) => {
            const target = e.target.closest('button');
            if (!target) return;

            const id = target.id;

            switch (id) {
                case 'btn-coach-listen':
                    this.handleListen(callbacks.getCurrentLessonText);
                    break;

                case 'btn-coach-repeat':
                    this.handleRepeat();
                    break;

                case 'btn-coach-pause':
                    this.handlePause();
                    break;

                case 'btn-coach-resume':
                    this.handleResume();
                    break;

                case 'btn-coach-next':
                    if (callbacks.onNext) callbacks.onNext();
                    break;

                case 'btn-coach-prev':
                    if (callbacks.onPrev) callbacks.onPrev();
                    break;

                case 'btn-coach-home':
                    this.handleHome();
                    break;

                default:
                    break;
            }
        });
    },

    handleListen(getLessonTextCallback) {
        if (typeof getLessonTextCallback !== 'function') return;
        const text = getLessonTextCallback();
        if (!text) return;

        CoachState.updateRuntime({
            status: CoachStatus.SPEAKING,
            activeSpeechText: text
        });

        CoachVoice.speak(text, () => {
            CoachState.updateRuntime({
                status: CoachStatus.IDLE,
                activeSpeechText: ""
            });
        });
    },

    handleRepeat() {
        CoachState.updateRuntime({
            status: CoachStatus.SPEAKING
        });

        CoachVoice.repeat(() => {
            CoachState.updateRuntime({
                status: CoachStatus.IDLE
            });
        });
    },

    handlePause() {
        CoachVoice.pause();
        CoachState.updateRuntime({
            status: CoachStatus.PAUSED
        });
    },

    handleResume() {
        CoachVoice.resume();
        CoachState.updateRuntime({
            status: CoachStatus.SPEAKING
        });
    },

    handleHome() {
        CoachVoice.destroy();
        CoachState.resetRuntime();
        window.location.hash = '#/home';
    }
};