/**
 * -----------------------------------------------------------------
 * TOPCARE AI PLATFORM - ARCHITECTURE METADATA
 * -----------------------------------------------------------------
 * File         : assets/js/auth/ui/auth.ui.controller.js
 * Layer        : Auth UI Controller Layer (BUILD 094.5 Hardened)
 * Status       : ACTIVE
 * Version      : 3.1.0
 * Architecture : Development Constitution v1.1
 * Description  : Centralized UI Controller managing modal lifecycle,
 *                SSR-safe event dispatching, and centralized success handlers.
 * -----------------------------------------------------------------
 */

import { LoginModal } from "./login.modal.js";
import { RegisterModal } from "./register.modal.js";
import { LoginUseCase, RegisterUseCase, LogoutUseCase } from "../usecases/index.js";
import Logger from "../../core/logger.js";

const AUTH_CHANGED_EVENT = "topcare:auth:changed";

class AuthUIController {
    constructor(container = null) {
        this.container = container;
        this.loginModalInstance = null;
        this.registerModalInstance = null;
        this.initialized = false;

        this.loginUseCase = new LoginUseCase();
        this.registerUseCase = new RegisterUseCase();
        this.logoutUseCase = new LogoutUseCase();
    }

    setContainer(container) {
        this.container = container;
    }

    init() {
        if (this.initialized) return;
        if (!this.container && typeof document !== "undefined") {
            this.container = document.body;
        }
        this.initialized = true;
    }

    _validateContainer() {
        if (!this.container && typeof document !== "undefined") {
            this.container = document.body;
        }
        if (typeof HTMLElement === "undefined" || !(this.container instanceof HTMLElement)) {
            throw new Error("[AuthUIController] Invalid modal container.");
        }
    }

    isLoginOpen() {
        return (
            this.loginModalInstance instanceof LoginModal &&
            typeof this.loginModalInstance.isOpen === "function" &&
            this.loginModalInstance.isOpen()
        );
    }

    isRegisterOpen() {
        return (
            this.registerModalInstance instanceof RegisterModal &&
            typeof this.registerModalInstance.isOpen === "function" &&
            this.registerModalInstance.isOpen()
        );
    }

    openLogin() {
        if (!this.initialized) this.init();
        this._validateContainer();

        if (!(this.loginModalInstance instanceof LoginModal)) {
            this.loginModalInstance = new LoginModal();
            if (typeof this.loginModalInstance.onSubmit === "function") {
                this.loginModalInstance.onSubmit((dto) => this.handleLogin(dto));
            }
        }

        if (this.isLoginOpen()) return;

        if (this.registerModalInstance && typeof this.registerModalInstance.close === "function") {
            this.registerModalInstance.close();
        }

        if (this.loginModalInstance && typeof this.loginModalInstance.open === "function") {
            this.loginModalInstance.open(this.container);
        }
    }

    openRegister() {
        if (!this.initialized) this.init();
        this._validateContainer();

        if (!(this.registerModalInstance instanceof RegisterModal)) {
            this.registerModalInstance = new RegisterModal();
            if (typeof this.registerModalInstance.onSubmit === "function") {
                this.registerModalInstance.onSubmit((dto) => this.handleRegister(dto));
            }
        }

        if (this.isRegisterOpen()) return;

        if (this.loginModalInstance && typeof this.loginModalInstance.close === "function") {
            this.loginModalInstance.close();
        }

        if (this.registerModalInstance && typeof this.registerModalInstance.open === "function") {
            this.registerModalInstance.open(this.container);
        }
    }

    closeAll() {
        if (this.loginModalInstance && typeof this.loginModalInstance.close === "function") {
            this.loginModalInstance.close();
        }
        if (this.registerModalInstance && typeof this.registerModalInstance.close === "function") {
            this.registerModalInstance.close();
        }
    }

    switchToLogin() {
        if (this.registerModalInstance && typeof this.registerModalInstance.close === "function") {
            this.registerModalInstance.close();
        }
        this.openLogin();
    }

    switchToRegister() {
        if (this.loginModalInstance && typeof this.loginModalInstance.close === "function") {
            this.loginModalInstance.close();
        }
        this.openRegister();
    }

