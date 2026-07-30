/**
 * file: assets/js/router/router.utils.js
 */

export class RouterUtils {
    static parseQuery(queryString) {
        if (!queryString || typeof queryString !== 'string') {
            return {};
        }
        const query = {};
        const cleanStr = queryString.startsWith('?') ? queryString.slice(1) : queryString;
        if (!cleanStr) return query;

        const pairs = cleanStr.split('&');
        for (const pair of pairs) {
            if (!pair) continue;
            const [rawKey, rawVal] = pair.split('=');
            if (rawKey === undefined) continue;

            const key = decodeURIComponent(rawKey.replace(/\+/g, ' '));
            const val = rawVal !== undefined ? decodeURIComponent(rawVal.replace(/\+/g, ' ')) : '';

            if (Object.prototype.hasOwnProperty.call(query, key)) {
                if (Array.isArray(query[key])) {
                    query[key].push(val);
                } else {
                    query[key] = [query[key], val];
                }
            } else {
                query[key] = val;
            }
        }
        return query;
    }

    static matchRoute(registeredPath, currentPath) {
        if (registeredPath === currentPath) {
            return { matched: true, params: {} };
        }

        const regSegments = registeredPath.split('/').filter(Boolean);
        const curSegments = currentPath.split('/').filter(Boolean);

        if (regSegments.length !== curSegments.length) {
            return { matched: false, params: {} };
        }

        const params = {};
        for (let i = 0; i < regSegments.length; i++) {
            const regSeg = regSegments[i];
            const curSeg = curSegments[i];

            if (regSeg.startsWith(':')) {
                const paramName = regSeg.slice(1);
                params[paramName] = decodeURIComponent(curSeg);
            } else if (regSeg !== curSeg) {
                return { matched: false, params: {} };
            }
        }

        return { matched: true, params };
    }
}