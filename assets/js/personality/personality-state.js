/**
 * @file personality-state.js
 * @description Enterprise state store supporting setConfig API and clean state mutation routines.
 * @module Personality/State
 */

export const PersonalityState = {
    config: null,
    ageGroup: null,
    dataset: null,
    currentIndex: 0,
    answers: [],

    setConfig(configData) {
        this.config = configData;
    },

    setAgeGroup(groupKey) {
        this.ageGroup = groupKey;
    },

    setDataset(data) {
        this.dataset = data;
    },

    resetAnswers(totalQuestions) {
        this.answers = new Array(totalQuestions).fill(null);
    },

    setAnswer(index, optionIndex) {
        this.answers[index] = optionIndex;
    },

    getGroupTitle() {
        if (!this.config || !this.config.ageGroups) return '';
        const found = this.config.ageGroups.find(g => g.key === this.ageGroup);
        return found ? found.title : '';
    },

    reset() {
        this.ageGroup = null;
        this.dataset = null;
        this.currentIndex = 0;
        this.answers = [];
    }
};