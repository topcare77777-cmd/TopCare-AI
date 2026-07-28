/**
 * -----------------------------------------------------------------
 * TOPCARE AI PLATFORM - ARCHITECTURE METADATA
 * -----------------------------------------------------------------
 * File         : assets/js/auth/repositories/local-user.repository.js
 * Layer        : User Repository Local Implementation
 * Status       : ACTIVE
 * Version      : 2.2.0
 * Architecture : Development Constitution v1.1
 * Description  : Concrete implementation extending AuthRepositoryInterface 
 *                for user CRUD operations backed purely by localStorage.
 * -----------------------------------------------------------------
 */

import { AuthRepositoryInterface } from "./auth.repository.interface.js";
import Logger from "../../core/logger.js";

const STORAGE_KEYS = {
    USERS: "topcare_users_v2"
};

export class LocalUserRepository extends AuthRepositoryInterface {
    constructor() {
        super();
    }

    _getStorage() {
        if (typeof localStorage === "undefined") {
            return [];
        }
        try {
            const data = localStorage.getItem(STORAGE_KEYS.USERS);
            return data ? JSON.parse(data) : [];
        } catch (error) {
            Logger.error("[LocalUserRepository] Failed to read localStorage:", error);
            return [];
        }
    }

    _saveStorage(users) {
        if (typeof localStorage !== "undefined") {
            try {
                localStorage.setItem(STORAGE_KEYS.USERS, JSON.stringify(users));
            } catch (error) {
                Logger.error("[LocalUserRepository] Failed to write localStorage (Quota exceeded?):", error);
                throw new Error("Penyimpanan lokal penuh atau gagal menyimpan data.");
            }
        }
    }

    async createUser(user) {
        const users = this._getStorage();
        const generatedId = typeof crypto !== "undefined" && typeof crypto.randomUUID === "function"
            ? crypto.randomUUID()
            : `usr_${Date.now()}_${Math.random().toString(36).slice(2)}`;

        const newUser = {
            id: user.id || generatedId,
            email: user.email ? user.email.toLowerCase().trim() : "",
            username: user.username ? user.username.trim() : "",
            password: user.password || "",
            createdAt: new Date().toISOString()
        };
        users.push(newUser);
        this._saveStorage(users);
        return { ...newUser };
    }

    async findUserByEmail(email) {
        if (!email) return null;
        const users = this._getStorage();
        const target = email.toLowerCase().trim();
        const found = users.find(u => u.email && u.email.toLowerCase().trim() === target);
        return found ? { ...found } : null;
    }

    async findUserByUsername(username) {
        if (!username) return null;
        const users = this._getStorage();
        const target = username.toLowerCase().trim();
        const found = users.find(u => u.username && u.username.toLowerCase().trim() === target);
        return found ? { ...found } : null;
    }

    async updateUser(user) {
        if (!user || !user.id) return null;
        const users = this._getStorage();
        const index = users.findIndex(u => u.id === user.id);
        if (index === -1) return null;

        users[index] = {
            ...users[index],
            ...user,
            email: user.email ? user.email.toLowerCase().trim() : users[index].email,
            username: user.username ? user.username.trim() : users[index].username,
            updatedAt: new Date().toISOString()
        };
        this._saveStorage(users);
        return { ...users[index] };
    }

    async deleteUser(userId) {
        if (!userId) return false;
        let users = this._getStorage();
        const initialLength = users.length;
        users = users.filter(u => u.id !== userId);
        if (users.length === initialLength) return false;
        this._saveStorage(users);
        return true;
    }

    async exists(identifier) {
        if (!identifier) return false;
        const users = this._getStorage();
        const target = identifier.toLowerCase().trim();
        return users.some(u =>
            (u.email && u.email.toLowerCase().trim() === target) ||
            (u.username && u.username.toLowerCase().trim() === target)
        );
    }

    async getAllUsers() {
        const users = this._getStorage();
        return users.map(u => ({ ...u }));
    }

    async verifyCredentials(identifier, password) {
        throw new Error("Method not implemented in LocalUserRepository. Use LocalAuthRepository.");
    }

    async changePassword(userId, newPassword) {
        if (!userId || !newPassword) {
            throw new Error("User ID and new password are required.");
        }
        const users = this._getStorage();
        const user = users.find(u => u.id === userId);
        if (!user) {
            throw new Error("User tidak ditemukan.");
        }

        user.password = newPassword;
        await this.updateUser(user);
        return true;
    }
}

export default LocalUserRepository;