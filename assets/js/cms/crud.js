/**
 * ============================================================
 * TopCare AI CMS Engine
 * CRUD Core
 * ------------------------------------------------------------
 * Version : 1.0.0
 * Module  : CMS
 * Author  : TopCare AI
 * ============================================================
 */

"use strict";

/**
 * CRUD Error
 */
export class CrudError extends Error {
    constructor(message, code = "CRUD_ERROR") {
        super(message);
        this.name = "CrudError";
        this.code = code;
    }
}

/**
 * CRUD Events
 */
export const CrudEvents = Object.freeze({
    BEFORE_CREATE: "before:create",
    AFTER_CREATE: "after:create",

    BEFORE_UPDATE: "before:update",
    AFTER_UPDATE: "after:update",

    BEFORE_DELETE: "before:delete",
    AFTER_DELETE: "after:delete",

    BEFORE_READ: "before:read",
    AFTER_READ: "after:read",

    BEFORE_LIST: "before:list",
    AFTER_LIST: "after:list"
});

/**
 * Tiny Event Emitter
 */
class EventEmitter {

    constructor() {
        this.events = new Map();
    }

    on(name, callback) {

        if (!this.events.has(name)) {
            this.events.set(name, []);
        }

        this.events.get(name).push(callback);

        return this;
    }

    off(name, callback) {

        if (!this.events.has(name)) {
            return;
        }

        const list = this.events.get(name);

        this.events.set(
            name,
            list.filter(fn => fn !== callback)
        );

    }

    async emit(name, payload) {

        if (!this.events.has(name)) {
            return;
        }

        for (const callback of this.events.get(name)) {
            await callback(payload);
        }

    }

}

/**
 * Query Builder
 */
class QueryBuilder {

    constructor(data = []) {

        this.original = [...data];

        this.result = [...data];

    }

    where(key, value) {

        this.result = this.result.filter(item => {

            return item[key] === value;

        });

        return this;

    }

    search(keyword = "") {

        if (!keyword) return this;

        keyword = keyword.toLowerCase();

        this.result = this.result.filter(item => {

            return Object.values(item).some(value => {

                return String(value)

                    .toLowerCase()

                    .includes(keyword);

            });

        });

        return this;

    }

    orderBy(key, direction = "asc") {

        this.result.sort((a, b) => {

            if (a[key] < b[key]) {

                return direction === "asc"

                    ? -1

                    : 1;

            }

            if (a[key] > b[key]) {

                return direction === "asc"

                    ? 1

                    : -1;

            }

            return 0;

        });

        return this;

    }

    limit(total) {

        this.result = this.result.slice(0, total);

        return this;

    }

    offset(start) {

        this.result = this.result.slice(start);

        return this;

    }

    paginate(page = 1, perPage = 10) {

        const start = (page - 1) * perPage;

        this.result = this.result.slice(

            start,

            start + perPage

        );

        return this;

    }

    get() {

        return [...this.result];

    }

    first() {

        return this.result[0] ?? null;

    }

    count() {

        return this.result.length;

    }

}

/**
 * CRUD Base
 */
export default class Crud {

    constructor(repository) {

        if (!repository) {

            throw new CrudError(

                "Repository is required."

            );

        }

        this.repository = repository;

        this.events = new EventEmitter();

        this.cache = new Map();

    }

    /**
     * Register event
     */
    on(event, callback) {

        this.events.on(

            event,

            callback

        );

        return this;

    }

    /**
     * Read all data
     */
    async all() {

        await this.events.emit(

            CrudEvents.BEFORE_LIST

        );

        const rows =

            await this.repository.all();

        await this.events.emit(

            CrudEvents.AFTER_LIST,

            rows

        );

        return rows;

    }

    /**
     * Find data
     */
    async find(id) {

        await this.events.emit(

            CrudEvents.BEFORE_READ,

            id

        );

        const row =

            await this.repository.find(id);

        await this.events.emit(

            CrudEvents.AFTER_READ,

            row

        );

        return row;

    }

