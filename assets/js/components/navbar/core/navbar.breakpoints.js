/**
 * TOPCARE AI PLATFORM V2 — NAVBAR BREAKPOINT ENGINE
 * Path: assets/js/components/navbar/core/navbar.breakpoints.js
 * Version: 132.0.0 (BUILD 132.0 — CANONICAL BASELINE)
 * Status: APPROVED & LOCKED
 * SRP: High-performance matchMedia breakpoint watcher with legacy resize fallback.
 */

import { MEDIA_QUERY_DESKTOP, MOBILE_BREAKPOINT } from '../navbar.constants.js';

export class NavbarBreakpoints {
    constructor() {
        this._mediaQueryList = null;
        this._resizeFallbackTimer = null;
        this._onBreakpointChange = null;
        this._onThrottledResize = null;
    }

    /**
     * Binds media query watcher or throttled resize fallback.
     * @param {Function} onDesktopMatchCallback 
     */
    watch(onDesktopMatchCallback) {
        this.unwatch();

        this._onBreakpointChange = (e) => {
            if (e.matches && typeof onDesktopMatchCallback === 'function') {
                onDesktopMatchCallback();
            }
        };

        this._onThrottledResize = () => {
            if (this._resizeFallbackTimer) return;
            this._resizeFallbackTimer = setTimeout(() => {
                this._resizeFallbackTimer = null;
                if (window.innerWidth > MOBILE_BREAKPOINT && typeof onDesktopMatchCallback === 'function') {
                    onDesktopMatchCallback();
                }
            }, 150);
        };

        if (typeof window !== 'undefined' && window.matchMedia) {
            this._mediaQueryList = window.matchMedia(MEDIA_QUERY_DESKTOP);
            if (this._mediaQueryList.addEventListener) {
                this._mediaQueryList.addEventListener('change', this._onBreakpointChange);
            } else if (this._mediaQueryList.addListener) {
                this._mediaQueryList.addListener(this._onBreakpointChange);
            }

            // Sync initial state on load
            if (this._mediaQueryList.matches && typeof onDesktopMatchCallback === 'function') {
                onDesktopMatchCallback();
            }
        } else {
            window.addEventListener('resize', this._onThrottledResize);
        }
    }

    unwatch() {
        if (this._mediaQueryList) {
            if (this._mediaQueryList.removeEventListener) {
                this._mediaQueryList.removeEventListener('change', this._onBreakpointChange);
            } else if (this._mediaQueryList.removeListener) {
                this._mediaQueryList.removeListener(this._onBreakpointChange);
            }
            this._mediaQueryList = null;
        }

        window.removeEventListener('resize', this._onThrottledResize);

        if (this._resizeFallbackTimer) {
            clearTimeout(this._resizeFallbackTimer);
            this._resizeFallbackTimer = null;
        }
    }
}