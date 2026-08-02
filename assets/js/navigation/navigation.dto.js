/**
 * TOPCARE AI PLATFORM V2 — NAVIGATION ITEM DTO FACTORY
 * Path: assets/js/navigation/navigation.dto.js
 * Version: 2.1.0 (BUILD 139.0 ENTERPRISE)
 * Status: APPROVED & LOCKED
 * SRP: Safe UI-Agnostic DTO Factory with Recursion Guard and Meta Extensions
 */

import { matchRoute } from './navigation.route.matcher.js';
import { deepFreeze } from '../utils/freeze.util.js';

const MAX_DEPTH = 10;

export function createNavigationItemDTO(item, currentPath = '', isVisible = true, depth = 0, visited = new Set()) {
    if (depth > MAX_DEPTH) {
        throw new Error(`[NavigationDTO] Maximum recursion depth (${MAX_DEPTH}) exceeded for item "${item?.id}". Check manifest for circular references.`);
    }

    if (item && typeof item === 'object') {
        if (visited.has(item)) {
            throw new Error(`[NavigationDTO] Circular reference detected in item "${item.id}".`);
        }
        visited.add(item);
    }

    const isExternal = String(item.path || '').startsWith('http://') || String(item.path || '').startsWith('https://');

    const dto = {
        id: String(item.id),
        type: item.type || 'link', // 'link' | 'divider' | 'group' | 'heading'
        title: String(item.title),
        path: String(item.path),
        icon: item.icon ? String(item.icon) : null,

        // Calculated Runtime Flags
        active: matchRoute(currentPath, item.path, item.matchStrategy || 'prefix'),
        visible: Boolean(isVisible),
        disabled: Boolean(item.disabled),

        // Pure Domain Attribute (UI-Agnostic: No 'target' attribute)
        external: isExternal,

        // Extensible Meta Block (Badge, Analytics, Tooltip)
        meta: item.meta ? { ...item.meta } : { badge: item.badge || null },

        children: Array.isArray(item.children)
            ? item.children.map(child => createNavigationItemDTO(child, currentPath, isVisible, depth + 1, visited))
            : []
    };

    return deepFreeze(dto);
}