    _mapErrorMessage(errorCode) {
        switch (errorCode) {
            case "INVALID_CREDENTIALS":
                return "Email/Username atau Kata Sandi salah.";
            case "EMAIL_ALREADY_EXISTS":
                return "Email sudah terdaftar. Silakan gunakan email lain atau masuk.";
            case "USERNAME_ALREADY_EXISTS":
                return "Nama pengguna sudah digunakan. Silakan pilih yang lain.";
            case "INVALID_REQUEST_PAYLOAD":
                return "Mohon lengkapi seluruh kolom formulir dengan benar.";
            case "SESSION_START_FAILED":
                return "Gagal memulai sesi pengguna. Silakan coba beberapa saat lagi.";
            case "USER_CREATION_FAILED":
                return "Gagal mendaftarkan akun baru. Silakan coba lagi.";
            default:
                return "Terjadi kesalahan sistem. Silakan coba beberapa saat lagi.";
        }
    }

    /**
     * SSR-safe dispatcher for authentication state changes.
     * @private
     * @param {Object|null} user 
     */
    _notifyAuthChanged(user) {
        if (typeof window === "undefined" || typeof CustomEvent !== "function") {
            return;
        }
        window.dispatchEvent(
            new CustomEvent(AUTH_CHANGED_EVENT, {
                detail: { user }
            })
        );
    }

    /**
     * Centralized success handler closing modals and emitting change events.
     * @private
     * @param {Object} user 
     * @param {string} actionType 
     */
    _onAuthSuccess(user, actionType = "Action") {
        Logger.info(`[AuthUIController] ${actionType} successful.`);
        this.closeAll();
        this._notifyAuthChanged(user);
    }

    async handleLogin(dto) {
        Logger.info("[AuthUIController] Handling login request...");
        try {
            const result = await this.loginUseCase.execute(dto);

            if (!result.success) {
                const errorMessage = this._mapErrorMessage(result.error);
                if (this.loginModalInstance && typeof this.loginModalInstance.showError === "function") {
                    this.loginModalInstance.showError(errorMessage);
                }
                return;
            }

            this._onAuthSuccess(result.data, "Login");
        } catch (error) {
            Logger.error("[AuthUIController] Unexpected login execution error:", error);
            if (this.loginModalInstance && typeof this.loginModalInstance.showError === "function") {
                this.loginModalInstance.showError("Terjadi kesalahan tak terduga.");
            }
        }
    }

    async handleRegister(dto) {
        Logger.info("[AuthUIController] Handling registration request...");
        try {
            const result = await this.registerUseCase.execute(dto);

            if (!result.success) {
                const errorMessage = this._mapErrorMessage(result.error);
                if (this.registerModalInstance && typeof this.registerModalInstance.showError === "function") {
                    this.registerModalInstance.showError(errorMessage);
                }
                return;
            }

            this._onAuthSuccess(result.data, "Registration");
        } catch (error) {
            Logger.error("[AuthUIController] Unexpected registration execution error:", error);
            if (this.registerModalInstance && typeof this.registerModalInstance.showError === "function") {
                this.registerModalInstance.showError("Terjadi kesalahan tak terduga.");
            }
        }
    }

    async handleLogout() {
        Logger.info("[AuthUIController] Handling logout request...");
        try {
            const result = await this.logoutUseCase.execute();
            if (result.success) {
                Logger.info("[AuthUIController] Logout successful.");
                this._notifyAuthChanged(null);
            }
        } catch (error) {
            Logger.error("[AuthUIController] Unexpected logout execution error:", error);
        }
    }

    destroy() {
        if (this.loginModalInstance && typeof this.loginModalInstance.destroy === "function") {
            this.loginModalInstance.destroy();
        }
        if (this.registerModalInstance && typeof this.registerModalInstance.destroy === "function") {
            this.registerModalInstance.destroy();
        }
        this.loginModalInstance = null;
        this.registerModalInstance = null;
        this.container = null;
        this.initialized = false;
    }
}

export const authUIController = new AuthUIController();
export default authUIController;