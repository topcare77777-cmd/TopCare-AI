/**
 * TOPCARE AI PLATFORM V2 — COACH RUNTIME CONTROLLER
 * Path: assets/js/coach/coach.runtime.js
 * Status: ACTIVE - SPRINT 1A CANONICAL RELEASE
 * Role: Host-Bound Controller (Fail-Fast, Zero Global Listener, SSOT Persistence)
 */

import { CoachStore } from './coach.store.js';
import { CoachModal } from './coach.modal.js';
import { Router } from '../router/router.js';

export const CoachRuntime = (() => {
    let _initialized = false;
    let _hostElement = null;
    let _boundClickHandler = null;

    function init(hostContainer) {
        if (_initialized) return;

        // Fail-Fast Boundary Check: Prohibit silent fallback to document.body
        if (!hostContainer || !(hostContainer instanceof HTMLElement)) {
            throw new Error('[CoachRuntime] Initialization failed: Mandatory hostContainer (HTMLElement) is missing.');
        }

        _hostElement = hostContainer;
        console.log('[CoachRuntime] Initializing AI Coach Subsystem Controller on Host Element...');

        // Event listener bound strictly to Host Container (Zero Global Document Listener)
        _boundClickHandler = (event) => {
            const trigger = event.target.closest('[data-action="open-coach"]');
            if (trigger) {
                event.preventDefault();
                console.log('[CoachRuntime] Open Coach CTA triggered locally within Host.');
                openSelectionModal();
            }
        };

        _hostElement.addEventListener('click', _boundClickHandler);
        _initialized = true;
    }

    function openSelectionModal() {
        CoachModal.show((selectedCoachId) => {
            console.log(`[CoachRuntime] Selected Coach ID: ${selectedCoachId}`);

            // 1. Persist Selected Coach ID using CoachStore SSOT
            CoachStore.saveSelectedCoachId(selectedCoachId);

            // 2. Execute Navigation to Workspace AI Coach Runtime
            Router.navigate('/workspace/coach');
        });
    }

    function destroy() {
        if (!_initialized) return;

        if (_hostElement && _boundClickHandler) {
            _hostElement.removeEventListener('click', _boundClickHandler);
            _boundClickHandler = null;
            _hostElement = null;
        }

        CoachModal.destroy();
        _initialized = false;
        console.log('[CoachRuntime] Subsystem Controller destroyed & unbound from Host.');
    }

    return Object.freeze({
        init,
        openSelectionModal,
        destroy
    });
})();

export default CoachRuntime;
