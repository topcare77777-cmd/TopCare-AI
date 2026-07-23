/**
 * TopCare AI Platform V2.0.0
 * Notification Engine
 * Path: assets/js/core/notification.engine.js
 */
const NotificationEngine = {
    queue: [],
    container: null,

    init() {
        if (this.container) return;
        this.container = document.createElement('div');
        this.container.className = 'notification-center';
        this.container.style.cssText = 'position:fixed;bottom:2rem;right:2rem;z-index:1070;display:flex;flex-direction:column;gap:0.75rem;pointer-events:none;';
        document.body.appendChild(this.container);
    },

    show(message, type = 'info', duration = 4000) {
        this.init();
        const toast = document.createElement('div');
        toast.className = `toast-notification toast-${type}`;
        toast.style.cssText = 'pointer-events:auto;background:var(--color-bg-card);border:var(--border-glass);backdrop-filter:var(--blur-md);padding:1rem 1.25rem;border-radius:var(--radius-md);box-shadow:var(--shadow-md);color:var(--color-text-main);font-size:var(--font-size-sm);transition:all var(--transition-normal);opacity:0;transform:translateY(20px);display:flex;align-items:center;gap:0.75rem;min-width:280px;';
        
        let icon = 'ℹ️';
        if (type === 'success') icon = '✅';
        if (type === 'error') icon = '❌';
        if (type === 'warning') icon = '⚠️';

        toast.innerHTML = `<span>${icon}</span><div style="flex:1;">${message}</div>`;
        this.container.appendChild(toast);

        requestAnimationFrame(() => {
            toast.style.opacity = '1';
            toast.style.transform = 'translateY(0)';
        });

        setTimeout(() => {
            toast.style.opacity = '0';
            toast.style.transform = 'translateY(20px)';
            setTimeout(() => toast.remove(), 300);
        }, duration);
    }
};

export default NotificationEngine;