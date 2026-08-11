/**
 * TOPCARE AI PLATFORM V2 — NAVIGATION MANIFEST
 * Path: assets/js/config/navigation.manifest.js
 * Status: APPROVED & REPAIRED (CANONICAL COACH PATH)
 */

export const NAVIGATION_MANIFEST = Object.freeze({
    header: Object.freeze([
        {
            id: "nav_home",
            title: "Beranda",
            path: "/home",
            icon: "home",
            access: Object.freeze({ authenticated: false, guestOnly: false, permissions: [], roles: [] })
        },
        {
            id: "nav_learning",
            title: "Learning",
            path: "/learning",
            icon: "book-open",
            access: Object.freeze({ authenticated: false, guestOnly: false, permissions: [], roles: [] })
        },
        {
            id: "nav_coach",
            title: "AI Coach",
            path: "/coach", // FIX 2: Diseimbangkan dari /workspace/coach ke /coach
            icon: "bot",
            access: Object.freeze({ authenticated: true, guestOnly: false, permissions: ["coach.access"], roles: [] })
        },
        {
            id: "nav_personality",
            title: "Kepribadian",
            path: "/personality",
            icon: "user",
            access: Object.freeze({ authenticated: false, guestOnly: false, permissions: [], roles: [] })
        },
        {
            id: "nav_marketplace",
            title: "Marketplace",
            path: "/marketplace",
            icon: "shopping-bag",
            access: Object.freeze({ authenticated: false, guestOnly: false, permissions: [], roles: [] })
        },
        {
            id: "nav_community",
            title: "Komunitas",
            path: "/community",
            icon: "users",
            access: Object.freeze({ authenticated: false, guestOnly: false, permissions: [], roles: [] })
        }
    ]),
    sidebar: Object.freeze([
        {
            id: "sb_home",
            title: "Dashboard Utang",
            path: "/home",
            icon: "layout-dashboard",
            access: Object.freeze({ authenticated: false, guestOnly: false, permissions: [], roles: [] })
        },
        {
            id: "sb_coach",
            title: "AI Coach Runtime",
            path: "/coach", // FIX 2: Diseimbangkan dari /workspace/coach ke /coach
            icon: "bot",
            access: Object.freeze({ authenticated: true, guestOnly: false, permissions: ["coach.access"], roles: [] })
        },
        {
            id: "sb_personality",
            title: "Tes & Hub Kepribadian",
            path: "/personality",
            icon: "user-check",
            access: Object.freeze({ authenticated: false, guestOnly: false, permissions: [], roles: [] })
        },
        {
            id: "sb_marketplace",
            title: "Aset & Prompt Store",
            path: "/marketplace",
            icon: "store",
            access: Object.freeze({ authenticated: false, guestOnly: false, permissions: [], roles: [] })
        }
    ])
});

export default NAVIGATION_MANIFEST;