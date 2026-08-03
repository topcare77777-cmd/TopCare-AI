/**
 * TOPCARE AI PLATFORM V2
 * WORKSPACE RUNTIME CONTROLLER
 *
 * Path:
 * assets/js/ui/workspace/workspace.runtime.js
 *
 * Role:
 * Workspace lifecycle controller,
 * shell mounting,
 * AI Coach UI bridge & Conversation Runtime connection.
 *
 * BUILD 124.3.2 — EXTRACT RESPONSE DTO COMPATIBILITY FIX
 */

import ConversationOrchestrator from '../../services/conversation/conversation.orchestrator.js';
import WorkspaceShell from './shell/workspace.shell.js';

export const WorkspaceRuntime = (() => {

    let initialized = false;
    let mounted = false;
    let activeTab = 'coach';

    function init() {
        if (initialized) {
            return;
        }

        console.log('[WorkspaceRuntime] initialized');
        initialized = true;
    }

    function mountCoach(coachId = 'maya') {
        return mountWorkspace('coach', coachId);
    }

    function mountWorkspace(tabId = 'coach', coachId = null) {
        init();

        let container = document.getElementById('app-workspace');

        if (!container) {
            const app = document.getElementById('app') || document.getElementById('app-host') || document.body;

            if (!app) {
                console.error('[WorkspaceRuntime] Missing #app or #app-host container');
                return false;
            }

            container = document.createElement('section');
            container.id = 'app-workspace';
            container.className = 'tc-workspace-host';
            app.appendChild(container);

            console.log('[WorkspaceRuntime] Dynamic #app-workspace created.');
        }

        WorkspaceShell.mount(container, coachId);
        bindChat();

        mounted = true;
        activateTab(tabId);
        return true;
    }

    function activateTab(tabId = 'coach') {
        activeTab = tabId;

        document.querySelectorAll('[data-workspace-panel]').forEach(panel => {
            const match = panel.dataset.workspacePanel === tabId;
            panel.style.display = match ? 'block' : 'none';
            panel.classList.toggle('active', match);
        });

        document.querySelectorAll('[data-workspace-tab]').forEach(button => {
            button.classList.toggle('active', button.dataset.workspaceTab === tabId);
        });
    }

    function bindChat() {
        const form = document.getElementById('tc-coach-chat-form') || document.getElementById('tc-chat-form');
        const input = document.getElementById('tc-coach-chat-input') || document.getElementById('tc-chat-input');
        const thread = document.getElementById('tc-coach-chat-thread') || document.getElementById('tc-chat-stream');

        if (!form || !input || !thread) {
            console.warn('[WorkspaceRuntime] Chat UI elements missing in DOM shell');
            return;
        }

        if (form.dataset.bound === 'true') {
            return;
        }

        form.dataset.bound = 'true';

        form.addEventListener('submit', async event => {
            event.preventDefault();
            event.stopPropagation();

            const message = input.value.trim();

            if (!message) {
                return;
            }

            input.value = '';

            // 1. Render User Message
            addMessage(thread, 'Anda', message, 'user');

            // 2. Render Loading Indicator
            const loading = addMessage(thread, 'AI Coach', 'Memproses...', 'loading');

            try {
                // 3. Execute Conversation Engine Orchestrator
                const result = await ConversationOrchestrator.processMessage({
                    conversationId: crypto.randomUUID ? crypto.randomUUID() : Date.now().toString(),
                    userMessageText: message,
                    contextSnapshotDTO: {},
                    grantedScope: ['*']
                });

                if (loading && loading.parentNode) {
                    loading.remove();
                }

                // 4. Render Assistant Response
                addMessage(thread, 'AI Coach', extractResponse(result), 'assistant');

            } catch (error) {
                if (loading && loading.parentNode) {
                    loading.remove();
                }

                addMessage(thread, 'System', error.message || 'Gagal memproses pesan.', 'error');
                console.error('[WorkspaceRuntime] processMessage error:', error);
            }
        });
    }

    /**
     * Extracts text content from response object according to BUILD 124 DTO contract.
     * @param {Object|string} result 
     * @returns {string}
     */
    function extractResponse(result) {
        if (!result) {
            return "Maaf, saya belum dapat menghasilkan respon.";
        }

        // 1. Priority: result.finalResponse.composedText
        if (result.finalResponse && typeof result.finalResponse.composedText === 'string' && result.finalResponse.composedText.trim() !== '') {
            return result.finalResponse.composedText;
        }

        // 2. Priority: result.finalResponse.rawContent
        if (result.finalResponse && typeof result.finalResponse.rawContent === 'string' && result.finalResponse.rawContent.trim() !== '') {
            return result.finalResponse.rawContent;
        }

        // 3. Priority: result.rawContent
        if (typeof result.rawContent === 'string' && result.rawContent.trim() !== '') {
            return result.rawContent;
        }

        // 4. Priority: result.message
        if (typeof result.message === 'string' && result.message.trim() !== '') {
            return result.message;
        }

        // 5. Priority: string result
        if (typeof result === 'string' && result.trim() !== '') {
            return result;
        }

        // 6. Fallback
        return "Maaf, saya belum dapat menghasilkan respon.";
    }

    function addMessage(container, sender, text, type) {
        if (!container) return null;

        const node = document.createElement('div');
        node.className = `tc-chat-message ${type}`;
        node.style.margin = '8px 0';
        node.style.padding = '10px 14px';
        node.style.borderRadius = '8px';
        node.style.fontSize = '14px';
        node.style.lineHeight = '1.5';

        if (type === 'user') {
            node.style.background = '#3B82F6';
            node.style.color = '#FFFFFF';
            node.style.marginLeft = 'auto';
            node.style.maxWidth = '75%';
        } else if (type === 'assistant') {
            node.style.background = '#1E293B';
            node.style.color = '#F8FAFC';
            node.style.border = '1px solid #334155';
            node.style.marginRight = 'auto';
            node.style.maxWidth = '80%';
            node.style.whiteSpace = 'pre-line';
        } else if (type === 'loading') {
            node.style.background = 'rgba(255, 255, 255, 0.05)';
            node.style.color = '#94A3B8';
            node.style.fontStyle = 'italic';
        } else if (type === 'error') {
            node.style.background = 'rgba(239, 68, 68, 0.1)';
            node.style.color = '#EF4444';
            node.style.border = '1px solid rgba(239, 68, 68, 0.3)';
        }

        node.textContent = `${sender}: ${text}`;
        container.appendChild(node);
        container.scrollTop = container.scrollHeight;

        return node;
    }

    function destroy() {
        const container = document.getElementById('app-workspace');

        if (container) {
            container.innerHTML = '';
        }

        mounted = false;
        initialized = false;
    }

    return Object.freeze({
        init,
        mountCoach,
        mountWorkspace,
        activateTab,
        destroy
    });

})();

export default WorkspaceRuntime;