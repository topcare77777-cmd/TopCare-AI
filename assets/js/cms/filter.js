/**
 * ==========================================================
 * TopCare AI CMS Filter Engine
 * ==========================================================
 *
 * File    : filter.js
 * Version : 1.0.0
 *
 * Features:
 * - Multi Condition Filter
 * - AND / OR Logic
 * - Sorting Hook
 * - Search Compatible
 * - CMS Event Driven
 *
 * ==========================================================
 */

"use strict";

import CMS from "./cms.js";


class FilterEngine {

    #data = [];

    #conditions = [];

    #mode = "AND";

    #sorter = null;

    #lastResult = [];

    #config = {
        caseSensitive:false
    };


    constructor(config = {}) {

        this.#config = {
            ...this.#config,
            ...config
        };

        if (
            config.mode &&
            ["AND","OR"].includes(config.mode)
        ) {

            this.#mode = config.mode;

        }

    }


    /**
     * Set dataset
     */
    setData(data = []) {

        if (!Array.isArray(data)) {

            throw new Error(
                "Filter data harus berupa array."
            );

        }

        this.#data = data;

        CMS.emit(
            "filter.data.changed",
            data
        );

        return this;

    }


    /**
     * Get dataset
     */
    data() {

        return this.#data;

    }


    /**
     * Add condition
     */
    where(field, operator, value) {

        this.#conditions.push({
            field,
            operator,
            value
        });

        return this;

    }


    /**
     * Remove all conditions
     */
    clearConditions() {

        this.#conditions = [];

        return this;

    }


    /**
     * Change logic mode
     */
    mode(type) {

        if (
            ["AND","OR"].includes(type)
        ) {

            this.#mode = type;

        }

        return this;

    }


    /**
     * Apply filter
     */
    apply() {

        let result = [

            ...this.#data

        ];


        if (
            this.#conditions.length
        ) {

            result = result.filter(
                item =>
                    this.match(item)
            );

        }


        if (
            typeof this.#sorter ===
            "function"
        ) {

            result.sort(
                this.#sorter
            );

        }


        this.#lastResult = result;


        CMS.emit(
            "filter.success",
            result
        );


        return result;

    }


    /**
     * Match item against conditions
     */
    match(item) {

        const results =
            this.#conditions.map(
                condition =>
                    this.check(
                        item,
                        condition
                    )
            );


        return this.#mode === "OR"

            ? results.some(Boolean)

            : results.every(Boolean);

    }
    
    /**
     * Operator resolver
     */
    check(item, condition) {

        const value =
            item?.[condition.field];

        const target =
            condition.value;

        switch(condition.operator) {

            case "equals":
                return this.compare(
                    value,
                    target
                );

            case "contains":
                return this.text(value)
                    .includes(
                        this.text(target)
                    );

            case "startsWith":
                return this.text(value)
                    .startsWith(
                        this.text(target)
                    );

            case "endsWith":
                return this.text(value)
                    .endsWith(
                        this.text(target)
                    );

            case "greaterThan":
                return Number(value) >
                    Number(target);

            case "lessThan":
                return Number(value) <
                    Number(target);

            case "between":
                return (
                    Number(value) >=
                    Number(target[0])
                ) &&
                (
                    Number(value) <=
                    Number(target[1])
                );

            case "in":
                return Array.isArray(target) &&
                    target.includes(value);

            case "custom":
                return typeof target ===
                    "function"
                    ? target(value,item)
                    : false;

            default:
                return false;

        }

    }


    /**
     * Compare value
     */
    compare(value,target) {

        if (
            typeof value === "string" &&
            typeof target === "string"
        ) {

            return this.#config.caseSensitive

                ? value === target

                : value.toLowerCase() ===
                  target.toLowerCase();

        }

        return value === target;

    }


    /**
     * Normalize text
     */
    text(value) {

        const text =
            String(value ?? "");

        return this.#config.caseSensitive

            ? text

            : text.toLowerCase();

    }


    /**
     * Sorting
     */
    sort(callback) {

        if (
            typeof callback !==
            "function"
        ) {

            throw new Error(
                "Sorter harus berupa function."
            );

        }

        this.#sorter = callback;

        return this;

    }


    /**
     * Simple sort helper
     */
    orderBy(field, direction = "asc") {

        this.#sorter = (a,b)=>{

            const first =
                a?.[field];

            const second =
                b?.[field];


            if (first < second) {

                return direction === "desc"
                    ? 1
                    : -1;

            }


            if (first > second) {

                return direction === "desc"
                    ? -1
                    : 1;

            }


            return 0;

        };


        return this;

    }


    /**
     * Pagination hook
     */
    paginate(page = 1, limit = 10) {

        const start =
            (page - 1) * limit;


        return {

            data:
                this.#lastResult.slice(
                    start,
                    start + limit
                ),

            page,

            limit,

            total:
                this.#lastResult.length

        };

    }


    /**
     * Last result
     */
    result() {

        return this.#lastResult;

    }


    /**
     * Reset engine
     */
    reset() {

        this.#conditions = [];

        this.#lastResult = [];

        this.#sorter = null;

        CMS.emit(
            "filter.reset"
        );

        return this;

    }


    /**
     * State information
     */
    state() {

        return {

            data:

                this.#data.length,

            conditions:

                this.#conditions.length,

            mode:

                this.#mode,

            result:

                this.#lastResult.length

        };

    }


    /**
     * Destroy
     */
    destroy() {

        this.reset();

        this.#data = [];

        CMS.emit(
            "filter.destroyed"
        );

        return this;

    }


    /**
     * Factory
     */
    static create(config = {}) {

        return new FilterEngine(
            config
        );

    }

}


/**
 * Export
 */
export {
    FilterEngine
};

export default FilterEngine;