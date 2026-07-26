// assets/js/coach/notification/coach-notification-events.js
/**
 * @file coach-notification-events.js
 * @description Event bridge mapping CoachEventBus emissions to CoachNotificationEngine records without UI or storage coupling.
 * @module Coach/Notification/Events
 */

import { CoachEventBus } from '../coach-event-bus.js';
import { CoachNotificationEngine } from './coach-notification-engine.js';

export const CoachNotificationEvents = {
    initialize() {
        this.registerLessonEvents();
        this.registerAchievementEvents();
        this.registerVoiceEvents();
        this.registerProgramEvents();
        return true;
    },

    registerLessonEvents() {
        CoachEventBus.on('coach:lesson:opened', (payload) => {
            CoachNotificationEngine.add({
                type: 'lesson',
                title: 'Pelajaran Dibuka',
                message: payload?.title ? `Anda membuka pelajaran: "${payload.title}"` : 'Sesi pembelajaran baru telah dimulai.',
                meta: {
                    lessonId: payload?.lessonId || null
                }
            });
        });

        CoachEventBus.on('coach:lesson:completed', (payload) => {
            CoachNotificationEngine.add({
                type: 'success',
                title: 'Pelajaran Selesai',
                message: payload?.title ? `Hebat! Anda menyelesaikan pelajaran: "${payload.title}"` : 'Anda berhasil menyelesaikan pelajaran ini.',
                meta: {
                    lessonId: payload?.lessonId || null
                }
            });
        });
    },

    registerAchievementEvents() {
        CoachEventBus.on('coach:achievement:unlocked', (payload) => {
            CoachNotificationEngine.add({
                type: 'achievement',
                title: 'Pencapaian Baru! 🏆',
                message: payload?.title ? `Selamat! Badge "${payload.title}" berhasil terbuka.` : 'Anda membuka lencana penghargaan baru.',
                meta: {
                    achievementId: payload?.achievementId || null
                }
            });
        });
    },

    registerVoiceEvents() {
        CoachEventBus.on('coach:voice:start', (payload) => {
            CoachNotificationEngine.add({
                type: 'info',
                title: 'Voice Coach Aktif',
                message: 'Pemutaran panduan suara AI Coach dimulai.',
                meta: {
                    sessionId: payload?.sessionId || null
                }
            });
        });
    },

    registerProgramEvents() {
        CoachEventBus.on('coach:program:completed', (payload) => {
            CoachNotificationEngine.add({
                type: 'success',
                title: 'Program Selesai! 🎉',
                message: 'Luar biasa! Anda telah menyelesaikan seluruh program pembelajaran AI Coach.',
                meta: {
                    programId: payload?.programId || null
                }
            });
        });
    }
};