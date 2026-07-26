// assets/js/coach/coach-achievement.js
/**
 * @file coach-achievement.js
 * @description Decoupled achievement engine that listens to CoachEventBus, evaluates criteria, and persists unlocks independently.
 * @module Coach/Achievement
 */

import { CoachEventBus } from './coach-event-bus.js';

const ACHIEVEMENT_STORAGE_KEY = "topcare-ai-achievements-v1";

let achievementsCatalog = [];
let unlockedCache = new Set();
let isInitialized = false;

export const CoachAchievement = {
    async initialize() {
        if (isInitialized) return;

        try {
            const response = await fetch('assets/json/coach-achievements.json');
            if (response.ok) {
                achievementsCatalog = await response.json();
            }
        } catch (e) {
            console.error("Failed to load coach achievements catalog:", e);
            achievementsCatalog = [
                { id: "first_lesson", title: "Langkah Pertama", description: "Selesaikan pelajaran pertama Anda." },
                { id: "voice_used", title: "Mendengar Coach", description: "Gunakan Voice Coach untuk mendengarkan materi pertama kali." },
                { id: "program_completed", title: "Lulus AI Coach", description: "Selesaikan seluruh program pembelajaran dengan sukses." }
            ];
        }

        this.loadStorage();
        this.registerListeners();
        isInitialized = true;
    },

    loadStorage() {
        try {
            const raw = localStorage.getItem(ACHIEVEMENT_STORAGE_KEY);
            if (raw) {
                const parsed = JSON.parse(raw);
                if (Array.isArray(parsed)) {
                    unlockedCache = new Set(parsed);
                }
            }
        } catch (e) {
            console.error("Failed to load achievements storage:", e);
            unlockedCache = new Set();
        }
    },

    saveStorage() {
        try {
            const payload = Array.from(unlockedCache);
            localStorage.setItem(ACHIEVEMENT_STORAGE_KEY, JSON.stringify(payload));
        } catch (e) {
            console.error("Failed to save achievements storage:", e);
        }
    },

    registerListeners() {
        CoachEventBus.on('coach:lesson:completed', () => {
            this.unlock('first_lesson');
        });

        CoachEventBus.on('coach:voice:start', () => {
            this.unlock('voice_used');
        });

        CoachEventBus.on('coach:program:completed', () => {
            this.unlock('program_completed');
        });
    },

    getAll() {
        return achievementsCatalog.map(ach => ({
            ...ach,
            unlocked: unlockedCache.has(ach.id)
        }));
    },

    getUnlocked() {
        return this.getAll().filter(ach => ach.unlocked);
    },

    isUnlocked(id) {
        return unlockedCache.has(id);
    },

    unlock(id) {
        if (!id || unlockedCache.has(id)) return false;

        const exists = achievementsCatalog.some(ach => ach.id === id);
        if (!exists) return false;

        unlockedCache.add(id);
        this.saveStorage();

        CoachEventBus.emit('coach:achievement:unlocked', { achievementId: id });
        return true;
    },

    reset() {
        unlockedCache.clear();
        this.saveStorage();
        CoachEventBus.emit('coach:achievement:reset', {});
        return true;
    }
};