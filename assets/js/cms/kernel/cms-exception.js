/**
 * ==========================================================
 * TopCare AI CMS Framework
 * Kernel Exception
 * ==========================================================
 *
 * File    : cms-exception.js
 * Version : 2.1.0
 * Status  : LOCKED IMPLEMENTATION
 *
 * Purpose:
 * Centralized immutable error contract for CMS Kernel.
 *
 * Architecture Reference:
 * - docs/Kernel-Architecture.md
 * - docs/Kernel-API.md
 * - docs/Kernel-Sequence.md
 * - docs/Kernel-ADR.md
 *
 * Design Rules:
 * - Zero Dependency
 * - Immutable Error Object
 * - Deep Frozen Context
 * - Native Error Compatible
 * - Cause Chain Support
 * - Static Factory Support
 *
 * ==========================================================
 */

"use strict";


export default class CMSException extends Error {


    /**
     * Create CMS Kernel Exception
     *
     * @param {string} code
     * @param {string} message
     * @param {object} context
     * @param {object|null} options
     */
    constructor(
        code = "CMS.UNKNOWN",
        message = "Unknown CMS Error",
        context = {},
        options = {}
    ) {

        super(message);


        this.name = "CMSException";


        this.code = String(code);


        this.message = String(message);


        this.context = CMSException.deepFreeze(
            context ?? {}
        );


        this.timestamp = Date.now();


        this.cause = options.cause ?? null;


        this.severity =
            options.severity ??
            "ERROR";


        this.recoverable =
            Boolean(
                options.recoverable ?? false
            );


        this.namespace =
            options.namespace ??
            "CMS";


        this.metadata =
            CMSException.deepFreeze(
                options.metadata ?? {}
            );


        if (
            Error.captureStackTrace
        ) {

            Error.captureStackTrace(
                this,
                CMSException
            );

        }


        Object.freeze(this);

    }



    /**
     * Convert error to JSON-safe object
     *
     * @returns {object}
     */
    toJSON() {

        return {

            name: this.name,

            code: this.code,

            message: this.message,

            context: this.context,

            timestamp: this.timestamp,

            cause:
                this.cause
                    ? CMSException.serializeCause(
                        this.cause
                    )
                    : null,

            severity: this.severity,

            recoverable:
                this.recoverable,

            namespace:
                this.namespace,

            metadata:
                this.metadata

        };

    }



    /**
     * String representation
     *
     * @returns {string}
     */
    toString() {

        return (
            `[${this.code}] ${this.message}`
        );

    }



    /**
     * Create exception from unknown error
     *
     * @param {unknown} error
     * @param {string} code
     * @param {object} context
     *
     * @returns {CMSException}
     */
    static from(
        error,
        code = "CMS.UNKNOWN",
        context = {}
    ) {


        if (
            error instanceof CMSException
        ) {

            return error;

        }


        return new CMSException(
            code,
            error?.message ??
                String(error),
            context,
            {
                cause:error
            }
        );

    }



    /**
     * Invalid argument factory
     *
     * @param {string} message
     * @param {object} context
     *
     * @returns {CMSException}
     */
    static invalid(
        message,
        context = {}
    ) {

        return new CMSException(
            "CMS.INVALID",
            message,
            context
        );

    }



    /**
     * Not found factory
     *
     * @param {string} message
     * @param {object} context
     *
     * @returns {CMSException}
     */
    static notFound(
        message,
        context = {}
    ) {

        return new CMSException(
            "CMS.NOT_FOUND",
            message,
            context
        );

    }



    /**
     * Configuration error factory
     *
     * @param {string} message
     * @param {object} context
     *
     * @returns {CMSException}
     */
    static configuration(
        message,
        context = {}
    ) {

        return new CMSException(
            "CMS.CONFIGURATION",
            message,
            context
        );

    }



    /**
     * Lifecycle error factory
     *
     * @param {string} message
     * @param {object} context
     *
     * @returns {CMSException}
     */
    static lifecycle(
        message,
        context = {}
    ) {

        return new CMSException(
            "CMS.LIFECYCLE",
            message,
            context
        );

    }



    /**
     * Deep freeze object
     *
     * Protect:
     * - Object
     * - Array
     * - Nested Object
     *
     * @param {any} value
     *
     * @returns {any}
     */
    static deepFreeze(value) {


        if (
            value === null ||
            typeof value !== "object"
        ) {

            return value;

        }


        if (
            Object.isFrozen(value)
        ) {

            return value;

        }


        for (
            const key of Reflect.ownKeys(value)
        ) {


            const item =
                value[key];


            CMSException.deepFreeze(
                item
            );

        }


        return Object.freeze(value);

    }



    /**
     * Serialize cause safely
     *
     * @param {unknown} cause
     *
     * @returns {object|string}
     */
    static serializeCause(
        cause
    ) {


        if (
            cause instanceof Error
        ) {

            return {

                name:
                    cause.name,

                message:
                    cause.message

            };

        }


        return String(cause);

    }



}