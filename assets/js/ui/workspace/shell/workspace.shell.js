/**
 * TOPCARE AI PLATFORM V2
 * WORKSPACE SHELL
 *
 * Path:
 * assets/js/ui/workspace/shell/workspace.shell.js
 */

export const WorkspaceShell = Object.freeze({

    mount(container) {

        if (!container) {
            throw new Error(
                '[WorkspaceShell] Container missing'
            );
        }


        container.innerHTML = `

            <section class="tc-workspace-shell">

                <nav class="tc-workspace-nav">

                    <button
                        data-workspace-tab="coach">
                        AI Coach
                    </button>

                </nav>


                <main
                    class="tc-workspace-panel"
                    data-workspace-panel="coach">

                    <div id="tc-coach-chat-thread"
                         class="tc-chat-thread">
                    </div>


                    <form id="tc-coach-chat-form">

                        <input
                            id="tc-coach-chat-input"
                            type="text"
                            placeholder="Tulis pertanyaan..."
                            autocomplete="off"
                        />


                        <button type="submit">
                            Kirim
                        </button>

                    </form>

                </main>

            </section>

        `;

    }

});


export default WorkspaceShell;
