/**
 * file: assets/js/components/auth/user.avatar.js
 * Version: 132.0.0
 * Status: APPROVED
 * SRP: Renders a user avatar placeholder or image with status indicator.
 */

export class UserAvatar {
    /**
     * @param {Object} options
     * @param {string} [options.fullName]
     * @param {string} [options.imageUrl]
     * @param {string} [options.size='md'] - 'sm' | 'md' | 'lg'
     * @param {boolean} [options.showStatus=true]
     * @param {string} [options.status='ACTIVE']
     */
    constructor(options = {}) {
        this.fullName = options.fullName || 'User';
        this.imageUrl = options.imageUrl || null;
        this.size = options.size || 'md';
        this.showStatus = options.showStatus !== false;
        this.status = options.status || 'ACTIVE';
        Object.seal(this);
    }

    _getInitials() {
        const parts = this.fullName.trim().split(/\s+/);
        if (parts.length >= 2) {
            return (parts[0][0] + parts[1][0]).toUpperCase();
        }
        return parts[0] ? parts[0].substring(0, 2).toUpperCase() : 'US';
    }

    render() {
        const initials = this._getInitials();
        const sizeClass = `tc-avatar-${this.size}`;
        const statusClass = this.status === 'ACTIVE' ? 'tc-avatar-status-active' : 'tc-avatar-status-inactive';

        return `
            <div class="tc-avatar-container ${sizeClass}">
                ${this.imageUrl
                ? `<img src="${this.imageUrl}" alt="${this.fullName}" class="tc-avatar-img" />`
                : `<div class="tc-avatar-fallback">${initials}</div>`
            }
                ${this.showStatus ? `<span class="tc-avatar-status-dot ${statusClass}"></span>` : ''}
            </div>
        `;
    }
}