/**
 * @file coach-loader.js
 * @description Enterprise asynchronous loader for AI Coach configuration and lesson datasets.
 * @module Coach/Loader
 */

export const CoachLoader = {
    /**
     * Loads the coach manifest configuration file.
     * @returns {Promise<Object>}
     */
    async loadConfig() {
        try {
            const res = await fetch('assets/json/coach/config.json');
            if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
            return await res.json();
        } catch (err) {
            console.error('Failed to load coach config:', err);
            throw err;
        }
    },

    /**
     * Loads a specific lesson JSON file by its filename or ID.
     * @param {string} fileName 
     * @returns {Promise<Object>}
     */
    async loadLesson(fileName) {
        try {
            const res = await fetch(`assets/json/coach/${fileName}`);
            if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
            return await res.json();
        } catch (err) {
            console.error(`Failed to load lesson file ${fileName}:`, err);
            throw err;
        }
    },

    /**
     * Loads all lessons defined in the configuration manifest in sequence.
     * @returns {Promise<Array>}
     */
    async loadAllLessons() {
        try {
            const config = await this.loadConfig();
            if (!config || !config.lessons || !Array.isArray(config.lessons)) {
                throw new Error('Invalid coach configuration manifest structure.');
            }

            const lessonPromises = config.lessons.map(item => this.loadLesson(item.file));
            const lessons = await Promise.all(lessonPromises);
            return lessons;
        } catch (err) {
            console.error('Failed to load all lessons:', err);
            throw err;
        }
    }
};