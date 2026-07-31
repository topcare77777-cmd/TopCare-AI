/**
 * file: assets/js/features/dependency.graph.manager.js
 */

import { DependencyGraphBase } from './dependency.graph.base.js';

export class DependencyGraphManager {
    static initialize(engine) {
        if (!(engine instanceof DependencyGraphBase)) {
            throw new TypeError("DependencyGraphManager requires an instance of DependencyGraphBase.");
        }
        return engine;
    }
}