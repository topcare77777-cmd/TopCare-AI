/**
 * -----------------------------------------------------------------
 * TOPCARE AI PLATFORM - ARCHITECTURE METADATA
 * -----------------------------------------------------------------
 * Layer        : Layer 4.5 - Component
 * Status       : ACTIVE
 * Version      : 2.5.0
 * Owner        : Home Module
 * Created      : Sprint 46A
 * Last Updated : Sprint 47A.3
 *
 * Architecture : Development Constitution v1.1
 * Pattern      : Conductor Component
 * Migration    : SPRINT 46A.7
 * Revision     : 47A.3
 * Runtime      : V2 Runtime
 * Compatible   : TopCare AI Runtime 2.x
 *
 * Dependencies :
 *   - CoachWidget
 *   - UserState
 *
 * Forbidden :
 *   - Router
 *   - TopCareApp
 *   - ViewManager
 *   - AuthManager (Direct)
 *   - SessionManager (Direct)
 *
 * Component API :
 *   mount(container)
 *   update()
 *   destroy()
 *   cleanup()
 * -----------------------------------------------------------------
 */

import { CoachWidget } from '../../widgets/home/coach.widget.js';
import UserState from '../../user/user.state.js';

/**
 * Compares two identity states to check if relevant parameters have changed.
 * @param {Object|null} prev - Previous identity state snapshot.
 * @param {Object} next - Current identity state snapshot.
 * @returns {boolean} True if significant identity attributes changed.
 */
function hasIdentityChanged(prev, next) {
    if (!prev) return true;
    return (
        prev.isLoggedIn !== next.isLoggedIn ||
        prev.displayName !== next.displayName ||
        prev.membership !== next.membership ||
        prev.personality !== next.personality ||
        prev.avatar !== next.avatar
    );
}

const CoachComponent = {
    container: null,
    isMounted: false,
    unsubscribeState: null,
    lastIdentityState: null,

    /**
     * Handles reactive state updates from UserState.
     * @param {Object} identityState - Current user identity state snapshot.
     * @private
     */
    handleIdentityChange(identityState) {
        if (!this.isMounted || !this.container) return;

        const nextState = { ...identityState };
        const hasChanged = hasIdentityChanged(this.lastIdentityState, nextState);

        this.lastIdentityState = nextState;

        // Trigger widget refresh only if relevant identity parameters change
        if (hasChanged) {
            void this.update();
        }
    },

    async mount(container) {
        if (!container) return;

        if (this.container !== container) {
            this.container = container;
        }

        if (this.isMounted) {
            return this.update();
        }

        try {
            // Render first before binding subscriptions to prevent premature callbacks
            this.lastIdentityState = { ...UserState.get() };

            if (typeof CoachWidget.render === 'function') {
                await CoachWidget.render(this.container, this.lastIdentityState);
            }

            this.isMounted = true;

            if (typeof UserState.subscribe === 'function') {
                this.unsubscribeState = UserState.subscribe((state) => {
                    this.handleIdentityChange(state);
                });
            }
        } catch (err) {
            console.error("[CoachComponent] mount:", err);
        }
    },

    async update() {
        if (!this.isMounted || !this.container) return;

        try {
            if (typeof CoachWidget.refresh === 'function') {
                await CoachWidget.refresh(this.lastIdentityState);
            } else if (typeof CoachWidget.render === 'function') {
                await CoachWidget.render(this.container, this.lastIdentityState);
            }
        } catch (err) {
            console.error("[CoachComponent] update:", err);
        }
    },

    destroy() {
        this.cleanup();
    },

    cleanup() {
        if (typeof this.unsubscribeState === 'function') {
            try {
                this.unsubscribeState();
            } catch (err) {
                console.error("[CoachComponent] cleanup unsubscribe error:", err);
            }
            this.unsubscribeState = null;
        }

        this.lastIdentityState = null;

        if (this.container) {
            if (typeof CoachWidget.destroy === 'function') {
                try {
                    CoachWidget.destroy();
                } catch (err) {
                    console.error("[CoachComponent] widget destroy error:", err);
                }
            }

            if (typeof this.container.replaceChildren === 'function') {
                this.container.replaceChildren();
            } else {
                this.container.innerHTML = '';
            }
        }

        this.isMounted = false;
        this.container = null;
    }
};

export default CoachComponent;