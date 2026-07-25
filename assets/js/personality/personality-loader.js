/**
 * @file personality-loader.js
 * @description Enterprise data loader for Personality Test V2 config, questions, and results datasets.
 * @module Personality/Loader
 */

export const PersonalityLoader = {
    async loadConfig() {
        try {
            const res = await fetch('assets/json/personality/config.json');
            if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
            return await res.json();
        } catch (err) {
            console.error('Failed to load personality config:', err);
            throw err;
        }
    },

    async loadQuestions(ageKey) {
        try {
            const config = await this.loadConfig();
            const group = config.ageGroups.find(g => g.key === ageKey);
            if (!group || !group.file) {
                throw new Error(`Invalid or missing age group key: ${ageKey}`);
            }

            const res = await fetch(`assets/json/personality/questions/${group.file}`);
            if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
            return await res.json();
        } catch (err) {
            console.error(`Failed to load questions for age group ${ageKey}:`, err);
            throw err;
        }
    },

    async loadResults() {
        try {
            const res = await fetch('assets/json/personality/results.json');
            if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
            return await res.json();
        } catch (err) {
            console.error('Failed to load personality results metadata:', err);
            throw err;
        }
    }
};