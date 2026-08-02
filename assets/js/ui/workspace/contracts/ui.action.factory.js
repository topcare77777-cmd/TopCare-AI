/**
 * TOPCARE AI PLATFORM V2 — DECLARATIVE UI ACTION FACTORY & DELEGATED RENDERER
 * Path: assets/js/ui/workspace/contracts/ui.action.factory.js & workspace.renderer.js
 * Status: ACTIVE (SPRINT E REFINED - LOCKED GOLDEN BASELINE)
 */

import { createUIActionDTO, UI_ACTION_TYPES } from './contracts/ui.action.dto.js';
import WorkspaceEventBus from './workspace.event.bus.js';

export const UIActionFactory = Object.freeze({
    /**
     * Creates UIActionDTO for submitting user message or form payload.
     */
    createSubmitAction(payload, sourceComponent = 'workspace-form') {
        return createUIActionDTO({
            type: UI_ACTION_TYPES.SUBMIT_USER_MESSAGE,
            payload,
            sourceComponent
        });
    }
});

// Refined Delegated Event Binding in WorkspaceRenderer (Zero inline onclick)
export function attachDelegatedEventListeners(containerEl) {
    if (!containerEl) return;

    // Delegated Form Submission Listener
    containerEl.addEventListener('submit', (evt) => {
        evt.preventDefault();
        const targetForm = evt.target;
        if (!targetForm) return;

        const formData = new FormData(targetForm);
        const payload = {};
        formData.forEach((val, key) => { payload[key] = val; });

        const actionDTO = UIActionFactory.createSubmitAction(payload, targetForm.id || 'workspace-form');
        WorkspaceEventBus.dispatch(actionDTO);
    });
}
