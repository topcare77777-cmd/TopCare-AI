/**
 * TopCare AI Platform V2.0.0
 * Dead Letter Store implementation operating strictly on standardized DeadLetterEntry DTOs
 * Path: assets/js/auth/events/store/dead.letter.store.js
 */

class DeadLetterStoreInterface {
    async save(deadLetterEntry) { throw new Error("Not implemented"); }
    async remove(id) { throw new Error("Not implemented"); }
    async count() { throw new Error("Not implemented"); }
    async peek(limit = 10) { throw new Error("Not implemented"); }
    async clear() { throw new Error("Not implemented"); }
    async find(predicate) { throw new Error("Not implemented"); }
    async getAll() { throw new Error("Not implemented"); }
}

class MemoryDeadLetterStore extends DeadLetterStoreInterface {
    constructor() {
        super();
        this.storage = new Map();
    }

    async save(deadLetterEntry) {
        if (!(deadLetterEntry instanceof DeadLetterEntry)) {
            throw new Error("InvalidArgument: save expects a DeadLetterEntry instance.");
        }
        this.storage.set(deadLetterEntry.id, deadLetterEntry);
    }

    async remove(id) {
        return this.storage.delete(id);
    }

    async count() {
        return this.storage.size;
    }

    async peek(limit = 10) {
        return Array.from(this.storage.values()).slice(0, limit);
    }

    async clear() {
        this.storage.clear();
    }

    async find(predicate) {
        const results = [];
        for (const entry of this.storage.values()) {
            if (predicate(entry)) {
                results.push(entry);
            }
        }
        return results;
    }

    async getAll() {
        return Array.from(this.storage.values());
    }
}