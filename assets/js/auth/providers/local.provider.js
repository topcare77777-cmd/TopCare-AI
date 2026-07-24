/**
 * TopCare AI Platform V2.0.0
 * Local Authentication Provider utilizing UserFactory
 * Path: assets/js/auth/providers/local.provider.js
 */

class LocalAuthProvider {
    async login(email, password) {
        const rawUser = {
            id: AuthCryptoUtil.generateUUID(),
            email,
            name: "Enterprise User",
            username: email.split('@')[0],
            phone: "+628123456789",
            avatar: "assets/images/profile/founder.webp",
            role: "Member",
            membership: "Pro",
            status: "active",
            createdAt: Date.now(),
            updatedAt: Date.now(),
            lastLogin: Date.now(),
            emailVerified: true,
            phoneVerified: true,
            preferences: { language: "id", theme: "dark", notifications: true },
            metadata: {},
            permissions: ["read:content", "use:ai"]
        };
        const userModel = UserFactory.create(rawUser);
        const token = "tc_token_mock_" + AuthCryptoUtil.generateUUID();
        return { success: true, user: userModel.toJSON(), token };
    }

    async register(name, email, password) {
        const rawUser = {
            id: AuthCryptoUtil.generateUUID(),
            email,
            name,
            username: email.split('@')[0],
            phone: "",
            avatar: "",
            role: "Member",
            membership: "Free",
            status: "active",
            createdAt: Date.now(),
            updatedAt: Date.now(),
            lastLogin: Date.now(),
            emailVerified: false,
            phoneVerified: false,
            preferences: { language: "id", theme: "dark", notifications: true },
            metadata: {},
            permissions: ["read:content"]
        };
        const userModel = UserFactory.create(rawUser);
        const token = "tc_token_mock_" + AuthCryptoUtil.generateUUID();
        return { success: true, user: userModel.toJSON(), token };
    }

    async forgotPassword(email) {
        return { success: true, message: "Link pemulihan telah dikirim ke " + email };
    }
}