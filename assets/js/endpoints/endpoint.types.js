/**
 * file: assets/js/endpoints/endpoint.types.js
 */

export const ENDPOINTS = Object.freeze({
    AUTH: Object.freeze({
        LOGIN: '/auth/login',
        LOGOUT: '/auth/logout',
        REFRESH: '/auth/refresh',
        PROFILE: '/auth/profile'
    }),
    USER: Object.freeze({
        PROFILE: '/user/profile',
        PASSWORD: '/user/password',
        DASHBOARD: '/user/dashboard'
    }),
    COACH: Object.freeze({
        SESSIONS: '/coach/sessions',
        CHAT: '/coach/chat'
    }),
    EBOOK: Object.freeze({
        LIST: '/ebook/list',
        DETAIL: '/ebook/detail'
    }),
    FORUM: Object.freeze({
        THREADS: '/forum/threads',
        POSTS: '/forum/posts'
    }),
    ADMIN: Object.freeze({
        USERS: '/admin/users',
        METRICS: '/admin/metrics'
    })
});