// assets/js/coach/coach-completion.js
/**
 * @file coach-completion.js
 * @description Completion engine handling finish state validation and completion event triggers.
 * @module Coach/Completion
 */

import { CoachProgressEngine } from './coach-progress-engine.js';

export const CoachCompletion = {
    async checkCompletion(primaryType) {
        return await CoachProgressEngine.isCompleted(primaryType);
    },

    async markCompletedAndGetNext(primaryType) {
        await CoachProgressEngine.next(primaryType);
        return await this.checkCompletion(primaryType);
    }
};