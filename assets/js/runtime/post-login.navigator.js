/**
 * TOPCARE AI PLATFORM V2 — POST LOGIN NAVIGATOR
 * Path: assets/js/runtime/post-login.navigator.js
 * Status: ACTIVE (BUILD 123.2)
 * Role: Orchestrates continuation routing after successful authentication.
 */

import NavigationContext from './navigation.context.service.js';
import CoachContext from './coach.context.js';
import { Router } from '../router/index.js';

export const PostLoginNavigator = Object.freeze({
    /**
     * Executes continuation logic post authentication.
     */
    continueJourney() {
        const pendingDestination = NavigationContext.restore();

        if (pendingDestination) {
            // If user originally intended to reach coach/workspace, direct to coach selection if not selected yet
            if (pendingDestination.includes('/coach') || pendingDestination.includes('/workspace')) {
                const currentCoach = CoachContext.getCoach();
                if (!currentCoach || !currentCoach.id) {
                    Router.navigate('/coach-selection');
                    return;
                }
            }
            Router.navigate(pendingDestination);
            return;
        }

        // Default post-login flow: Check coach selection first or fallback to home
        Router.navigate('/coach-selection');
    }
});

export default PostLoginNavigator;