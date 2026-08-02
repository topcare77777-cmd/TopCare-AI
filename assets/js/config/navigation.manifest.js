/**
 * TOPCARE AI PLATFORM V2 — UNIFIED NAVIGATION MANIFEST
 * Path: assets/js/config/navigation.manifest.js
 * Version: 2.1.0 (BUILD 139.0 ENTERPRISE)
 * Status: APPROVED & LOCKED
 * SRP: Immutable Declarative Navigation Configuration with Versioning & Meta Extensions
 */

export const NavigationManifest = Object.freeze({
    version: "2.1.0",
    schema: 1,
    surfaces: Object.freeze({
        navbar: Object.freeze([
            {
                id: "nav_home",
                type: "link",
                title: "Home",
                path: "/home",
                icon: "home",
                order: 1,
                access: Object.freeze({ authenticated: false, guestOnly: false, permissions: [], roles: [] })
            },
            {
                id: "nav_learning",
                type: "link",
                title: "Learning",
                path: "/learning",
                icon: "book",
                order: 2,
                access: Object.freeze({ authenticated: false, guestOnly: false, permissions: [], roles: [] })
            },
            {
                id: "nav_coach",
                type: "link",
                title: "AI Coach",
                path: "/workspace/coach",
                icon: "bot",
                order: 3,
                meta: Object.freeze({ badge: "AI" }),
                access: Object.freeze({ authenticated: true, guestOnly: false, permissions: ["coach.access"], roles: [] })
            },
            {
                id: "nav_personality",
                type: "link",
                title: "Personality Test",
                path: "/personality-test",
                icon: "user-check",
                order: 4,
                access: Object.freeze({ authenticated: true, guestOnly: false, permissions: ["personality.test"], roles: [] })
            },
            {
                id: "nav_login",
                type: "link",
                title: "Masuk",
                path: "/login",
                icon: "log-in",
                order: 5,
                access: Object.freeze({ authenticated: false, guestOnly: true, permissions: [], roles: [] })
            }
        ]),
        workspace_sidebar: Object.freeze([
            {
                id: "sb_dashboard",
                type: "link",
                title: "Workspace",
                path: "/workspace",
                icon: "layout",
                order: 1,
                access: Object.freeze({ authenticated: true, guestOnly: false, permissions: [], roles: [] })
            },
            {
                id: "sb_coach",
                type: "link",
                title: "AI Coach Runtime",
                path: "/workspace/coach",
                icon: "message-square",
                order: 2,
                meta: Object.freeze({ badge: "LIVE" }),
                access: Object.freeze({ authenticated: true, guestOnly: false, permissions: ["coach.access"], roles: [] })
            },
            {
                id: "sb_admin",
                type: "link",
                title: "Administration",
                path: "/admin",
                icon: "shield",
                order: 3,
                access: Object.freeze({ authenticated: true, guestOnly: false, permissions: [], roles: ["ADMIN", "SUPER_ADMIN"] })
            }
        ])
    })
});

export default NavigationManifest;