    /**
     * Query Builder
     */
    async query() {

        const rows =

            await this.repository.all();

        return new QueryBuilder(rows);

    }
        /**
     * Create new record
     */
    async create(data = {}) {

        await this.events.emit(
            CrudEvents.BEFORE_CREATE,
            data
        );

        if (!data || typeof data !== "object") {
            throw new CrudError(
                "Invalid payload."
            );
        }

        if (!data.id) {

            data.id =
                crypto.randomUUID
                    ? crypto.randomUUID()
                    : String(Date.now());

        }

        data.createdAt =
            data.createdAt ??
            new Date().toISOString();

        data.updatedAt =
            new Date().toISOString();

        const created =
            await this.repository.create(data);

        this.cache.set(
            created.id,
            created
        );

        await this.events.emit(
            CrudEvents.AFTER_CREATE,
            created
        );

        return created;

    }

    /**
     * Update record
     */
    async update(id, payload = {}) {

        if (!id) {

            throw new CrudError(
                "Update requires id."
            );

        }

        await this.events.emit(
            CrudEvents.BEFORE_UPDATE,
            {
                id,
                payload
            }
        );

        const current =
            await this.repository.find(id);

        if (!current) {

            throw new CrudError(
                "Record not found.",
                "NOT_FOUND"
            );

        }

        const updated = {

            ...current,

            ...payload,

            updatedAt:
                new Date().toISOString()

        };

        await this.repository.update(
            id,
            updated
        );

        this.cache.set(
            id,
            updated
        );

        await this.events.emit(
            CrudEvents.AFTER_UPDATE,
            updated
        );

        return updated;

    }

    /**
     * Delete record
     */
    async delete(id) {

        if (!id) {

            throw new CrudError(
                "Delete requires id."
            );

        }

        await this.events.emit(
            CrudEvents.BEFORE_DELETE,
            id
        );

        const current =
            await this.repository.find(id);

        if (!current) {

            return false;

        }

        await this.repository.delete(id);

        this.cache.delete(id);

        await this.events.emit(
            CrudEvents.AFTER_DELETE,
            current
        );

        return true;

    }

    /**
     * Exists
     */
    async exists(id) {

        const row =
            await this.repository.find(id);

        return row !== null &&
               row !== undefined;

    }

    /**
     * Count
     */
    async count() {

        const rows =
            await this.repository.all();

        return rows.length;

    }

    /**
     * Cache record
     */
    remember(key, value) {

        this.cache.set(
            key,
            value
        );

        return value;

    }

    /**
     * Read cache
     */
    cacheOf(key) {

        return this.cache.get(key);

    }

    /**
     * Forget cache
     */
    forget(key) {

        this.cache.delete(key);

        return this;

    }

    /**
     * Clear cache
     */
    clearCache() {

        this.cache.clear();

        return this;

    }

    /**
     * Batch Create
     */
    async createMany(items = []) {

        const result = [];

        for (const item of items) {

            result.push(
                await this.create(item)
            );

        }

        return result;

    }

    /**
     * Batch Update
     */
    async updateMany(items = []) {

        const result = [];

        for (const item of items) {

            if (!item.id) {

                continue;

            }

            result.push(

                await this.update(
                    item.id,
                    item
                )

            );

        }

        return result;

    }

    /**
     * Batch Delete
     */
    async deleteMany(ids = []) {

        let total = 0;

        for (const id of ids) {

            const ok =
                await this.delete(id);

            if (ok) {

                total++;

            }

        }

        return total;

    }

    /**
     * Execute transaction
     */
    async transaction(callback) {

        const snapshot =
            structuredClone
                ? structuredClone(
                    await this.repository.all()
                )
                : JSON.parse(
                    JSON.stringify(
                        await this.repository.all()
                    )
                );

        try {

            const result =
                await callback(this);

            return result;

        } catch (error) {

            if (
                typeof this.repository.replaceAll ===
                "function"
            ) {

                await this.repository.replaceAll(
                    snapshot
                );

            }

            throw error;

        }

    }

    /**
     * Destroy
     */
    destroy() {

        this.clearCache();

        this.events =
            new EventEmitter();

        return true;

    }

}
