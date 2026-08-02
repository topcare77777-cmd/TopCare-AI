/**
 * TOPCARE AI PLATFORM V2 — VIRTUAL NODE DOM ADAPTER & THEME TOKENS
 * Path: assets/js/ui/workspace/rendering/dom.adapter.js & theme.tokens.js
 * Status: ACTIVE (ENTERPRISE OPERATING LAYER - HARDENED)
 */

import { deepFreezeDTO } from '../../../core/utils/dto.js';

export const THEME_TOKENS = deepFreezeDTO({
    colors: {
        surfacePrimary: '#1E293B',
        surfaceBackground: '#0F172A',
        textPrimary: '#F8FAFC',
        textMuted: '#94A3B8',
        borderSubtle: '#334155',
        brandPrimary: '#3B82F6',
        accentSuccess: '#10B981',
        accentDanger: '#EF4444'
    },
    spacing: { xs: '4px', sm: '8px', md: '12px', lg: '16px', xl: '24px' },
    radius: { sm: '4px', md: '6px', lg: '8px', full: '9999px' }
});

export function createVNode(tag, props = {}, children = []) {
    return deepFreezeDTO({
        tag: String(tag),
        props: deepFreezeDTO({ ...props }),
        children: Array.isArray(children) ? Object.freeze([...children]) : Object.freeze([String(children)])
    });
}

export const DOMAdapter = Object.freeze({
    /**
     * Converts Virtual Node (vnode) tree into real DOM elements.
     * Zero Long String Concatenations & Zero Hardcoded Inline Style Strings.
     */
    renderToDOM(vnode) {
        if (typeof vnode === 'string' || typeof vnode === 'number') {
            return document.createTextNode(String(vnode));
        }

        const el = document.createElement(vnode.tag);

        if (vnode.props) {
            for (const [key, value] of Object.entries(vnode.props)) {
                if (key === 'className') el.className = value;
                else if (key === 'dataset') {
                    for (const [dKey, dVal] of Object.entries(value)) el.dataset[dKey] = dVal;
                } else if (key === 'styleTokens') {
                    // Apply styles via Theme Tokens Map
                    for (const [sKey, sVal] of Object.entries(value)) el.style[sKey] = sVal;
                } else {
                    el.setAttribute(key, value);
                }
            }
        }

        if (vnode.children) {
            for (const child of vnode.children) {
                el.appendChild(this.renderToDOM(child));
            }
        }

        return el;
    }
});
