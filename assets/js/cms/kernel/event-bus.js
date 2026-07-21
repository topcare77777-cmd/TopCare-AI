/**
 * ==========================================================
 * TopCare AI CMS Framework
 * Event Bus
 * ==========================================================
 */

"use strict";

import CMSException from "./cms-exception.js";

export default class EventBus {

    #events = new Map();

    /**
     * Register listener
     */
    on(event, listener, options = {}) {

        if (typeof event !== "string" || !event.trim()) {
            throw new CMSException(
                "EVENT_INVALID",
                "Event name harus berupa string."
            );
        }

        if (typeof listener !== "function") {
            throw new CMSException(
                "LISTENER_INVALID",
                "Listener harus berupa function."
            );
        }

        const entry = {
            listener,
            once: Boolean(options.once),
            priority: Number(options.priority ?? 0)
        };

        const listeners = this.#events.get(event) ?? [];

        listeners.push(entry);

        listeners.sort(
            (a, b) => b.priority - a.priority
        );

        this.#events.set(
            event,
            listeners
        );

        return () => this.off(event, listener);

    }

    /**
     * Register one-time listener
     */
    once(event, listener, options = {}) {

        return this.on(
            event,
            listener,
            {
                ...options,
                once: true
            }
        );

    }

    /**
     * Remove listener
     */
    off(event, listener) {

        const listeners = this.#events.get(event);

        if (!listeners) {
            return false;
        }

        const filtered = listeners.filter(
            item => item.listener !== listener
        );

        if (!filtered.length) {

            this.#events.delete(event);

            return true;

        }

        this.#events.set(
            event,
            filtered
        );

        return true;

    }

    /**
     * Remove all listeners
     */
    clear(event = null) {

        if (event === null) {

            this.#events.clear();

            return this;

        }

        this.#events.delete(event);

        return this;

    }

    /**
     * Listener list
     */
    listeners(event) {

        return [
            ...(this.#events.get(event) ?? [])
        ];

    }

    /**
     * Event exists
     */
    has(event) {

        return this.#events.has(event);

    }

    /**
     * Total listeners
     */
    count(event = null) {

        if (event !== null) {

            return (
                this.#events.get(event)?.length ?? 0
            );

        }

        let total = 0;

        for (const listeners of this.#events.values()) {
            total += listeners.length;
        }

        return total;

    }

    /**
     * Resolve listeners
     */
    resolve(event) {

        const resolved = [
            ...(this.#events.get(event) ?? [])
        ];

        for (const [key, listeners] of this.#events.entries()) {

            if (
                key.endsWith("*") &&
                event.startsWith(
                    key.slice(0, -1)
                )
            ) {

                resolved.push(...listeners);

            }

        }

        resolved.sort(
            (a, b) => b.priority - a.priority
        );

        return resolved;

    }