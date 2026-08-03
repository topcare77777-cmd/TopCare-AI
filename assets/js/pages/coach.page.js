/**
 * TOPCARE AI PLATFORM V2 — COACH PAGE CONTROLLER
 * Path: assets/js/pages/coach.page.js
 * Status: DIAGNOSTIC TRACE BUILD 124.2.5
 */

import { Core } from '../core/index.js';
import { CoachContext } from '../runtime/coach.context.js';
import WorkspaceRuntime from '../ui/workspace/workspace.runtime.js';

export const coachPage = {
    activeContainer: null,
    isMounted: false,

    async beforeEnter() {
        console.log('[TRACE 1] [CoachPage] Lifecycle: beforeEnter executed.');
    },

    async mount(container) {
        console.log('[TRACE 1.1] [CoachPage] Lifecycle: mount called.');
        return await this.render(container);
    },

    async render(container) {
        console.log('[TRACE 1.2] [CoachPage] Lifecycle: render called.');
        this.activeContainer = container || document.getElementById('app-host') || document.body;

        this.activeContainer.innerHTML = `<div id="app-workspace" class="tc-workspace-host"></div>`;

        const selectedCoach = (CoachContext && typeof CoachContext.getCoach === 'function')
            ? CoachContext.getCoach()
            : 'maya';

        console.log(`[TRACE 1.3] [CoachPage] Selected Coach: '${selectedCoach}'. Delegating to WorkspaceRuntime...`);

        if (WorkspaceRuntime && typeof WorkspaceRuntime.mountCoach === 'function') {
            await WorkspaceRuntime.mountCoach(selectedCoach);
        } else if (WorkspaceRuntime && typeof WorkspaceRuntime.mountWorkspace === 'function') {
            await WorkspaceRuntime.mountWorkspace('coach', selectedCoach);
        }

        this.isMounted = true;
    },

    async afterEnter() {
        console.log('[TRACE 1.4] [CoachPage] Lifecycle: afterEnter executed.');
    },

    async update() {
        if (!this.isMounted) return;
        const selectedCoach = (CoachContext && typeof CoachContext.getCoach === 'function')
            ? CoachContext.getCoach()
            : 'maya';

        if (WorkspaceRuntime && typeof WorkspaceRuntime.mountCoach === 'function') {
            await WorkspaceRuntime.mountCoach(selectedCoach);
        }
    },

    destroy() {
        console.log('[TRACE 1.5] [CoachPage] Lifecycle: destroy called.');
        if (!this.isMounted) return;

        if (WorkspaceRuntime && typeof WorkspaceRuntime.destroy === 'function') {
            WorkspaceRuntime.destroy();
        }

        if (this.activeContainer) {
            this.activeContainer.innerHTML = '';
        }

        this.activeContainer = null;
        this.isMounted = false;
    }
};

export default coachPage;