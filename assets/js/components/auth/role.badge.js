/**
 * file: assets/js/components/auth/role.badge.js
 * Version: 132.0.0
 * Status: APPROVED
 * SRP: Renders standardized visual badges for user roles.
 */

import { ROLES } from '../../auth/auth.role.js';

export class RoleBadge {
    /**
     * @param {string} roleConstant
     */
    constructor(roleConstant) {
        this.role = roleConstant || 'GUEST';
        Object.seal(this);
    }

    static getTheme(role) {
        switch (role) {
            case ROLES.SYSTEM_ADMIN:
                return { label: 'System Admin', bg: '#ef4444', color: '#ffffff' };
            case ROLES.PHYSICIAN:
                return { label: 'Physician / Dokter', bg: '#2563eb', color: '#ffffff' };
            case ROLES.NURSE:
                return { label: 'Nurse / Perawat', bg: '#0d9488', color: '#ffffff' };
            case ROLES.PHARMACIST:
                return { label: 'Pharmacist / Apoteker', bg: '#d97706', color: '#ffffff' };
            case ROLES.PATIENT:
                return { label: 'Patient / Pasien', bg: '#16a34a', color: '#ffffff' };
            default:
                return { label: role, bg: '#64748b', color: '#ffffff' };
        }
    }

    render() {
        const theme = RoleBadge.getTheme(this.role);
        return `
            <span class="tc-role-badge" style="background-color: ${theme.bg}; color: ${theme.color}; padding: 3px 8px; border-radius: 4px; font-size: 11px; font-weight: 600; text-transform: uppercase; display: inline-block;">
                ${theme.label}
            </span>
        `;
    }
}