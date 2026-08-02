/**
 * TOPCARE AI PLATFORM V2 — CONFIGURABLE ROUTE MATCHER
 * Path: assets/js/navigation/navigation.route.matcher.js
 * Version: 2.1.0 (BUILD 139.0 ENTERPRISE)
 * Status: APPROVED & LOCKED
 * SRP: Multi-Strategy Route Matching Engine (Exact, Prefix, Wildcard, Parameterized)
 */

export function matchRoute(currentPath, targetPath, strategy = 'prefix') {
    if (!currentPath || !targetPath) return false;

    const cleanCurrent = String(currentPath).replace('#', '').split('?')[0].toLowerCase();
    const cleanTarget = String(targetPath).replace('#', '').split('?')[0].toLowerCase();

    // Strategy 1: Exact Match
    if (cleanCurrent === cleanTarget) return true;
    if (strategy === 'exact') return false;

    // Strategy 2: Wildcard Match (/profile/*)
    if (cleanTarget.endsWith('/*')) {
        const baseTarget = cleanTarget.slice(0, -2);
        return cleanCurrent === baseTarget || cleanCurrent.startsWith(`${baseTarget}/`);
    }

    // Strategy 3: Parameterized Route Match (/learning/:slug or /workspace/:id)
    if (cleanTarget.includes('/:')) {
        const targetParts = cleanTarget.split('/').filter(Boolean);
        const currentParts = cleanCurrent.split('/').filter(Boolean);

        if (targetParts.length !== currentParts.length) return false;

        return targetParts.every((part, index) => {
            if (part.startsWith(':')) return true; // Dynamic Parameter Token
            return part === currentParts[index];
        });
    }

    // Strategy 4: Prefix Sub-route Match (/workspace/coach matches /workspace/coach/chat, but NOT /workspace-ai)
    if (strategy === 'prefix' && cleanTarget !== '/' && cleanTarget !== '/home') {
        return cleanCurrent.startsWith(`${cleanTarget}/`);
    }

    return false;
}

export default matchRoute;
