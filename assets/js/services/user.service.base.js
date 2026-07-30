/**
 * file: assets/js/services/user.service.base.js
 */

import { Core } from '../core/index.js';
import { Repository } from '../repository/index.js';
import { Endpoints } from '../endpoints/index.js';
import { UserServiceInterface } from './user.service.interface.js';
import { SERVICE_EVENTS, USER_SERVICE_ACTIONS } from './service.types.js';

export class UserServiceBase extends UserServiceInterface {
    constructor() {
        super();
        Object.seal(this);
    }

    async getProfile() {
        Core.Logger.info("UserService executing getProfile.");
        Core.Event.emit(SERVICE_EVENTS.EXECUTE, { action: USER_SERVICE_ACTIONS.GET_PROFILE });

        try {
            const endpoint = Endpoints.get('auth', 'PROFILE');
            const response = await Repository.query(endpoint);
            const data = Core.Utils.clone(response.data || response);

            Core.Logger.debug("UserService getProfile success.");
            Core.Event.emit(SERVICE_EVENTS.SUCCESS, { action: USER_SERVICE_ACTIONS.GET_PROFILE, data });
            return data;
        } catch (error) {
            Core.Logger.error(`UserService getProfile failed: ${error.message}`);
            Core.Event.emit(SERVICE_EVENTS.ERROR, { action: USER_SERVICE_ACTIONS.GET_PROFILE, error });
            throw error;
        }
    }

    async updateProfile(profileData) {
        if (!profileData || typeof profileData !== 'object') {
            throw new TypeError("Profile update data must be a valid object.");
        }

        Core.Logger.info("UserService executing updateProfile.");
        Core.Event.emit(SERVICE_EVENTS.EXECUTE, { action: USER_SERVICE_ACTIONS.UPDATE_PROFILE, payload: profileData });

        try {
            const endpoint = Endpoints.get('user', 'PROFILE');
            const response = await Repository.mutate(endpoint, profileData);
            const data = Core.Utils.clone(response.data || response);

            Core.Logger.debug("UserService updateProfile success.");
            Core.Event.emit(SERVICE_EVENTS.SUCCESS, { action: USER_SERVICE_ACTIONS.UPDATE_PROFILE, data });
            return data;
        } catch (error) {
            Core.Logger.error(`UserService updateProfile failed: ${error.message}`);
            Core.Event.emit(SERVICE_EVENTS.ERROR, { action: USER_SERVICE_ACTIONS.UPDATE_PROFILE, error });
            throw error;
        }
    }

    async changePassword(passwordPayload) {
        if (!passwordPayload || typeof passwordPayload !== 'object') {
            throw new TypeError("Password payload must be a valid object.");
        }

        Core.Logger.info("UserService executing changePassword.");
        Core.Event.emit(SERVICE_EVENTS.EXECUTE, { action: USER_SERVICE_ACTIONS.CHANGE_PASSWORD });

        try {
            const endpoint = Endpoints.get('user', 'PASSWORD');
            const response = await Repository.mutate(endpoint, passwordPayload);
            const data = Core.Utils.clone(response.data || response);

            Core.Logger.debug("UserService changePassword success.");
            Core.Event.emit(SERVICE_EVENTS.SUCCESS, { action: USER_SERVICE_ACTIONS.CHANGE_PASSWORD, data });
            return data;
        } catch (error) {
            Core.Logger.error(`UserService changePassword failed: ${error.message}`);
            Core.Event.emit(SERVICE_EVENTS.ERROR, { action: USER_SERVICE_ACTIONS.CHANGE_PASSWORD, error });
            throw error;
        }
    }

    async getDashboard() {
        Core.Logger.info("UserService executing getDashboard.");
        Core.Event.emit(SERVICE_EVENTS.EXECUTE, { action: USER_SERVICE_ACTIONS.GET_DASHBOARD });

        try {
            const endpoint = Endpoints.get('user', 'DASHBOARD');
            const response = await Repository.query(endpoint);
            const data = Core.Utils.clone(response.data || response);

            Core.Logger.debug("UserService getDashboard success.");
            Core.Event.emit(SERVICE_EVENTS.SUCCESS, { action: USER_SERVICE_ACTIONS.GET_DASHBOARD, data });
            return data;
        } catch (error) {
            Core.Logger.error(`UserService getDashboard failed: ${error.message}`);
            Core.Event.emit(SERVICE_EVENTS.ERROR, { action: USER_SERVICE_ACTIONS.GET_DASHBOARD, error });
            throw error;
        }
    }

    async execute(action, payload) {
        switch (action) {
            case USER_SERVICE_ACTIONS.GET_PROFILE:
                return await this.getProfile();
            case USER_SERVICE_ACTIONS.UPDATE_PROFILE:
                return await this.updateProfile(payload);
            case USER_SERVICE_ACTIONS.CHANGE_PASSWORD:
                return await this.changePassword(payload);
            case USER_SERVICE_ACTIONS.GET_DASHBOARD:
                return await this.getDashboard();
            default:
                throw new Error(`Unknown service action: ${action}`);
            }
    }
}