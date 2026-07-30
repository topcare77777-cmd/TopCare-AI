/**
 * file: assets/js/services/user.service.interface.js
 */

import { ServiceInterface } from './service.interface.js';

export class UserServiceInterface extends ServiceInterface {
    getProfile() { throw new Error("Not implemented"); }
    updateProfile(data) { throw new Error("Not implemented"); }
    changePassword(payload) { throw new Error("Not implemented"); }
    getDashboard() { throw new Error("Not implemented"); }
}