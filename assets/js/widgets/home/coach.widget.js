/**
 * -----------------------------------------------------------------
 * TOPCARE AI PLATFORM - ARCHITECTURE METADATA
 * -----------------------------------------------------------------
 * Layer        : Widget Layer
 * Status       : ACTIVE (BUILD 29 UI STABILIZATION)
 * Version      : 3.2.0
 * Architecture : Pure UI Renderer (ViewModel-Driven)
 * Pattern      : Event Driven Navigation Bridge
 *
 * API :
 *   render(container, viewModel)
 *   refresh(viewModel)
 *   destroy()
 * -----------------------------------------------------------------
 */

const CoachWidget = {

    container: null,
    viewModel: null,


    async render(container, viewModel = null) {

        if (!container) {
            console.warn(
                "[CoachWidget] container missing"
            );
            return;
        }


        this.container = container;
        this.viewModel = viewModel;


        if (!this.viewModel) {
            console.warn(
                "[CoachWidget] viewModel missing"
            );
            return;
        }


        if (typeof this.container.replaceChildren === 'function') {
            this.container.replaceChildren();
        } else {
            this.container.innerHTML = '';
        }



        const wrapper =
            document.createElement(
                'section'
            );


        wrapper.className =
            'coach-section-match';



        const header =
            this.viewModel.header || {};


        const user =
            header.user || {};


        const coaches =
            this.viewModel.coaches || [];



        const greeting =
            header.greeting || '';



        const displayName =
            user.name || 'Tamu';



        const membershipBadge =
            user.membershipTag || '';



        const coachesHTML =
            coaches.map(coach => `

                <div class="coach-card-match">

                    <h3 class="coach-name">
                        ${coach.name || ''}
                    </h3>

                    <p class="coach-specialty">
                        ${coach.specialty || ''}
                    </p>

                    <p class="coach-bio">
                        ${coach.bio || ''}
                    </p>

                </div>

            `).join('');



        wrapper.innerHTML = `

            <div class="coach-header">

                <div class="coach-user-meta">

                    <span class="coach-greeting">
                        ${greeting}
                    </span>


                    ${
                        membershipBadge
                        ?
                        `
                        <span class="coach-membership-tag">
                            ${membershipBadge}
                        </span>
                        `
                        :
                        ''
                    }

                </div>



                <span class="coach-badge">
                    ${header.badge || ''}
                </span>



                <h2 class="coach-title">
                    ${header.title || ''}
                </h2>



                <p class="coach-desc">

                    Selamat datang kembali,
                    ${displayName}.

                    Panduan terstruktur yang
                    disesuaikan dengan temperamen
                    dan tujuan Anda.

                </p>



                <button
                    class="btn-ai-coach"
                    type="button"
                    data-coach-action="open">

                    Mulai Sesi AI Coach

                </button>


            </div>



            <div class="coach-grid">

                ${coachesHTML}

            </div>

        `;



        this.container.appendChild(
            wrapper
        );



        this.attachEvents();

    },



    attachEvents() {

        const button =
            this.container?.querySelector(
                '[data-coach-action="open"]'
            );


        if (!button) {
            return;
        }



        if (
            button.dataset.bound === 'true'
        ) {
            return;
        }



        button.dataset.bound =
            'true';



        button.addEventListener(
            'click',
            () => {


                document.dispatchEvent(
                    new CustomEvent(
                        'topcare:open-coach'
                    )
                );


            }
        );

    },



    async refresh(viewModel = null) {

        if (viewModel) {

            this.viewModel =
                viewModel;

        }


        if (
            this.container &&
            this.viewModel
        ) {

            await this.render(
                this.container,
                this.viewModel
            );

        }

    },



    destroy() {

        if (!this.container) {
            return;
        }



        if (
            typeof this.container.replaceChildren === 'function'
        ) {

            this.container.replaceChildren();

        } else {

            this.container.innerHTML = '';

        }



        this.viewModel = null;
        this.container = null;

    }

};


export {
    CoachWidget
};
