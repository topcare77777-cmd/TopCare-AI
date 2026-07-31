/**
 * file: assets/js/plugins/plugin.semver.js
 */

export class PluginSemVer {
    static parseVersion(vStr) {
        if (!vStr || typeof vStr !== 'string') return null;
        const clean = vStr.trim().replace(/^v/, '');
        const [versionPart, metaPart] = clean.split('+');
        const [mainPart, prePart] = versionPart.split('-');
        const parts = mainPart.split('.');

        return {
            major: parts[0] === '*' || parts[0] === 'x' ? '*' : parseInt(parts[0], 10) || 0,
            minor: !parts[1] || parts[1] === '*' || parts[1] === 'x' ? '*' : parseInt(parts[1], 10) || 0,
            patch: !parts[2] || parts[2] === '*' || parts[2] === 'x' ? '*' : parseInt(parts[2], 10) || 0,
            prerelease: prePart ? prePart.split('.') : [],
            metadata: metaPart || null
        };
    }

    static satisfies(targetVerStr, rangeStr) {
        if (!rangeStr || rangeStr.trim() === '*' || rangeStr.trim() === 'latest') return true;
        const target = PluginSemVer.parseVersion(targetVerStr);
        if (!target) return false;

        // Handle Hyphen ranges (e.g., "1.2.0 - 2.3.4")
        if (rangeStr.includes(' - ')) {
            const [min, max] = rangeStr.split(' - ').map(s => s.trim());
            return PluginSemVer.satisfies(targetVerStr, `>=${min}`) && PluginSemVer.satisfies(targetVerStr, `<=${max}`);
        }

        // Handle Logical OR (||)
        const orClauses = rangeStr.split('||').map(c => c.trim());
        return orClauses.some(clause => {
            // Handle AND ranges separated by space (e.g., ">=1.2.0 <2.0.0")
            const andConditions = clause.split(/\s+/);
            return andConditions.every(cond => PluginSemVer._matchSingleCondition(target, cond));
        });
    }

    static _matchSingleCondition(target, cond) {
        const match = cond.match(/^([><=~^]?)\s*([0-9x*]+(?:\.[0-9x*]+)?(?:\.[0-9x*]+)?(?:-[0-9A-Za-z-]+)?)/);
        if (!match) return false;

        const op = match[1] || '=';
        const verStr = match[2];
        const baseVer = PluginSemVer.parseVersion(verStr);

        if (!baseVer) return false;
        if (baseVer.major === '*') return true;

        const tNum = target.major * 10000 + target.minor * 100 + target.patch;
        const bNum = baseVer.major * 10000 + baseVer.minor * 100 + baseVer.patch;

        switch (op) {
            case '>=': return tNum >= bNum;
            case '<=': return tNum <= bNum;
            case '>': return tNum > bNum;
            case '<': return tNum < bNum;
            case '^': {
                if (baseVer.major > 0) return target.major === baseVer.major && tNum >= bNum;
                if (baseVer.minor > 0) return target.major === 0 && target.minor === baseVer.minor && target.patch >= baseVer.patch;
                return target.major === 0 && target.minor === 0 && target.patch === baseVer.patch;
            }
            case '~': {
                return target.major === baseVer.major && target.minor === baseVer.minor && target.patch >= baseVer.patch;
            }
            case '=':
            default: {
                if (baseVer.minor === '*' || baseVer.minor === undefined) return target.major === baseVer.major;
                if (baseVer.patch === '*' || baseVer.patch === undefined) return target.major === baseVer.major && target.minor === baseVer.minor;
                return tNum === bNum;
            }
        }
    }
}