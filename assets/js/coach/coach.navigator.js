/**
 * TOPCARE AI PLATFORM V2
 * Path: assets/js/coach/coach.navigator.js
 * Status: MIGRATED TO AUTHORITATIVE APP-ROUTER (SAFE RENAME)
 */
import { appRouter } from '../core/router/app-router.js';

export class CoachNavigator {
    static init() {
        console.log('[CoachNavigator] Initialized');
    }
    static navigateToCoach() {
        appRouter.navigate('/coach');
    }
    static navigateToSelection() {
        appRouter.navigate('/coach-selection');
    }
}
export default CoachNavigator;