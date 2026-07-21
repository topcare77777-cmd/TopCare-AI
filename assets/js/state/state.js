import Store from '../state/store.js';
import Persist from './persist.js';

class Application {
    constructor() {
        this.initialized = false;
    }

    async start() {
        if (this.initialized) return;
        try {
            console.log('TopCare AI v2.0 Runtime Starting...');
            Persist.load();
            Store.setState({ initialized: true });
            this.initialized = true;
            console.log('TopCare AI v2.0 Runtime Started Successfully.');
        } catch (error) {
            console.error('Failed to start TopCare AI Application:', error);
        }
    }
}

export default new Application();