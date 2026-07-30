/**
 * file: assets/js/services/user.service.service.js
 */

import { UserServiceBase } from './user.service.base.js';
import { UserServiceManager } from './user.service.manager.js';

const engine = UserServiceManager.initialize(new UserServiceBase());

export const UserService = Object.freeze({
    async getProfile() {
        return await engine.getProfile();
    },
    async updateProfile(data) {
        return await engine.updateProfile(data);
    },
    async changePassword(payload) {
        return await engine.changePassword(payload);
    },
    async getDashboard() {
        return await engine.getDashboard();
    },
    async execute(action, payload) {
        return await engine.execute(action, payload);
    }
});