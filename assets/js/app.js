/**
 * TOPCARE AI PLATFORM V2 — APP ORPHAN ENTRYPOINT
 * Path: assets/js/app.js
 * Status: CLEANED (BUILD 137.4)
 */

import { Core } from './core/index.js';

export class AppEngine {
    constructor() {
        Object.seal(this);
    }

    initialize() {
        Core.Logger.info('[App] Legacy application bootstrap invoked.');
        // Note: DownloadCenterModule.install() has been securely removed.
        // Route orchestration is now handled entirely by RuntimeBootstrap & Router.
    }
}

export const App = new AppEngine();
export default App;