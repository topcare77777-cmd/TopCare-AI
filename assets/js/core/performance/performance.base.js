/**
 * file: assets/js/core/performance/performance.base.js
 */

import { PerformanceInterface } from './performance.interface.js';

export class PerformanceBase extends PerformanceInterface {
    constructor() {
        super();
        Object.seal(this);
    }

    _validateTask(task) {
        if (typeof task !== 'function') {
            throw new TypeError("Performance task must be a valid function.");
        }
    }

    _validateDelay(delay) {
        if (typeof delay !== 'number' || delay < 0 || Number.isNaN(delay)) {
            throw new TypeError("Delay must be a valid non-negative number.");
        }
    }

    schedule(task) {
        this._validateTask(task);
        let completed = false;
        const id = {
            type: 'microtask',
            handle: null,
            cancel: () => {
                completed = true;
            }
        };

        queueMicrotask(() => {
            if (!completed) {
                try {
                    task();
                } catch (err) {
                    // Internal core task execution isolation boundary
                }
            }
        });

        return id;
    }

    defer(task) {
        this._validateTask(task);
        const handle = setTimeout(() => {
            try {
                task();
            } catch (err) {
                // Internal core task execution isolation boundary
            }
        }, 0);

        return {
            type: 'timeout',
            handle,
            cancel: () => clearTimeout(handle)
        };
    }

    idle(task) {
        this._validateTask(task);
        let handle;
        let type;

        if (typeof window !== 'undefined' && typeof window.requestIdleCallback === 'function') {
            type = 'idle';
            handle = window.requestIdleCallback((deadline) => {
                try {
                    task(deadline);
                } catch (err) {
                    // Internal core task execution isolation boundary
                }
            });
            return {
                type,
                handle,
                cancel: () => window.cancelIdleCallback(handle)
            };
        } else {
            type = 'timeout';
            handle = setTimeout(() => {
                try {
                    task({ didTimeout: true, timeRemaining: () => 0 });
                } catch (err) {
                    // Internal core task execution isolation boundary
                }
            }, 1);
            return {
                type,
                handle,
                cancel: () => clearTimeout(handle)
            };
        }
    }

    frame(task) {
        this._validateTask(task);
        let handle;
        if (typeof window !== 'undefined' && typeof window.requestAnimationFrame === 'function') {
            handle = window.requestAnimationFrame((time) => {
                try {
                    task(time);
                } catch (err) {
                    // Internal core task execution isolation boundary
                }
            });
            return {
                type: 'raf',
                handle,
                cancel: () => window.cancelAnimationFrame(handle)
            };
        } else {
            handle = setTimeout(() => {
                try {
                    task(Date.now());
                } catch (err) {
                    // Internal core task execution isolation boundary
                }
            }, 16);
            return {
                type: 'timeout',
                handle,
                cancel: () => clearTimeout(handle)
            };
        }
    }

    debounce(task, delay) {
        this._validateTask(task);
        this._validateDelay(delay);

        let timeoutId = null;
        const debouncedFn = (...args) => {
            if (timeoutId !== null) {
                clearTimeout(timeoutId);
            }
            timeoutId = setTimeout(() => {
                timeoutId = null;
                try {
                    task(...args);
                } catch (err) {
                    // Internal core task execution isolation boundary
                }
            }, delay);
        };

        debouncedFn.cancel = () => {
            if (timeoutId !== null) {
                clearTimeout(timeoutId);
                timeoutId = null;
            }
        };

        return debouncedFn;
    }

    throttle(task, delay) {
        this._validateTask(task);
        this._validateDelay(delay);

        let lastTime = 0;
        let timeoutId = null;

        const throttledFn = (...args) => {
            const now = Date.now();
            const remaining = delay - (now - lastTime);

            if (remaining <= 0 || remaining > delay) {
                if (timeoutId) {
                    clearTimeout(timeoutId);
                    timeoutId = null;
                }
                lastTime = now;
                try {
                    task(...args);
                } catch (err) {
                    // Internal core task execution isolation boundary
                }
            } else if (!timeoutId) {
                timeoutId = setTimeout(() => {
                    lastTime = Date.now();
                    timeoutId = null;
                    try {
                        task(...args);
                    } catch (err) {
                        // Internal core task execution isolation boundary
                    }
                }, remaining);
            }
        };

        throttledFn.cancel = () => {
            if (timeoutId) {
                clearTimeout(timeoutId);
                timeoutId = null;
            }
            lastTime = 0;
        };

        return throttledFn;
    }

    cancel(id) {
        if (id && typeof id.cancel === 'function') {
            id.cancel();
        }
        return this;
    }
}