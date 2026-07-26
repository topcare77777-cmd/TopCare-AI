// assets/js/coach/coach-voice-events.js
/**
 * @file coach-voice-events.js
 * @description Event binder connecting UI action triggers to the CoachVoiceEngine with enterprise event listeners.
 * @module Coach/VoiceEvents
 */

import { CoachVoiceEngine } from './coach-voice-engine.js';

export const CoachVoiceEvents = {
    bind(containerElement) {
        if (!containerElement || !CoachVoiceEngine.isSupported()) return;

        if (window.speechSynthesis) {
            window.speechSynthesis.addEventListener(
                "voiceschanged",
                () => {
                    CoachVoiceEngine.getVoices();
                },
                { once: true }
            );
        }

        const playBtn = containerElement.querySelector('[data-action="voice-play"]');
        const pauseBtn = containerElement.querySelector('[data-action="voice-pause"]');
        const resumeBtn = containerElement.querySelector('[data-action="voice-resume"]');
        const stopBtn = containerElement.querySelector('[data-action="voice-stop"]');

        const textSource = containerElement.querySelector('.coach-lesson-box p, .coach-dashboard-card p');

        if (playBtn && textSource) {
            playBtn.addEventListener('click', () => {
                const textToSpeak = textSource.innerText || textSource.textContent;
                CoachVoiceEngine.speak(textToSpeak);
            });
        }

        if (pauseBtn) {
            pauseBtn.addEventListener('click', () => {
                CoachVoiceEngine.pause();
            });
        }

        if (resumeBtn) {
            resumeBtn.addEventListener('click', () => {
                CoachVoiceEngine.resume();
            });
        }

        if (stopBtn) {
            stopBtn.addEventListener('click', () => {
                CoachVoiceEngine.stop();
            });
        }
    }
};