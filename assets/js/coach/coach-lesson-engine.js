// assets/js/coach/coach-lesson-engine.js
/**
 * @file coach-lesson-engine.js
 * @description Data-driven lesson engine responsible for fetching and querying structured lesson content from JSON.
 * @module Coach/LessonEngine
 */

let lessonsCache = null;

export const CoachLessonEngine = {
    async load() {
        if (lessonsCache) {
            return lessonsCache;
        }

        try {
            const response = await fetch('assets/json/coach-lessons.json');
            if (!response.ok) {
                throw new Error(`Failed to load lessons JSON: ${response.statusText}`);
            }
            lessonsCache = await response.json();
            return lessonsCache;
        } catch (error) {
            console.error("Error loading coach lessons data:", error);
            return {};
        }
    },

    async getLesson(primaryType, lessonIndex) {
        const data = await this.load();
        const typeLessons = data[primaryType] || data["Koleris"] || [];

        if (typeLessons.length === 0) {
            return {
                title: "Pengembangan Karakter & Kepribadian",
                content: "Pelajari strategi pengembangan diri yang disesuaikan khusus untuk memaksimalkan potensi kekuatan profil temperamen Anda."
            };
        }

        const index = Math.max(0, Math.min(lessonIndex, typeLessons.length - 1));
        return typeLessons[index];
    },

    async getLessonCount(primaryType) {
        const data = await this.load();
        const typeLessons = data[primaryType] || data["Koleris"] || [];
        return typeLessons.length;
    },

    async hasNextLesson(primaryType, lessonIndex) {
        const count = await this.getLessonCount(primaryType);
        return lessonIndex < count - 1;
    }
};