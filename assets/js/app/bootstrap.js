/**
 * -----------------------------------------------------------------
 * TOPCARE AI PLATFORM - ARCHITECTURE METADATA
 * -----------------------------------------------------------------
 * Layer        : Application Boot Layer (Bootstrap)
 * Status       : ACTIVE
 * Version      : 2.1.0
 * Architecture : Development Constitution v1.1
 * Owner        : Frontend Core Team
 *
 * Description  : Core application bootstrap service module.
 *                Initializes application runtime entry points safely.
 * -----------------------------------------------------------------
 */

export const Bootstrap = {
    initialized: false,

    /**
     * Initializes application runtime lifecycle.
     */
    init() {
        if (this.initialized) {
            return true;
        }

        try {
            if (
                typeof window === 'undefined' ||
                typeof document === 'undefined'
            ) {
                return false;
            }

            const rootContainer =
                document.getElementById('app');

            if (!rootContainer) {
                console.warn(
                    '[Bootstrap] Application root container missing.'
                );
                return false;
            }

            this.initialized = true;

            return true;

        } catch (error) {

            console.error(
                '[Bootstrap] Initialization failed:',
                error
            );

            return false;
        }
    },

    /**
     * Resets bootstrap state.
     */
    destroy() {
        this.initialized = false;
    }
};

export default Bootstrap;