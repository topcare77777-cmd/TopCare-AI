/**
 * TOPCARE AI PLATFORM V2 — WORKSPACE SHELL
 * Path: assets/js/ui/workspace/shell/workspace.shell.js
 * Status: DIAGNOSTIC TRACE BUILD 124.2.5
 */

export const WorkspaceShell = Object.freeze({

    mount(container, coachId = 'maya') {
        console.log(`[TRACE 3] [WorkspaceShell] mount called with coachId: '${coachId}'`);

        if (!container) {
            console.error('[TRACE 3.ERR] [WorkspaceShell] Container missing!');
            throw new Error('[WorkspaceShell] Container missing');
        }

        const selectedCoach = String(coachId || 'maya').toLowerCase();
        const isMaya = selectedCoach === 'maya';

        const coachName = isMaya ? 'Maya' : 'Alex';
        const avatarIcon = isMaya ? '👩‍⚕️' : '👨‍⚕️';
        const themeColor = isMaya ? '#3B82F6' : '#10B981';
        const coachRole = isMaya ? 'Empathetic AI Coach' : 'Strategic AI Coach';
        const greetingText = isMaya
            ? 'Halo, saya Maya.\nSaya siap membantu Anda hari ini.'
            : 'Halo, saya Alex.\nSaya siap membantu Anda hari ini.';

        const existingShell = container.querySelector('.tc-workspace-shell');
        if (existingShell) {
            console.log('[TRACE 3.1] [WorkspaceShell] Existing shell found in DOM. Preserving innerHTML node structure.');
            return;
        }

        console.log('[TRACE 3.2] [WorkspaceShell] Injecting Workspace Shell markup into container...');
        container.innerHTML = `
            <section class="tc-workspace-shell" style="max-width: 1000px; margin: 20px auto; padding: 20px; font-family: system-ui, -apple-system, sans-serif; color: #F8FAFC;">
                
                <nav class="tc-workspace-nav" style="display: flex; align-items: center; justify-content: space-between; background: #1E293B; border: 1px solid #334155; padding: 16px 24px; border-radius: 12px; margin-bottom: 20px;">
                    <div style="display: flex; align-items: center; gap: 16px;">
                        <div style="width: 48px; height: 48px; border-radius: 50%; background: ${themeColor}22; border: 2px solid ${themeColor}; display: flex; align-items: center; justify-content: center; font-size: 24px;">
                            ${avatarIcon}
                        </div>
                        <div>
                            <h3 style="margin: 0; font-size: 18px; color: #FFFFFF;">Coach ${coachName}</h3>
                            <span style="font-size: 12px; color: ${themeColor}; font-weight: 600;">${coachRole}</span>
                        </div>
                    </div>
                    <button data-workspace-tab="coach" style="background: #334155; color: #CBD5E1; border: none; padding: 8px 14px; border-radius: 6px; font-size: 13px; font-weight: 500; cursor: pointer;">
                        AI Coach
                    </button>
                </nav>

                <main class="tc-workspace-panel" data-workspace-panel="coach">

                    <div id="tc-coach-chat-thread" class="tc-chat-thread" style="background: #0F172A; border: 1px solid #334155; border-radius: 12px; height: 480px; padding: 20px; overflow-y: auto; display: flex; flex-direction: column; gap: 12px; margin-bottom: 16px;">
                        <div class="tc-chat-message assistant" style="margin: 8px 0; padding: 10px 14px; border-radius: 8px; font-size: 14px; line-height: 1.5; background: #1E293B; color: #F8FAFC; border: 1px solid #334155; margin-right: auto; max-width: 80%; white-space: pre-line;">
                            ${greetingText}
                        </div>
                    </div>

                    <form id="tc-coach-chat-form" style="display: flex; gap: 12px;">

                        <input
                            id="tc-coach-chat-input"
                            type="text"
                            placeholder="Tulis pertanyaan..."
                            autocomplete="off"
                            required
                            style="flex: 1; padding: 14px 18px; background: #1E293B; border: 1px solid #334155; border-radius: 10px; color: #FFFFFF; font-size: 14px; outline: none;"
                        />

                        <button type="submit" style="background: ${themeColor}; color: #FFFFFF; border: none; padding: 0 24px; border-radius: 10px; font-weight: 600; font-size: 14px; cursor: pointer;">
                            Kirim
                        </button>

                    </form>

                </main>

            </section>
        `;
        console.log('[TRACE 3.3] [WorkspaceShell] Shell markup injected successfully.');
    }

});

export default WorkspaceShell;