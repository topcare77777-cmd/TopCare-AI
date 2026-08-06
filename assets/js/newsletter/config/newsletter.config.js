/**
 * TOPCARE AI PLATFORM V2 — NEWSLETTER CONFIGURATION
 * Path: assets/js/newsletter/config/newsletter.config.js
 * Architecture: Central Configuration & Serverless Proxy Gateway Mapping
 * Status: APPROVED & LOCKED (BUILD 129.3)
 * SRP: Single Source of Truth for Provider Proxies & Client Rate Controls.
 */

export const NEWSLETTER_CONFIG = Object.freeze({
    // Active Provider Key: 'brevo' | 'mailchimp' | 'kit' | 'substack'
    activeProvider: 'brevo',

    // Use Proxy Endpoint to Prevent Frontend API Key Leakage (Security Hardening)
    useProxyGateway: true,
    proxyEndpoint: '/api/newsletter',

    // Client-side Rate Limiting & Network Controls
    rateLimitMs: 30000,
    timeoutMs: 8000,
    maxRetries: 2,
    maxEmailLength: 254,

    // Storage Keys for Session Persistence
    storageKeys: Object.freeze({
        LAST_SUBMIT: 'tc_nl_last_submit',
        CACHE_EMAILS: 'tc_nl_processed_emails'
    }),

    // Allowed Enum Sources
    sources: Object.freeze({
        FOOTER: 'footer',
        HOME: 'home',
        MODAL: 'modal',
        LANDING: 'landing',
        POPUP: 'popup'
    }),

    // Provider Specific Direct/Proxy Configurations
    providers: Object.freeze({
        brevo: Object.freeze({
            providerKey: 'brevo',
            apiUrl: 'https://api.brevo.com/v3/contacts',
            listId: 2,
            doubleOptIn: true,
            attributes: { PLATFORM: 'TopCareAI_V2' }
        }),
        mailchimp: Object.freeze({
            providerKey: 'mailchimp',
            apiUrl: 'https://us1.api.mailchimp.com/3.0/lists/YOUR_LIST_ID/members',
            listId: 'YOUR_LIST_ID'
        }),
        kit: Object.freeze({
            providerKey: 'kit',
            apiUrl: 'https://api.convertkit.com/v3/forms',
            formId: 'YOUR_FORM_ID'
        }),
        substack: Object.freeze({
            providerKey: 'substack',
            embedUrl: 'https://yourpublication.substack.com/api/v1/free'
        })
    }),

    // Unified Normalized Messages
    messages: Object.freeze({
        SUCCESS: 'Terima kasih! Email Anda berhasil terdaftar.',
        UNSUBSCRIBED: 'Email Anda telah berhasil dihapus dari daftar berlangganan.',
        INVALID_EMAIL: 'Format email tidak valid. Harap periksa kembali.',
        RATE_LIMITED: 'Harap tunggu 30 detik sebelum mencoba mendaftar kembali.',
        DUPLICATE_SUBMIT: 'Email ini telah diproses atau pendaftaran sedang berjalan.',
        CONFIG_ERROR: 'Layanan newsletter belum dikonfigurasi dengan benar.',
        NETWORK_ERROR: 'Gagal terhubung ke server. Periksa koneksi internet Anda.',
        SERVER_ERROR: 'Terjadi masalah pada layanan penyedia. Coba beberapa saat lagi.'
    })
});

export default NEWSLETTER_CONFIG;