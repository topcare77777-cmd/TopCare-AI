/**
 * @file coach-voice.js
 * @description Enterprise text-to-speech voice engine wrapper using browser window.speechSynthesis API with voice loading listener, lastText tracking, volume/rate/pitch control, and cleanup capabilities.
 * @module Coach/Voice
 */

export const CoachVoice = {
    synth: window.speechSynthesis,
    currentUtterance: null,
    queueList: [],
    isPausedState: false,
    lastText: "",
    selectedVoice: null,
    speechRate: 1.0,
    speechPitch: 1.0,
    speechVolume: 1.0,

    init() {
        if (!this.synth) return;
        
        // Ensure voices are loaded across browsers (Chrome, Edge, etc.)
        this.loadVoices();
        if (typeof this.synth.onvoiceschanged !== 'undefined') {
            this.synth.onvoiceschanged = () => {
                this.loadVoices();
            };
        }
    },

    loadVoices() {
        if (!this.synth) return;
        const voices = this.synth.getVoices();
        // Try to find a preferred Indonesian voice, or fallback to any available
        const indonesianVoice = voices.find(v => v.lang.includes('id') || v.lang.includes('ID'));
        if (indonesianVoice) {
            this.selectedVoice = indonesianVoice;
        } else if (voices.length > 0 && !this.selectedVoice) {
            this.selectedVoice = voices[0];
        }
    },

    /**
     * Checks if speech synthesis is supported by the browser.
     * @returns {boolean}
     */
    isSupported() {
        return typeof window !== 'undefined' && 'speechSynthesis' in window;
    },

    /**
     * Speaks the provided text using SpeechSynthesisUtterance.
     * @param {string} text 
     * @param {Function} [onEndCallback] 
     */
    speak(text, onEndCallback) {
        if (!this.isSupported()) {
            console.warn("SpeechSynthesis is not supported in this browser.");
            if (onEndCallback) onEndCallback();
            return;
        }

        // Save last text internally for parameterless repeat()
        if (text) {
            this.lastText = text;
        }

        // Stop any ongoing speech before starting new
        this.stop();

        const utteranceText = text || this.lastText;
        if (!utteranceText) {
            if (onEndCallback) onEndCallback();
            return;
        }

        const utterance = new SpeechSynthesisUtterance(utteranceText);
        utterance.lang = 'id-ID';
        utterance.rate = this.speechRate;
        utterance.pitch = this.speechPitch;
        utterance.volume = this.speechVolume;

        // Ensure voices are loaded if list was previously empty
        if (!this.selectedVoice) {
            this.loadVoices();
        }
        if (this.selectedVoice) {
            utterance.voice = this.selectedVoice;
        }

        utterance.onend = () => {
            this.currentUtterance = null;
            if (onEndCallback) onEndCallback();
            this.processQueue();
        };

        utterance.onerror = (event) => {
            console.error("SpeechSynthesis error:", event);
            this.currentUtterance = null;
            if (onEndCallback) onEndCallback();
        };

        this.currentUtterance = utterance;
        this.synth.speak(utterance);
    },

    /**
     * Stops current speech and clears queue.
     */
    stop() {
        if (this.synth) {
            this.synth.cancel();
            this.currentUtterance = null;
            this.queueList = [];
            this.isPausedState = false;
        }
    },

    /**
     * Pauses current speech.
     */
    pause() {
        if (this.synth && this.synth.speaking && !this.isPausedState) {
            this.synth.pause();
            this.isPausedState = true;
        }
    },

    /**
     * Resumes paused speech.
     */
    resume() {
        if (this.synth && this.isPausedState) {
            this.synth.resume();
            this.isPausedState = false;
        }
    },

    /**
     * Repeats the last spoken text without requiring parameters.
     * @param {Function} [onEndCallback] 
     */
    repeat(onEndCallback) {
        if (this.lastText) {
            this.speak(this.lastText, onEndCallback);
        } else if (onEndCallback) {
            onEndCallback();
        }
    },

    /**
     * Checks if speech synthesis is currently speaking.
     * @returns {boolean}
     */
    isSpeaking() {
        return this.synth ? this.synth.speaking && !this.isPausedState : false;
    },

    /**
     * Adds text items to the speech queue.
     * @param {string} text 
     */
    queue(text) {
        if (text) {
            this.queueList.push(text);
        }
        if (!this.isSpeaking() && !this.synth.speaking) {
            this.processQueue();
        }
    },

    /**
     * Processes next item in queue.
     */
    processQueue() {
        if (this.queueList.length > 0 && !this.isSpeaking()) {
            const nextText = this.queueList.shift();
            this.speak(nextText);
        }
    },

    /**
     * Sets a specific voice object.
     * @param {SpeechSynthesisVoice} voice 
     */
    setVoice(voice) {
        this.selectedVoice = voice;
    },

    /**
     * Sets speech rate (speed).
     * @param {number} rate 
     */
    setRate(rate) {
        this.speechRate = rate;
    },

    /**
     * Sets speech pitch.
     * @param {number} pitch 
     */
    setPitch(pitch) {
        this.speechPitch = pitch;
    },

    /**
     * Sets speech volume.
     * @param {number} volume 
     */
    setVolume(volume) {
        this.speechVolume = volume;
    },

    /**
     * Cleans up state, cancels active speech, and clears queues for router page changes.
     */
    destroy() {
        this.stop();
        this.lastText = "";
        this.queueList = [];
    }
};

// Auto-initialize voice loading listeners on module load
CoachVoice.init();