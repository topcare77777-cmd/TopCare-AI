/**
 * TOPCARE AI PLATFORM V2
 * Path: assets/js/coach/coach.runtime.js
 * Status: MIGRATED TO AUTHORITATIVE APP-ROUTER
 */
import { appRouter } from '../core/router/app-router.js';

export class CoachRuntime {
    static init() {
        console.log('[CoachRuntime] Initialized');
    }
    static navigateToCoach() {
        appRouter.navigate('/coach');
    }
    static navigateToSelection() {
        appRouter.navigate('/coach-selection');
    }
}
export default CoachRuntime;