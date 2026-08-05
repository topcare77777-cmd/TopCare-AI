/**
 * TOPCARE AI PLATFORM V2 — LEARNING NAVIGATOR
 * Path: assets/js/learning/learning.navigator.js
 * Status: APPROVED & LOCKED
 * SRP: Manages active state index and bounds checking for chapter navigation.
 */

export class LearningNavigator {
    /**
     * @param {number} totalChapters 
     */
    constructor(totalChapters = 0) {
        this.totalChapters = totalChapters;
        this.currentIndex = 0;
    }

    /**
     * Sets active index safely.
     * @param {number} index 
     * @returns {number}
     */
    setIndex(index) {
        if (index >= 0 && index < this.totalChapters) {
            this.currentIndex = index;
        }
        return this.currentIndex;
    }

    /**
     * Increments index if possible.
     * @returns {number}
     */
    next() {
        if (this.currentIndex < this.totalChapters - 1) {
            this.currentIndex++;
        }
        return this.currentIndex;
    }

    /**
     * Decrements index if possible.
     * @returns {number}
     */
    previous() {
        if (this.currentIndex > 0) {
            this.currentIndex--;
        }
        return this.currentIndex;
    }

    /**
     * Gets current chapter index.
     * @returns {number}
     */
    getCurrentIndex() {
        return this.currentIndex;
    }
}

export default LearningNavigator;