/**
 * file: assets/js/runtime/application.entry.service.js
 */

import { ApplicationEntryBase } from './application.entry.base.js';
import { ApplicationEntryManager } from './application.entry.manager.js';

const engine = ApplicationEntryManager.initialize(new ApplicationEntryBase());

export const ApplicationEntry = Object.freeze({
    async bootstrap() {
        return await engine.bootstrap();
    },
    isBootstrapped() {
        return engine.isBootstrapped();
    }
});