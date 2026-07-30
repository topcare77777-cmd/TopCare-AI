/**
 * file: assets/js/router/history.base.js
 */

import { Core } from '../core/index.js';
import { HistoryInterface } from './history.interface.js';
import { ROUTER_EVENTS } from './router.types.js';

export class HistoryBase extends HistoryInterface {
    constructor() {
        super();
        this._entries = [];
        this._currentIndex = -1;
        Object.seal(this);
    }

    _validatePath(path) {
        if (!path || typeof path !== 'string') {
            throw new TypeError("History path must be a valid non-empty string.");
        }
    }

    push(path) {
        this._validatePath(path);
        const normalizedPath = path.startsWith('/') ? path : `/${path}`;

        // Truncate any forward history if we push from a middle index
        if (this._currentIndex < this._entries.length - 1) {
            this._entries = this._entries.slice(0, this._currentIndex + 1);
        }

        this._entries.push(normalizedPath);
        this._currentIndex = this._entries.length - 1;

        Core.Logger.debug(`History pushed path: ${normalizedPath} (Index: ${this._currentIndex})`);
        Core.Event.emit(ROUTER_EVENTS.HISTORY_PUSH, { path: normalizedPath, index: this._currentIndex });

        return this;
    }

    replace(path) {
        this._validatePath(path);
        const normalizedPath = path.startsWith('/') ? path : `/${path}`;

        if (this._entries.length === 0) {
            this._entries.push(normalizedPath);
            this._currentIndex = 0;
        } else {
            this._entries[this._currentIndex] = normalizedPath;
        }

        Core.Logger.debug(`History replaced path: ${normalizedPath} (Index: ${this._currentIndex})`);
        Core.Event.emit(ROUTER_EVENTS.HISTORY_REPLACE, { path: normalizedPath, index: this._currentIndex });

        return this;
    }

    back() {
        if (this._currentIndex > 0) {
            this._currentIndex--;
            const targetPath = this._entries[this._currentIndex];
            Core.Logger.debug(`History went back to: ${targetPath} (Index: ${this._currentIndex})`);
            Core.Event.emit(ROUTER_EVENTS.HISTORY_BACK, { path: targetPath, index: this._currentIndex });
            return targetPath;
        }
        return null;
    }

    forward() {
        if (this._currentIndex < this._entries.length - 1) {
            this._currentIndex++;
            const targetPath = this._entries[this._currentIndex];
            Core.Logger.debug(`History went forward to: ${targetPath} (Index: ${this._currentIndex})`);
            Core.Event.emit(ROUTER_EVENTS.HISTORY_FORWARD, { path: targetPath, index: this._currentIndex });
            return targetPath;
        }
        return null;
    }

    current() {
        if (this._currentIndex >= 0 && this._currentIndex < this._entries.length) {
            return this._entries[this._currentIndex];
        }
        return null;
    }

    previous() {
        if (this._currentIndex > 0) {
            return this._entries[this._currentIndex - 1];
        }
        return null;
    }

    length() {
        return this._entries.length;
    }

    clear() {
        this._entries = [];
        this._currentIndex = -1;
        Core.Logger.debug("History entries cleared.");
        return this;
    }
}