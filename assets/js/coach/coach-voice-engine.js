// assets/js/coach/coach-voice-engine.js
/**
 * @file coach-voice-engine.js
 * @description Core audio synthesis engine wrapping the native SpeechSynthesis API with enterprise voice loading support.
 * @module Coach/VoiceEngine
 */

import { CoachVoiceState } from './coach-voice-state.js';

export const CoachVoiceEngine = {
    isSupported() {
        return typeof window !== 'undefined' && 'speechSynthesis' in window && 'SpeechSynthesisUtterance' in window;
    },

    getVoices() {
        if (!this.isSupported()) return [];
        const voices = window.speechSynthesis.getVoices();
        if (voices.length > 0) return voices;

        return new Promise((resolve) => {
            if (!window.speechSynthesis) {
                resolve([]);
                return;
            }
            const handler = () => {
                window.speechSynthesis.removeEventListener('voiceschanged', handler);
                resolve(window.speechSynthesis.getVoices());
            };
            window.speechSynthesis.addEventListener('voiceschanged', handler);
            setTimeout(() => {
                window.speechSynthesis.removeEventListener('voiceschanged', handler);
                resolve(window.speechSynthesis.getVoices());
            }, 500);
        });
    },

    async speak(text) {
        if (!this.isSupported() || !text) return false;

        const synth = window.speechSynthesis;

        if (synth.speaking) {
            synth.cancel();
        }

        const utterance = new SpeechSynthesisUtterance(text);
        const state = CoachVoiceState.get();

        utterance.rate = state.rate;
        utterance.pitch = state.pitch;
        utterance.volume = state.volume;

        const voices = await this.getVoices();
        if (state.selectedVoice) {
            utterance.voice = state.selectedVoice;
        } else {
            const indonesianVoice = voices.find(v => v.lang.includes('id') || v.lang.includes('ID'));
            if (indonesianVoice) {
                utterance.voice = indonesianVoice;
            }
        }

        utterance.onstart = () => {
            CoachVoiceState.set({ speaking: true, paused: false, enabled: true });
        };

        utterance.onend = () => {
            CoachVoiceState.reset();
        };

        utterance.onerror = (e) => {
            console.error("SpeechSynthesis error:", e);
            CoachVoiceState.reset();
        };

        synth.speak(utterance);
        return true;
    },

    pause() {
        if (!this.isSupported()) return;
        const synth = window.speechSynthesis;
        if (synth.speaking && !synth.paused) {
            synth.pause();
            CoachVoiceState.set({ paused: true, speaking: false });
        }
    },

    resume() {
        if (!this.isSupported()) return;
        const synth = window.speechSynthesis;
        if (synth.paused) {
            synth.resume();
            CoachVoiceState.set({ paused: false, speaking: true });
        }
    },

    stop() {
        if (!this.isSupported()) return;
        const synth = window.speechSynthesis;
        if (synth.speaking || synth.paused) {
            synth.cancel();
            CoachVoiceState.reset();
        }
    }
};