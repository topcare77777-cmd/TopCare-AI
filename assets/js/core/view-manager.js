// assets/js/core/view-manager.js
export const ViewManager = {
    rootContainer: null,
    initialized: false,

    init(rootContainer) {
        if (this.initialized) {
            return;
        }
        this.rootContainer = rootContainer || null;
        this.initialized = true;
    },

    activateView(viewId) {
        if (!viewId) {
            return;
        }
        document.querySelectorAll('.page-view').forEach(view => {
            view.classList.remove('active-view');
        });

        const targetView = document.getElementById(`view-${viewId}`);
        if (targetView) {
            targetView.classList.add('active-view');
        } else {
            const homeView = document.getElementById('view-home');
            if (homeView) {
                homeView.classList.add('active-view');
            }
        }
    },

    restoreShell() {
        const header = document.querySelector('.site-header');
        if (header) {
            header.style.display = '';
        }

        const footer = document.querySelector('.footer-match');
        if (footer) {
            footer.style.display = '';
        }

        if (this.rootContainer) {
            this.rootContainer.style.padding = '';
            this.rootContainer.style.margin = '';
            this.rootContainer.style.maxWidth = '';
        }
    },

    isolateShell() {
        const header = document.querySelector('.site-header');
        if (header) {
            header.style.display = 'none';
        }

        const footer = document.querySelector('.footer-match');
        if (footer) {
            footer.style.display = 'none';
        }

        if (this.rootContainer) {
            this.rootContainer.style.padding = '0';
            this.rootContainer.style.margin = '0';
            this.rootContainer.style.maxWidth = '100%';
        }
        window.scrollTo({ top: 0, behavior: 'instant' });
    }
};

export default ViewManager;