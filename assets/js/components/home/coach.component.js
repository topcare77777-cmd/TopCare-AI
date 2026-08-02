/**
 * -----------------------------------------------------------------
 * TOPCARE AI PLATFORM - ARCHITECTURE METADATA
 * -----------------------------------------------------------------
 * Layer        : Layer 4.5 - Component
 * Status       : ACTIVE (BUILD AC-013R1)
 * Version      : 2.7.0
 * Architecture : Development Constitution v1.1
 * Pattern      : Adapter Component / ViewModel Builder
 * -----------------------------------------------------------------
 */

import { CoachWidget } from '../../widgets/home/coach.widget.js';
import UserState from '../../user/user.state.js';
import CoachService from '../../services/home/coach.service.js';

/**
 * Deep Freezes nested ViewModel DTOs recursively.
 * @param {Object} obj
 * @returns {Object}
 */
function deepFreeze(obj) {
    if (obj === null || typeof obj !== 'object') return obj;
    Object.keys(obj).forEach(prop => {
        if (typeof obj[prop] === 'object' && obj[prop] !== null && !Object.isFrozen(obj[prop])) {
            deepFreeze(obj[prop]);
        }
    });
    return Object.freeze(obj);
}

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

/**
 * Builds Standardized CoachViewModel DTO.
 * @param {Object} identity - Raw identity state from UserState.
 * @param {Object} serviceData - Raw static data from CoachService.
 * @returns {Object} Deep-frozen CoachViewModel DTO.
 */
function buildCoachViewModel(identity, serviceData) {
    const rawData = serviceData || {};
    const name = identity?.displayName || identity?.name || 'Tamu';
    const membership = identity?.membership ? `Keanggotaan: ${identity.membership.toUpperCase()}` : '';
    const greeting = identity?.isLoggedIn
        ? `Selamat datang kembali, ${name}. Bimbingan dipersonalisasi sesuai gaya dan tujuan Anda.`
        : (rawData.sectionDescription || 'Silakan masuk untuk bimbingan personal.');

    const viewModelDTO = {
        header: {
            badge: rawData.badge || 'Panduan AI Pakar',
            title: rawData.sectionTitle || 'Sesi Bimbingan AI Coach',
            greeting,
            user: {
                name,
                membershipTag: membership
            }
        },
        coaches: (rawData.coaches || []).map(coach => ({
            name: coach.name,
            specialty: coach.specialty,
            bio: coach.bio
        })),
        // Standardized Schema Readiness Nodes
        actions: [
            {
                id: 'open-coach',
                label: 'Mulai Sesi AI Coach',
                action: 'open-coach'
            }
        ],
        status: { ready: true },
        telemetry: { builtAt: new Date().toISOString() }
    };

    return deepFreeze(viewModelDTO);
}

const CoachComponent = {
    container: null,
    isMounted: false,
    unsubscribeState: null,
    lastIdentityState: null,

    handleIdentityChange(identityState) {
        if (!this.isMounted || !this.container) return;

        const nextState = { ...identityState };
        const hasChanged = hasIdentityChanged(this.lastIdentityState, nextState);

        this.lastIdentityState = nextState;

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
            this.lastIdentityState = { ...UserState.get() };
            const serviceData = CoachService.getData();
            const viewModel = buildCoachViewModel(this.lastIdentityState, serviceData);

            if (typeof CoachWidget.render === 'function') {
                await CoachWidget.render(this.container, viewModel);
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
            const serviceData = CoachService.getData();
            const viewModel = buildCoachViewModel(this.lastIdentityState, serviceData);
            // Potongan DTO di dalam buildCoachViewModel():
            const viewModelDTO = {
                header: {
                    badge: rawData.badge || 'Panduan AI Pakar',
                    title: rawData.sectionTitle || 'Sesi Bimbingan AI Coach',
                    greeting,
                    user: {
                        name,
                        membershipTag: membership
                    }
                },
                coaches: (rawData.coaches || []).map(coach => ({
                    name: coach.name,
                    specialty: coach.specialty,
                    bio: coach.bio
                })),
                actions: [],
                status: { ready: true },
                telemetry: {
                    version: "2.0",
                    builtAt: new Date().toISOString()
                }
            };

            if (typeof CoachWidget.refresh === 'function') {
                await CoachWidget.refresh(viewModel);
            } else if (typeof CoachWidget.render === 'function') {
                await CoachWidget.render(this.container, viewModel);
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
