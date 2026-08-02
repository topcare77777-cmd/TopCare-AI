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
 * AI Coach UI bridge.
 */

import ConversationOrchestrator
    from '../../services/conversation/conversation.orchestrator.js';

import WorkspaceShell
    from './shell/workspace.shell.js';


export const WorkspaceRuntime = (() => {

    let initialized = false;
    let mounted = false;
    let activeTab = 'coach';



    function init() {

        if (initialized) {
            return;
        }

        console.log(
            '[WorkspaceRuntime] initialized'
        );

        initialized = true;
    }





    function mountWorkspace(tabId = 'coach') {

        init();


        let container =
            document.getElementById(
                'app-workspace'
            );


        if (!container) {


            const app =
                document.getElementById(
                    'app'
                );


            if (!app) {

                console.error(
                    '[WorkspaceRuntime] Missing #app'
                );

                return false;
            }


            container =
                document.createElement(
                    'section'
                );


            container.id =
                'app-workspace';


            container.className =
                'tc-workspace-host';


            app.appendChild(
                container
            );


            console.log(
                '[WorkspaceRuntime] Dynamic #app-workspace created.'
            );

        }



        if (!mounted) {


            WorkspaceShell.mount(
                container
            );


            bindChat();


            mounted = true;


            console.log(
                '[WorkspaceRuntime] Shell mounted'
            );

        }



        activateTab(tabId);


        return true;

    }





    function activateTab(tabId = 'coach') {

        activeTab = tabId;


        document
            .querySelectorAll(
                '[data-workspace-panel]'
            )
            .forEach(panel => {


                const match =
                    panel.dataset.workspacePanel === tabId;


                panel.style.display =
                    match ? 'block' : 'none';


                panel.classList.toggle(
                    'active',
                    match
                );

            });



        document
            .querySelectorAll(
                '[data-workspace-tab]'
            )
            .forEach(button => {


                button.classList.toggle(
                    'active',
                    button.dataset.workspaceTab === tabId
                );

            });


    }





    function bindChat() {


        const form =
            document.getElementById(
                'tc-coach-chat-form'
            );


        const input =
            document.getElementById(
                'tc-coach-chat-input'
            );


        const thread =
            document.getElementById(
                'tc-coach-chat-thread'
            );



        if (!form || !input || !thread) {

            console.warn(
                '[WorkspaceRuntime] Chat UI missing'
            );

            return;

        }



        if (
            form.dataset.bound === 'true'
        ) {

            return;

        }



        form.dataset.bound =
            'true';



        form.addEventListener(
            'submit',
            async event => {


                event.preventDefault();


                const message =
                    input.value.trim();


                if (!message) {
                    return;
                }


                input.value = '';



                addMessage(
                    thread,
                    'Anda',
                    message,
                    'user'
                );



                const loading =
                    addMessage(
                        thread,
                        'AI Coach',
                        'Memproses...',
                        'loading'
                    );



                try {


                    const result =
                        await ConversationOrchestrator.processMessage({

                            conversationId:
                                crypto.randomUUID
                                    ? crypto.randomUUID()
                                    : Date.now().toString(),

                            userMessageText:
                                message,


                            contextSnapshotDTO:
                                {},


                            grantedScope:
                                ['*']

                        });



                    loading.remove();



                    addMessage(
                        thread,
                        'AI Coach',
                        extractResponse(result),
                        'assistant'
                    );



                } catch(error) {


                    loading.remove();



                    addMessage(
                        thread,
                        'System',
                        error.message,
                        'error'
                    );


                    console.error(
                        '[WorkspaceRuntime]',
                        error
                    );

                }


            }
        );


    }





    function extractResponse(result) {


        if (
            result &&
            result.finalResponse &&
            result.finalResponse.rawContent
        ) {

            return result.finalResponse.rawContent;

        }


        return JSON.stringify(
            result
        );

    }





    function addMessage(
        container,
        sender,
        text,
        type
    ) {


        const node =
            document.createElement(
                'div'
            );


        node.className =
            `tc-chat-message ${type}`;


        node.textContent =
            `${sender}: ${text}`;


        container.appendChild(
            node
        );


        container.scrollTop =
            container.scrollHeight;


        return node;

    }





    function destroy() {


        const container =
            document.getElementById(
                'app-workspace'
            );


        if (container) {

            container.innerHTML =
                '';

        }


        mounted = false;
        initialized = false;

    }





    return Object.freeze({

        init,

        mountWorkspace,

        activateTab,

        destroy

    });


})();



export default WorkspaceRuntime;
