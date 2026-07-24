/**
 * TopCare AI Platform V2.0.0
 * Single Source of Truth for Platform Versioning, Build Metadata, and Environment
 * Path: assets/js/auth/events/transport/platform.version.js
 */

const PlatformVersion = Object.freeze({
    version: "2.0.0",
    build: "BUILD 104 Phase 1",
    commit: "f7c8a92b",
    buildDate: "2026-07-25",
    environment: "production",
    toString() {
        return `${this.version} (${this.build}) - commit:${this.commit}`;
    }
});