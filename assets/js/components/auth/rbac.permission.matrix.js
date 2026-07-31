/**
 * file: assets/js/components/auth/rbac.permission.matrix.js
 * Version: 140.0.0
 * Status: APPROVED & VERIFIED
 * SRP: Renders Permission Matrix matching 100% with auth.components.css contract.
 */

import { PERMISSIONS } from '../../auth/auth.permission.js';
import { ROLES } from '../../auth/auth.role.js';
import { RoleBadge } from './role.badge.js';
import { AuthPolicy } from '../../auth/auth.policy.js';

export class PermissionMatrix {
    constructor() {
        Object.seal(this);
    }

    render() {
        const roleList = [ROLES.SYSTEM_ADMIN, ROLES.PHYSICIAN, ROLES.NURSE, ROLES.PHARMACIST, ROLES.PATIENT];
        const permissionKeys = Object.values(PERMISSIONS);

        return `
            <div class="tc-permission-matrix-card">
                <div class="tc-matrix-header-wrap">
                    <h3 class="tc-matrix-title">🛡️ Role-Based Access Control (RBAC) Matrix</h3>
                    <p class="tc-matrix-subtitle">Visual SSOT matrix evaluated directly via AuthPolicy definitions.</p>
                </div>
                
                <div class="tc-table-responsive-wrapper">
                    <table class="tc-matrix-table">
                        <thead>
                            <tr class="tc-matrix-thead-row">
                                <th class="tc-matrix-th-label">Permission Identifier</th>
                                ${roleList.map(role => `<th class="tc-matrix-th-role">${new RoleBadge(role).render()}</th>`).join('')}
                            </tr>
                        </thead>
                        <tbody>
                            ${permissionKeys.map(perm => {
                                return `
                                    <tr class="tc-matrix-tbody-row">
                                        <td class="tc-matrix-td-perm">
                                            ${perm}
                                        </td>
                                        ${roleList.map(role => {
                                            const allowed = AuthPolicy.evaluateRolePermission(role, perm);
                                            const icon = allowed ? '✓' : '✕';
                                            const statusClass = allowed ? 'tc-matrix-cell-allowed' : 'tc-matrix-cell-denied';

                                            return `
                                                <td class="tc-matrix-td-status ${statusClass}">
                                                    ${icon}
                                                </td>
                                            `;
                                        }).join('')}
                                    </tr>
                                `;
                            }).join('')}
                        </tbody>
                    </table>
                </div>
            </div>
        `;
    }
}