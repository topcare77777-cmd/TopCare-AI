// assets/js/coach/coach-state-machine.js
/**
 * @file coach-state-machine.js
 * @description Explicit state machine governing valid AI Coach navigation and playback states.
 * @module Coach/StateMachine
 */

export const COACH_STATES = {
    IDLE: 'IDLE',
    HOME: 'HOME',
    LESSON: 'LESSON',
    VOICE_PLAYING: 'VOICE_PLAYING',
    VOICE_PAUSED: 'VOICE_PAUSED',
    LESSON_COMPLETED: 'LESSON_COMPLETED',
    PROGRAM_COMPLETED: 'PROGRAM_COMPLETED',
    ERROR: 'ERROR'
};

const VALID_TRANSITIONS = {
    [COACH_STATES.IDLE]: [COACH_STATES.HOME, COACH_STATES.ERROR],
    [COACH_STATES.HOME]: [COACH_STATES.LESSON, COACH_STATES.PROGRAM_COMPLETED, COACH_STATES.ERROR],
    [COACH_STATES.LESSON]: [COACH_STATES.VOICE_PLAYING, COACH_STATES.LESSON_COMPLETED, COACH_STATES.HOME, COACH_STATES.ERROR],
    [COACH_STATES.VOICE_PLAYING]: [COACH_STATES.VOICE_PAUSED, COACH_STATES.LESSON, COACH_STATES.LESSON_COMPLETED, COACH_STATES.ERROR],
    [COACH_STATES.VOICE_PAUSED]: [COACH_STATES.VOICE_PLAYING, COACH_STATES.LESSON, COACH_STATES.ERROR],
    [COACH_STATES.LESSON_COMPLETED]: [COACH_STATES.LESSON, COACH_STATES.PROGRAM_COMPLETED, COACH_STATES.HOME, COACH_STATES.ERROR],
    [COACH_STATES.PROGRAM_COMPLETED]: [COACH_STATES.HOME, COACH_STATES.ERROR],
    [COACH_STATES.ERROR]: [COACH_STATES.HOME, COACH_STATES.IDLE]
};

let currentState = COACH_STATES.IDLE;
const listeners = new Set();

export const CoachStateMachine = {
    initialize(initialState = COACH_STATES.IDLE) {
        if (Object.values(COACH_STATES).includes(initialState)) {
            currentState = initialState;
            this.notify();
        }
        return currentState;
    },

    getState() {
        return currentState;
    },

    canTransition(nextState) {
        const allowed = VALID_TRANSITIONS[currentState] || [];
        return allowed.includes(nextState);
    },

    transition(nextState) {
        if (!Object.values(COACH_STATES).includes(nextState)) {
            console.error(`Invalid state target: ${nextState}`);
            return false;
        }

        if (this.canTransition(nextState)) {
            const previousState = currentState;
            currentState = nextState;
            this.notify(previousState, currentState);
            return true;
        }

        console.warn(`Blocked invalid state transition from ${currentState} to ${nextState}`);
        return false;
    },

    reset() {
        currentState = COACH_STATES.IDLE;
        this.notify(null, currentState);
        return currentState;
    },

    subscribe(listener) {
        if (typeof listener === 'function') {
            listeners.add(listener);
        }
        return () => this.unsubscribe(listener);
    },

    unsubscribe(listener) {
        listeners.delete(listener);
    },

    notify(prev, current) {
        for (const listener of listeners) {
            try {
                listener(current, prev);
            } catch (e) {
                console.error("Error in CoachStateMachine listener:", e);
            }
        }
    }
};