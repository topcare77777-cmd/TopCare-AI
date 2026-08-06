/**
 * file: assets/js/repository/repository.manager.js
 * Version: 130.0.0 (BUILD 130.0 — REPOSITORY MANAGER RESTORE)
 * Status: APPROVED
 * SRP: Repository lifecycle management and engine initialization.
 */

import { Core } from '../core/index.js';

class RepositoryManagerService {
    constructor() {
        this._engine = null;
        this._initialized = false;

        Object.seal(this);
    }

    /**
     * Initializes repository engine with RepositoryBase instance.
     * @param {Object} repositoryBase
     * @returns {Object}
     */
    initialize(repositoryBase) {
        if (this._initialized && this._engine) {
            Core.Logger.debug('[RepositoryManager] Existing repository engine returned.');
            return this._engine;
        }

        if (!repositoryBase) {
            throw new Error(
                '[RepositoryManager] Initialization failed: RepositoryBase instance is required.'
            );
        }

        const requiredMethods = [
            'query',
            'mutate',
            'setProvider'
        ];

        for (const method of requiredMethods) {
            if (typeof repositoryBase[method] !== 'function') {
                throw new TypeError(
                    `[RepositoryManager] Invalid repository engine. Missing method: ${method}()`
                );
            }
        }

        this._engine = repositoryBase;
        this._initialized = true;

        Core.Logger.info(
            '[RepositoryManager] Repository engine initialized successfully.'
        );

        return this._engine;
    }

    /**
     * Returns active repository engine.
     * @returns {Object|null}
     */
    getEngine() {
        return this._engine;
    }

    /**
     * Checks initialization state.
     * @returns {boolean}
     */
    isInitialized() {
        return this._initialized;
    }

    /**
     * Clears repository engine.
     */
    destroy() {
        this._engine = null;
        this._initialized = false;

        Core.Logger.info(
            '[RepositoryManager] Repository engine destroyed.'
        );
    }
}

export const RepositoryManager = new RepositoryManagerService();

export default RepositoryManager;