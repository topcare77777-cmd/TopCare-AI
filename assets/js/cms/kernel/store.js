/**
 * ==========================================================
 * TopCare AI CMS Framework
 * Kernel Store
 * ==========================================================
 *
 * File    : store.js
 * Version : 2.0.0
 * Status  : Production Foundation
 *
 * Architecture Reference:
 *
 * - docs/Kernel-Architecture.md   (LOCKED)
 * - docs/Kernel-API.md            (LOCKED)
 * - docs/Kernel-Sequence.md       (LOCKED)
 * - docs/Kernel-ADR.md            (LOCKED)
 *
 * Responsibility:
 *
 * - Single Source of Truth
 * - Reactive CMS State
 * - Immutable Snapshot
 * - Watch / Unwatch Pattern
 *
 * ==========================================================
 */

"use strict";


export default class Store {


    #state;

    #initial;

    #listeners = new Map();

    #destroyed = false;

    #updating = false;



    /**
     * Create Store
     *
     * @param {Object} initialState
     */
    constructor(initialState = {}) {

        this.#initial = this.#clone(initialState);

        this.#state = this.#freeze(
            this.#clone(initialState)
        );

    }



    /**
     * Get state value
     *
     * @param {string|null} path
     */
    get(path = null) {

        this.#assertAlive();


        if (!path) {

            return this.snapshot();

        }


        return this.#resolve(
            this.#state,
            path
        );

    }



    /**
     * Set state value
     *
     * @param {string} path
     * @param {*} value
     */
    set(path, value) {

        this.#assertAlive();


        if (this.#updating) {

            return false;

        }


        this.#updating = true;


        try {

            const next =
                this.#clone(this.#state);


            this.#assign(
                next,
                path,
                value
            );


            this.#commit(next);


            return true;


        }
        finally {

            this.#updating = false;

        }

    }



    /**
     * Update state using updater
     *
     * @param {Function} updater
     */
    update(updater) {

        this.#assertAlive();


        if (typeof updater !== "function") {

            return false;

        }


        if (this.#updating) {

            return false;

        }


        this.#updating = true;


        try {


            const draft =
                this.#clone(this.#state);



            updater(draft);



            this.#commit(draft);


            return true;


        }
        finally {

            this.#updating = false;

        }

    }



    /**
     * Immutable snapshot
     */
    snapshot() {

        this.#assertAlive();


        return this.#freeze(
            this.#clone(this.#state)
        );

    }



    /**
     * Register watcher
     *
     * @param {string} path
     * @param {Function} listener
     */
    watch(path, listener) {

        this.#assertAlive();


        if (
            typeof listener !== "function"
        ) {

            return () => {};

        }


        const watchers =
            this.#listeners.get(path) ?? [];


        watchers.push(listener);


        this.#listeners.set(
            path,
            watchers
        );


        return () =>
            this.unwatch(
                path,
                listener
            );

    }



    /**
     * Remove watcher
     *
     * @param {string} path
     * @param {Function} listener
     */
    unwatch(path, listener) {


        const watchers =
            this.#listeners.get(path);


        if (!watchers) {

            return false;

        }


        const filtered =
            watchers.filter(
                item => item !== listener
            );


        if (!filtered.length) {

            this.#listeners.delete(path);

            return true;

        }


        this.#listeners.set(
            path,
            filtered
        );


        return true;

    }



    /**
     * Check state path
     *
     * @param {string} path
     */
    has(path) {

        this.#assertAlive();


        return (
            this.#resolve(
                this.#state,
                path
            ) !== undefined
        );

    }



    /**
     * Reset state
     */
    reset() {

        this.#assertAlive();


        this.#commit(
            this.#clone(this.#initial)
        );


        return true;

    }



    /**
     * Clear state
     */
    clear() {

        this.#assertAlive();


        this.#commit({});


        return true;

    }



    /**
     * Destroy store
     */
    destroy() {

        this.#listeners.clear();


        this.#state = Object.freeze({});


        this.#destroyed = true;


    }



    /**
     * State reference
     */
    state() {

        this.#assertAlive();


        return this.#state;

    }



    /**
     * Commit state change
     *
     * @private
     */
    #commit(next) {


        const previous =
            this.#state;


        this.#state =
            this.#freeze(
                this.#clone(next)
            );


        this.#notify(
            previous,
            this.#state
        );

    }



    /**
     * Notify watchers
     *
     * @private
     */
    #notify(previous, current) {


        for (
            const [
                path,
                listeners
            ]
            of this.#listeners
        ) {


            const oldValue =
                this.#resolve(
                    previous,
                    path
                );


            const newValue =
                this.#resolve(
                    current,
                    path
                );


            if (
                oldValue === newValue
            ) {

                continue;

            }


            for (
                const listener of [...listeners]
            ) {

                try {

                    listener(
                        newValue,
                        oldValue,
                        this.snapshot()
                    );

                }
                catch {

                    continue;

                }

            }


        }


    }



    /**
     * Resolve object path
     *
     * @private
     */
    #resolve(object, path) {


        return path
            .split(".")
            .reduce(
                (value,key)=>
                    value?.[key],
                object
            );

    }



    /**
     * Assign nested value
     *
     * @private
     */
    #assign(object,path,value) {


        const keys =
            path.split(".");


        let target =
            object;


        while(keys.length > 1) {


            const key =
                keys.shift();


            if (
                !target[key] ||
                typeof target[key] !== "object"
            ) {

                target[key] = {};

            }


            target =
                target[key];

        }


        target[keys[0]] = value;


    }



    /**
     * Deep clone
     *
     * @private
     */
    #clone(value) {


        if (
            value === null ||
            typeof value !== "object"
        ) {

            return value;

        }


        if (
            Array.isArray(value)
        ) {

            return value.map(
                item =>
                    this.#clone(item)
            );

        }


        const result = {};


        for (
            const key in value
        ) {

            result[key] =
                this.#clone(
                    value[key]
                );

        }


        return result;

    }



    /**
     * Deep freeze
     *
     * @private
     */
    #freeze(value) {


        if (
            value &&
            typeof value === "object" &&
            !Object.isFrozen(value)
        ) {


            Object.freeze(value);


            for (
                const item of Object.values(value)
            ) {

                this.#freeze(item);

            }

        }


        return value;

    }



    /**
     * Validate lifecycle
     *
     * @private
     */
    #assertAlive() {


        if (this.#destroyed) {

            throw new Error(
                "Store has been destroyed."
            );

        }

    }


}