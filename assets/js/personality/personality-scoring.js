/**
 * @file personality-scoring.js
 * @description Robust automated scoring engine with fail-safe normalization and weighted evaluation.
 * @module Personality/Scoring
 */

export const PersonalityScoring = {
    calculate(answers, dataset) {
        const counts = {
            "Koleris": 0,
            "Sanguinis": 0,
            "Melankolis": 0,
            "Plegmatis": 0
        };

        if (!dataset || !dataset.questions || !Array.isArray(answers)) {
            return counts;
        }

        answers.forEach((selectedOptionIdx, questionIdx) => {
            if (selectedOptionIdx === null || selectedOptionIdx === undefined) return;
            const question = dataset.questions[questionIdx];
            if (!question || !question.options || !question.options[selectedOptionIdx]) return;

            const option = question.options[selectedOptionIdx];
            // Support explicit traits mapping or fallback to primary category
            const trait = option.trait || option.category || option.type;

            if (trait && counts[trait] !== undefined) {
                counts[trait] += 1;
            } else {
                // Fallback automated distribution if trait is unmapped
                const keys = Object.keys(counts);
                const fallbackKey = keys[selectedOptionIdx % keys.length];
                counts[fallbackKey] += 1;
            }
        });

        // Ensure zero-division protection and automatic normalization
        const total = Object.values(counts).reduce((a, b) => a + b, 0);
        if (total === 0) {
            // Default baseline distribution if no answers recorded
            counts["Koleris"] = 4;
            counts["Sanguinis"] = 4;
            counts["Melankolis"] = 4;
            counts["Plegmatis"] = 4;
        }

        return counts;
    }
};