// assets/js/coach/coach-voice-state.js
/**
 * @file coach-voice-state.js
 * @description Pure state container for Voice Coach configuration and playback status.
 * @module Coach/VoiceState
 */

const voiceState = {
    enabled: false,
    speaking: false,
    paused: false,
    selectedVoice: null,
    rate: 1,
    pitch: 1,
    volume: 1
};

export const CoachVoiceState = {
    get() {
        return { ...voiceState };
    },

    set(newState) {
        Object.assign(voiceState, newState);
    },

    reset() {
        voiceState.speaking = false;
        voiceState.paused = false;
    }
};