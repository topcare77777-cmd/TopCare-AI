/**
 * TOPCARE AI PLATFORM V2
 * Path: assets/js/coach/listeners/assessment.listener.js
 * Status: MIGRATED TO AUTHORITATIVE APP-ROUTER
 */
import { appRouter } from '../../core/router/app-router.js';

export class AssessmentEventListener {
    static init() {
        window.addEventListener('assessment:completed', (e) => {
            console.log('[Assessment] Completed', e.detail);
            appRouter.navigate('/coach');
        });
    }
}
export default AssessmentEventListener;