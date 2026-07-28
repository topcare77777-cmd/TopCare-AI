/**
 * -----------------------------------------------------------------
 * TOPCARE AI PLATFORM - ARCHITECTURE METADATA
 * -----------------------------------------------------------------
 * File         : assets/js/auth/session/session.repository.interface.js
 * Layer        : Session Repository Interface Layer
 * Status       : ACTIVE
 * Version      : 1.1.0
 * Architecture : Development Constitution v1.1
 * Description  : Abstract interface defining session persistence contracts
 *                with update capability for database evolution.
 * -----------------------------------------------------------------
 */

export class SessionRepositoryInterface {
    async save(session) { throw new Error("Not implemented"); }
    async update(session) { throw new Error("Not implemented"); }
    async load() { throw new Error("Not implemented"); }
    async clear() { throw new Error("Not implemented"); }
    async exists() { throw new Error("Not implemented"); }
    async isExpired() { throw new Error("Not implemented"); }
}

export default SessionRepositoryInterface;