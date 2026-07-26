// assets/js/coach/coach-analytics.js
/**
 * @file coach-analytics.js
 * @description Decoupled local analytics engine that listens to CoachEventBus and aggregates usage statistics independently.
 * @module Coach/Analytics
 */

import { CoachEventBus } from './coach-event-bus.js';

const ANALYTICS_STORAGE_KEY = "topcare-ai-analytics-v1";

let stats = {
    lessonsOpened: 0,
    lessonsCompleted: 0,
    voiceSessions: 0,
    achievementsUnlocked: 0,
    programsCompleted: 0,
    lastActivity: null
};

let isInitialized = false;

export const CoachAnalytics = {
    initialize() {
        if (isInitialized) return;

        this.loadStorage();
        this.registerListeners();
        isInitialized = true;
    },

    loadStorage() {
        try {
            const raw = localStorage.getItem(ANALYTICS_STORAGE_KEY);
            if (raw) {
                const parsed = JSON.parse(raw);
                stats = {
                    lessonsOpened: Number(parsed.lessonsOpened) || 0,
                    lessonsCompleted: Number(parsed.lessonsCompleted) || 0,
                    voiceSessions: Number(parsed.voiceSessions) || 0,
                    achievementsUnlocked: Number(parsed.achievementsUnlocked) || 0,
                    programsCompleted: Number(parsed.programsCompleted) || 0,
                    lastActivity: parsed.lastActivity || null
                };
            }
        } catch (e) {
            console.error("Failed to load analytics storage:", e);
        }
    },

    saveStorage() {
        try {
            stats.lastActivity = new Date().toISOString();
            localStorage.setItem(ANALYTICS_STORAGE_KEY, JSON.stringify(stats));
        } catch (e) {
            console.error("Failed to save analytics storage:", e);
        }
    },

    registerListeners() {
        CoachEventBus.on('coach:lesson:opened', () => {
            this.increment('lessonsOpened');
        });

        CoachEventBus.on('coach:lesson:completed', () => {
            this.increment('lessonsCompleted');
        });

        CoachEventBus.on('coach:voice:start', () => {
            this.increment('voiceSessions');
        });

        CoachEventBus.on('coach:achievement:unlocked', () => {
            this.increment('achievementsUnlocked');
        });

        CoachEventBus.on('coach:program:completed', () => {
            this.increment('programsCompleted');
        });
    },

    increment(metric) {
        if (Object.prototype.hasOwnProperty.call(stats, metric) && typeof stats[metric] === 'number') {
            stats[metric] += 1;
            this.saveStorage();
        }
    },

    getStats() {
        return { ...stats };
    },

    reset() {
        stats = {
            lessonsOpened: 0,
            lessonsCompleted: 0,
            voiceSessions: 0,
            achievementsUnlocked: 0,
            programsCompleted: 0,
            lastActivity: null
        };
        this.saveStorage();
        return true;
    }
};