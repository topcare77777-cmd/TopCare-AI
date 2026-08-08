/**
 * TOPCARE AI PLATFORM V2 — DOWNLOAD MANIFEST SSOT (MULTI-ASSET SUPPORT)
 * Path: assets/js/features/download-center/config/download-manifest.js
 * Version: 135.1.1 (BUILD 135.1 — CORRECTIONS & ACCESSIBILITY STABILIZATION)
 * Status: APPROVED & LOCKED
 * SRP: Central catalog of all downloadable physical files linked via packageId and productId.
 */

export const DownloadManifest = Object.freeze([
    // Package 001 Assets (Master Prompt AI)
    {
        id: "dl-001-a",
        packageId: "pkg-001",
        productId: "prod-001",
        title: "Master Prompt Book (500+ Collection)",
        filename: "master-prompt-book-v2.pdf",
        filesize: "4.8 MB",
        extension: "pdf",
        checksum: "sha256-a1b2c3d4e5f67890",
        downloadRoute: "assets/downloads/master-prompt-book-v2.pdf",
        requiresLicense: true,
        isFree: false,
        isBonus: false
    },
    {
        id: "dl-001-b",
        packageId: "pkg-001",
        productId: "prod-001",
        title: "Notion Master Prompt Template (Import File)",
        filename: "notion-prompt-template.zip",
        filesize: "2.1 MB",
        extension: "zip",
        checksum: "sha256-b2c3d4e5f67890a1",
        downloadRoute: "assets/downloads/notion-prompt-template.zip",
        requiresLicense: true,
        isFree: false,
        isBonus: false
    },
    {
        id: "dl-001-c",
        packageId: "pkg-001",
        productId: "prod-001",
        title: "[BONUS] Prompt Refinement Cheatsheet",
        filename: "bonus-prompt-cheatsheet.pdf",
        filesize: "1.2 MB",
        extension: "pdf",
        checksum: "sha256-c3d4e5f67890a1b2",
        downloadRoute: "assets/downloads/bonus-prompt-cheatsheet.pdf",
        requiresLicense: true,
        isFree: false,
        isBonus: true
    },

    // Package 002 Assets (E-Book AI Agent)
    {
        id: "dl-002-a",
        packageId: "pkg-002",
        productId: "prod-002",
        title: "E-Book Panduan AI Agent (Main Edition)",
        filename: "panduan-ai-agent-topcare.pdf",
        filesize: "12.3 MB",
        extension: "pdf",
        checksum: "sha256-f9e8d7c6b5a43210",
        downloadRoute: "assets/downloads/panduan-ai-agent-topcare.pdf",
        requiresLicense: true,
        isFree: false,
        isBonus: false
    },
    {
        id: "dl-002-b",
        packageId: "pkg-002",
        productId: "prod-002",
        title: "Bot Starter Kit Source Code",
        filename: "ai-agent-starter-code.zip",
        filesize: "5.4 MB",
        extension: "zip",
        checksum: "sha256-e8d7c6b5a43210f9",
        downloadRoute: "assets/downloads/ai-agent-starter-code.zip",
        requiresLicense: true,
        isFree: false,
        isBonus: false
    },

    // Package 004 Assets (Free Starter Prompt)
    {
        id: "dl-004-a",
        packageId: "pkg-004",
        productId: "prod-004",
        title: "Starter Prompt Kit: Personality",
        filename: "starter-prompt-personality.zip",
        filesize: "1.2 MB",
        extension: "zip",
        checksum: "sha256-1234567890abcdef",
        downloadRoute: "assets/downloads/starter-prompt-personality.zip",
        requiresLicense: false,
        isFree: true,
        isBonus: false
    },

    // Package 005 Assets (UI/UX Dashboard Template)
    {
        id: "dl-005-a",
        packageId: "pkg-005",
        productId: "prod-005",
        title: "TopCare Figma Dashboard Design System",
        filename: "topcare-uiux-dashboard-template.fig",
        filesize: "28.5 MB",
        extension: "fig",
        checksum: "sha256-abcdef1234567890",
        downloadRoute: "assets/downloads/topcare-uiux-dashboard-template.fig",
        requiresLicense: true,
        isFree: false,
        isBonus: false
    },
    {
        id: "dl-005-b",
        packageId: "pkg-005",
        productId: "prod-005",
        title: "Vector Icon Set (SVG Collection)",
        filename: "topcare-icons-pack.zip",
        filesize: "4.2 MB",
        extension: "zip",
        checksum: "sha256-bcdef1234567890a",
        downloadRoute: "assets/downloads/topcare-icons-pack.zip",
        requiresLicense: true,
        isFree: false,
        isBonus: false
    },
    {
        id: "dl-005-c",
        packageId: "pkg-005",
        productId: "prod-005",
        title: "[BONUS] Dark & Light UI Kit Extension",
        filename: "bonus-dark-light-uikit.fig",
        filesize: "12.0 MB",
        extension: "fig",
        checksum: "sha256-cdef1234567890ab",
        downloadRoute: "assets/downloads/bonus-dark-light-uikit.fig",
        requiresLicense: true,
        isFree: false,
        isBonus: true
    }
]);

export default DownloadManifest;