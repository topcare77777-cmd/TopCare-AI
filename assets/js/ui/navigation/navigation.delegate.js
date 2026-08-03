/**
 * TOPCARE AI PLATFORM V2 — NAVIGATION ROUTER (CANONICAL RUNNER PATCH)
 * Path: assets/js/ui/navigation/router.js
 * Status: ACTIVE - MINIMAL INVASIVE PATCH
 */

import WorkspaceRuntime from '../workspace/workspace.runtime.js';

export const Router = (() => {
    let currentPath = '/';

    function init() {
        console.log('[Router] Initializing Canonical Navigation Delegates...');

        // 1. Global Event Delegation for AI Coach & Navigation Buttons
        document.addEventListener('click', (event) => {
            const coachTrigger = event.target.closest('[data-action="open-coach"], #btn-open-coach, .btn-ai-coach');
            if (coachTrigger) {
                event.preventDefault();
                console.log('[Coach] Button Click Detected via Action Delegate');
                navigate('/workspace/coach');
                return;
            }

            const navLink = event.target.closest('[data-route]');
            if (navLink) {
                event.preventDefault();
                const targetRoute = navLink.getAttribute('data-route');
                navigate(targetRoute);
            }
        });

        // 2. Window Hashchange Event
        window.addEventListener('hashchange', () => {
            const hashPath = window.location.hash.replace('#', '') || '/';
            navigate(hashPath, false);
        });

        // Initial Route Execution
        const initialHash = window.location.hash.replace('#', '') || '/';
        navigate(initialHash, false);
    }

    function navigate(path, updateHash = true) {
        currentPath = path;
        console.log(`[Router] Navigate -> ${path}`);

        if (updateHash && window.location.hash !== `#${path}`) {
            window.location.hash = path;
        }

        // Canonical Routing Execution
        if (path.startsWith('/workspace')) {
            showWorkspaceLayout();

            if (path.includes('/coach')) {
                WorkspaceRuntime.activateTab('coach');
            } else if (path.includes('/personality')) {
                WorkspaceRuntime.activateTab('personality');
            } else if (path.includes('/dashboard')) {
                WorkspaceRuntime.activateTab('dashboard');
            } else if (path.includes('/memory')) {
                WorkspaceRuntime.activateTab('memory');
            } else {
                WorkspaceRuntime.activateTab('default');
            }
        } else {
            showHomeLayout();
        }
    }

    function showHomeLayout() {
        const homeEl = document.getElementById('app-home');
        const workspaceEl = document.getElementById('app-workspace');
        if (homeEl) homeEl.style.display = 'block';
        if (workspaceEl) workspaceEl.style.display = 'none';
    }

    function showWorkspaceLayout() {
        const homeEl = document.getElementById('app-home');
        const workspaceEl = document.getElementById('app-workspace');
        if (homeEl) homeEl.style.display = 'none';
        if (workspaceEl) workspaceEl.style.display = 'block';
    }

    return Object.freeze({
        init,
        navigate
    });
})();

export default Router;
