/**
 * TOPCARE AI PLATFORM V2 — ASSESSMENT EVENT LISTENER
 * Path: assets/js/coach/listeners/assessment.listener.js
 * Status: APPROVED & LOCKED (BUILD 128)
 * SRP: Loose-coupling event listener bridge for Assessment Runtime events.
 */

import CoachMemory from '../coach.memory.js';
import { Router } from '../../router/router.js';

export class AssessmentEventListener {
    static init() {
        window.removeEventListener('tc:assessment:completed', this._handleAssessmentCompleted);
        window.addEventListener('tc:assessment:completed', this._handleAssessmentCompleted);
    }

    static _handleAssessmentCompleted(event) {
        const resultDTO = event.detail;
        if (!resultDTO) return;

        // Synchronize to CoachMemory without coupling Personality Controller to Coach Domain
        CoachMemory.saveAssessmentResult(resultDTO);

        // Transition via Router Engine
        Router.navigate('/coach');
    }
}

export default AssessmentEventListener;