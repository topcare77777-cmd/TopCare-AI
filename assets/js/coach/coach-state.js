/**
 * @file coach-state.js
 * @description Enterprise centralized runtime state store with domain separation, frozen status enums, dedicated updaters, and safe deep merging for AI Coach V1/V2.
 * @module Coach/State
 */

export const CoachStatus = Object.freeze({
    IDLE: "idle",
    LOADING: "loading",
    SPEAKING: "speaking",
    PAUSED: "paused",
    FINISHED: "finished",
    ERROR: "error"
});

export const CoachState = {
    state: {
        runtime: {
            status: CoachStatus.IDLE,
            currentLessonIndex: 0,
            activeSpeechText: "",
            lastSpokenText: ""
        },
        progress: {
            totalLessons: 0,
            completedLessonsCount: 0,
            percent: 0
        },
        profile: {
            name: "Sahabat TopCare",
            primary: null,
            secondary: null,
            ageGroup: null,
            hasAssessment: false
        }
    },

    listeners: [],

    /**
     * Internal generic state mutator with shallow domain merging.
     * @param {Object} domainUpdates 
     */
    _commit(domainUpdates) {
        this.state = {
            ...this.state,
            ...domainUpdates
        };
        this.notifyListeners();
    },

    /**
     * Retrieves a deep copy of the current state or specific domain slice.
     * @param {string} [domainKey] - 'runtime' | 'progress' | 'profile'
     * @returns {Object}
     */
    getState(domainKey) {
        const snapshot = JSON.parse(JSON.stringify(this.state));
        return domainKey ? snapshot[domainKey] : snapshot;
    },

    /**
     * Subscribes a listener callback and immediately invokes it with initial state.
     * @param {Function} callback 
     * @returns {Function} Unsubscribe function
     */
    subscribe(callback) {
        this.listeners.push(callback);
        // Immediately invoke with current state snapshot
        callback(this.getState());

        return () => {
            this.listeners = this.listeners.filter(cb => cb !== callback);
        };
    },

    /**
     * Notifies all registered subscribers of state changes.
     */
    notifyListeners() {
        const currentState = this.getState();
        this.listeners.forEach(callback => callback(currentState));
    },

    /**
     * Safely updates runtime domain properties.
     * @param {Object} runtimeUpdates 
     */
    updateRuntime(runtimeUpdates) {
        this._commit({
            runtime: {
                ...this.state.runtime,
                ...runtimeUpdates
            }
        });
    },

    /**
     * Safely updates progress domain properties and auto-calculates percentage.
     * @param {number} currentIndex 
     * @param {number} totalLessons 
     * @param {number} [completedCount] 
     */
    updateProgress(currentIndex, totalLessons, completedCount) {
        const total = totalLessons > 0 ? totalLessons : 1;
        const current = Math.max(0, currentIndex);
        const percent = Math.round(((current + 1) / total) * 100);

        this._commit({
            progress: {
                ...this.state.progress,
                totalLessons: total,
                completedLessonsCount: completedCount !== undefined ? completedCount : current,
                percent: Math.min(100, Math.max(0, percent))
            },
            runtime: {
                ...this.state.runtime,
                currentLessonIndex: current
            }
        });
    },

    /**
     * Safely updates profile domain properties.
     * @param {Object} profileUpdates 
     */
    updateProfile(profileUpdates) {
        this._commit({
            profile: {
                ...this.state.profile,
                ...profileUpdates
            }
        });
    },

    /**
     * Resets runtime state (e.g., when switching active sessions or restarting view).
     */
    resetRuntime() {
        this.updateRuntime({
            status: CoachStatus.IDLE,
            currentLessonIndex: 0,
            activeSpeechText: "",
            lastSpokenText: ""
        });
    },

    /**
     * Fully resets state including progress and profile back to factory baseline.
     */
    resetAll() {
        this.state = {
            runtime: {
                status: CoachStatus.IDLE,
                currentLessonIndex: 0,
                activeSpeechText: "",
                lastSpokenText: ""
            },
            progress: {
                totalLessons: 0,
                completedLessonsCount: 0,
                percent: 0
            },
            profile: {
                name: "Sahabat TopCare",
                primary: null,
                secondary: null,
                ageGroup: null,
                hasAssessment: false
            }
        };
        this.notifyListeners();
    }
};