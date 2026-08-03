/**
 * TOPCARE AI PLATFORM V2 — AUTH RENDERER
 * Path: assets/js/renderers/auth.renderer.js
 * Status: APPROVED & LOCKED (BUILD 124.3.2)
 * SRP: Provides standard auth modal and form HTML templates.
 */

export const AuthRenderer = Object.freeze({
    /**
     * Renders Login Modal Markup
     */
    renderLoginModal() {
        return `
            <div class="topcare-modal-overlay" role="dialog" aria-modal="true" style="position: fixed; inset: 0; background: rgba(15, 23, 42, 0.8); display: flex; align-items: center; justify-content: center; z-index: 9999; backdrop-filter: blur(4px);">
                <div class="topcare-modal-card" style="max-width: 420px; width: 100%; margin: 20px; padding: 32px; background: #1E293B; border-radius: 16px; border: 1px solid #334155; color: #F8FAFC; box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.5);">
                    <div style="text-align: center; margin-bottom: 24px;">
                        <h3 style="margin: 0 0 8px 0; font-size: 22px; font-weight: 700; color: #FFFFFF;">Masuk ke TopCare AI</h3>
                        <p style="margin: 0; color: #94A3B8; font-size: 14px;">Masukkan kredensial Anda untuk melanjutkan</p>
                    </div>

                    <form id="topcare-login-form" autocomplete="on" style="display: flex; flex-direction: column; gap: 16px;">
                        <div>
                            <label for="loginEmail" style="display: block; font-size: 13px; font-weight: 500; margin-bottom: 6px; color: #CBD5E1;">Email / Username</label>
                            <input 
                                type="email" 
                                id="loginEmail" 
                                name="email" 
                                placeholder="nama@domain.com" 
                                value="doctor@topcare.ai" 
                                required 
                                style="width: 100%; padding: 10px 14px; background: #0F172A; border: 1px solid #334155; border-radius: 8px; color: #FFFFFF; font-size: 14px; box-sizing: border-box; outline: none; pointer-events: auto; user-select: text;" 
                            />
                        </div>

                        <div>
                            <label for="loginPassword" style="display: block; font-size: 13px; font-weight: 500; margin-bottom: 6px; color: #CBD5E1;">Password</label>
                            <input 
                                type="password" 
                                id="loginPassword" 
                                name="password" 
                                placeholder="••••••••" 
                                value="password" 
                                required 
                                style="width: 100%; padding: 10px 14px; background: #0F172A; border: 1px solid #334155; border-radius: 8px; color: #FFFFFF; font-size: 14px; box-sizing: border-box; outline: none; pointer-events: auto; user-select: text;" 
                            />
                        </div>

                        <div id="login-error-msg" class="form-error-text" style="color: #EF4444; font-size: 13px; background: rgba(239, 68, 68, 0.1); padding: 10px; border-radius: 6px; border: 1px solid rgba(239, 68, 68, 0.2); display: none;"></div>

                        <div class="modal-actions" style="display: flex; gap: 12px; margin-top: 8px;">
                            <button type="button" class="btn-secondary" id="login-cancel-btn" style="flex: 1; background: #334155; color: #F8FAFC; border: none; padding: 12px; border-radius: 8px; font-weight: 600; cursor: pointer;">
                                Batal
                            </button>
                            <button type="submit" class="btn-primary" id="login-submit-btn" style="flex: 2; background: #3B82F6; color: white; border: none; padding: 12px; border-radius: 8px; font-weight: 600; cursor: pointer;">
                                Masuk Sekarang
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        `;
    }
});

export default AuthRenderer;