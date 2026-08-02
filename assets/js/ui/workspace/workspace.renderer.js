/**
 * TOPCARE AI PLATFORM V2 — WORKSPACE & AUTO-WIDGET DOM RENDERER
 * Path: assets/js/ui/workspace/workspace.renderer.js & widget.renderer.js
 * Status: ACTIVE (SPRINT E - LOCKED GOLDEN BASELINE)
 * Role: Data-Driven Pure DOM Renderer Consuming WorkspaceRenderDTO & Capability Manifests
 */

import { createUIActionDTO } from './contracts/ui.action.dto.js';
import WorkspaceEventBus from './workspace.event.bus.js';

export const WidgetRenderer = Object.freeze({
    /**
     * Generates auto-form HTML string or DOM elements directly from CapabilityManifestDTO inputs schema.
     * Zero Hardcoded HTML.
     *
     * @param {Object} capabilityManifestDTO
     * @returns {string} Declarative HTML Form String
     */
    renderAutoForm(capabilityManifestDTO) {
        if (!capabilityManifestDTO || !capabilityManifestDTO.inputs) {
            return '<div class="tc-widget-empty">No input parameters required.</div>';
        }

        const inputs = capabilityManifestDTO.inputs;
        let formFieldsHTML = '';

        for (const [key, fieldDef] of Object.entries(inputs)) {
            const isRequired = fieldDef.required ? 'required' : '';
            const fieldLabel = fieldDef.description || key;

            formFieldsHTML += `
                <div class="tc-form-group" style="margin-bottom: 12px;">
                    <label class="tc-label" style="display:block; font-size: 12px; margin-bottom: 4px; color: #94A3B8;">${fieldLabel} ${isRequired ? '*' : ''}</label>
                    <textarea class="tc-input" name="${key}" placeholder="Enter ${key}..." ${isRequired} style="width: 100%; padding: 8px; background: #0F172A; border: 1px solid #334155; color: #F8FAFC; border-radius: 4px;"></textarea>
                </div>
            `;
        }

        return `
            <div class="tc-auto-widget" style="padding: 16px; background: #1E293B; border-radius: 8px; border: 1px solid #334155;">
                <h4 style="margin: 0 0 12px 0; color: ${capabilityManifestDTO.uiMetadata.color}">${capabilityManifestDTO.displayName}</h4>
                <form id="tc-form-${capabilityManifestDTO.id}">
                    ${formFieldsHTML}
                    <button type="submit" style="background: ${capabilityManifestDTO.uiMetadata.color}; color: #FFF; border: none; padding: 8px 16px; border-radius: 4px; cursor: pointer;">Execute ${capabilityManifestDTO.displayName}</button>
                </form>
            </div>
        `;
    }
});

export const WorkspaceRenderer = Object.freeze({
    /**
     * Renders complete workspace view into target container element purely from WorkspaceRenderDTO.
     */
    render(containerEl, workspaceRenderDTO) {
        if (!containerEl || !workspaceRenderDTO) return;

        const { messages, theme, presentation } = workspaceRenderDTO;

        let messagesHTML = '';
        for (const msg of messages) {
            messagesHTML += `
                <div class="tc-chat-bubble" style="padding: 12px; margin-bottom: 8px; background: ${theme.colors.surface}; border-radius: 6px; border-left: 3px solid ${theme.colors.primary}; color: ${theme.colors.text};">
                    <div class="tc-chat-content">${msg.composedText}</div>
                    <div class="tc-chat-meta" style="font-size: 10px; color: #64748B; margin-top: 4px;">Persona: ${msg.personaApplied}</div>
                </div>
            `;
        }

        containerEl.innerHTML = `
            <div class="topcare-workspace-container" style="background: ${theme.colors.background}; font-family: ${theme.typography.fontFamily}; padding: ${theme.spacing.padding}; min-height: 100vh;">
                <header class="tc-header" style="display:flex; justify-content:space-between; border-bottom: 1px solid ${theme.colors.border}; padding-bottom: 12px; margin-bottom: 16px;">
                    <h3 style="margin:0; color: ${theme.colors.text};">TopCare AI Enterprise Workspace</h3>
                    <span class="tc-badge" style="background: #10B981; color: #FFF; padding: 2px 8px; border-radius: 12px; font-size: 11px;">${workspaceRenderDTO.diagnostics.healthStatus}</span>
                </header>
                <main class="tc-chat-stream">${messagesHTML}</main>
            </div>
        `;

        // Attach Event Dispatcher to Form Submissions
        const submitBtn = containerEl.querySelector('button');
        if (submitBtn) {
            submitBtn.onclick = (e) => {
                e.preventDefault();
                const uiAction = createUIActionDTO({
                    type: 'SUBMIT_USER_MESSAGE',
                    payload: { text: 'Executed via UI' }
                });
                WorkspaceEventBus.dispatch(uiAction);
            };
        }
    }
});

export default WorkspaceRenderer;
