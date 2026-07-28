/**
 * -----------------------------------------------------------------
 * TOPCARE AI PLATFORM - ARCHITECTURE METADATA
 * -----------------------------------------------------------------
 * Layer        : Core Layer (View Manager)
 * Status       : ACTIVE
 * Version      : 2.2.0
 * Architecture : Development Constitution v1.1
 * Owner        : Frontend Core Team
 * Created      : BUILD 088 View Manager Shell Optimization
 * 
 * Description  : Manages application view activation, shell restoration, 
 *                and shell isolation with safe initialization and browser-safe scrolling.
 * -----------------------------------------------------------------
 */

export const ViewManager = {
    rootContainer: null,
    initialized: false,

    /**
     * Initializes the ViewManager with the application root container.
     * 
     * @param {HTMLElement} rootContainer - Main content container element.
     */
    init(rootContainer) {
        if (this.initialized) {
            return;
        }

        if (!rootContainer) {
            console.warn('[ViewManager] Initialization failed: root container is missing.');
            return;
        }

        this.rootContainer = rootContainer;
        this.initialized = true;
    },

    /**
     * Activates a specific view by hiding others and revealing the target.
     * 
     * @param {string} viewId - Target view identifier string.
     */
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

    /**
     * Restores standard application shell layout (Header, Footer, Container Width).
     */
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

    /**
     * Isolates the view by hiding standard shell elements for full-screen pages.
     */
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
        window.scrollTo({ top: 0, behavior: 'auto' });
    }
};

export default ViewManager;