/**
 * file: assets/js/features/semver.parser.js
 * Version: 131.0.0
 * Status: APPROVED COMPATIBILITY CONTRACT
 * SRP: Semantic Version Parsing & Comparison Utility
 */

export class SemVerParser {

    static parse(version = '0.0.0') {
        const normalized = String(version)
            .trim()
            .replace(/^v/i, '')
            .split('-')[0];

        const parts = normalized
            .split('.')
            .map(value => Number.parseInt(value, 10))
            .map(value => Number.isNaN(value) ? 0 : value);

        return Object.freeze({
            major: parts[0] ?? 0,
            minor: parts[1] ?? 0,
            patch: parts[2] ?? 0
        });
    }


    static compare(versionA, versionB) {
        const a = this.parse(versionA);
        const b = this.parse(versionB);

        if (a.major !== b.major) {
            return a.major - b.major;
        }

        if (a.minor !== b.minor) {
            return a.minor - b.minor;
        }

        return a.patch - b.patch;
    }


    static satisfies(version, minimum) {
        return this.compare(version, minimum) >= 0;
    }


    static isValid(version) {
        const parsed = this.parse(version);

        return Number.isInteger(parsed.major) &&
            Number.isInteger(parsed.minor) &&
            Number.isInteger(parsed.patch);
    }
}

export default SemVerParser;