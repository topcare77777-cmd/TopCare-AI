/**
 * file: assets/js/runtime/application.entry.base.js
 */

import { Core } from '../core/index.js';
import { RuntimeBootstrap } from './runtime.bootstrap.js';
import { ApplicationEntryInterface } from './application.entry.interface.js';
import { APPLICATION_ENTRY_EVENTS } from './application.entry.types.js';

export class ApplicationEntryBase extends ApplicationEntryInterface {
    constructor() {
        super();
        this._bootstrapped = false;
        Object.seal(this);
    }

    async bootstrap() {
        if (this._bootstrapped) {
            Core.Logger.info("ApplicationEntry already bootstrapped. Skipping.");
            return true;
        }

        Core.Logger.info("ApplicationEntry composition root starting execution...");

        try {
            // Invoke RuntimeBootstrap composition root engine
            await RuntimeBootstrap.initialize();

            this._bootstrapped = true;

            // Emit application bootstrapped event
            Core.Event.emit(APPLICATION_ENTRY_EVENTS.BOOTSTRAPPED, {
                timestamp: Date.now(),
                version: Core.version
            });

            Core.Logger.info("ApplicationEntry composition root successfully bootstrapped.");
            return true;
        } catch (error) {
            Core.Logger.error(`ApplicationEntry bootstrapping failed: ${error.message}`);
            Core.Event.emit(APPLICATION_ENTRY_EVENTS.FAILED, { error: error.message });
            throw error;
        }
    }

    isBootstrapped() {
        return this._bootstrapped;
    }
}