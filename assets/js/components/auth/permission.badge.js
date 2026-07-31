/**
 * file: assets/js/components/auth/permission.badge.js
 * Version: 132.1.0
 * Status: APPROVED & LOCKED
 * SRP: Renders individual permission indicator badge with OS-independent vector SVGs.
 */

export class PermissionBadge {
    constructor(permissionKey, granted = true) {
        this.permissionKey = permissionKey;
        this.granted = granted;
        Object.seal(this);
    }

    _getSvgIcon() {
        if (this.granted) {
            return `<svg class="tc-svg-icon" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"/></svg>`;
        }
        return `<svg class="tc-svg-icon" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"/></svg>`;
    }

    render() {
        const styleClass = this.granted ? 'tc-perm-granted' : 'tc-perm-denied';
        return `
            <span class="tc-permission-badge ${styleClass}">
                ${this._getSvgIcon()}
                <span>${this.permissionKey}</span>
            </span>
        `;
    }
}