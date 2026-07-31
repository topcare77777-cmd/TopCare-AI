/**
 * TOPCARE AI PLATFORM V2 — REGISTER PAGE (SINGLETON CLEAN)
 * Path: assets/js/pages/auth/register.page.js
 */

export class RegisterPage {
    constructor(hostContainer) {
        this.container = hostContainer;
    }

    async beforeEnter() { }

    async afterEnter() {
        this.render();
        this.attachEvents();
    }

    render() {
        this.container.innerHTML = `
            <section class="tc-auth">
                <div class="tc-auth__container">
                    <div class="tc-auth__header">
                        <h2 class="tc-auth__title">Daftar Akun TopCare AI</h2>
                        <p class="tc-auth__subtitle">Mulai perjalanan Coach AI & Tes Kepribadian kamu secara gratis.</p>
                    </div>

                    <form id="register-form" class="tc-auth__form">
                        <div class="tc-auth__field">
                            <label class="tc-auth__label" for="reg-name">Nama Lengkap</label>
                            <input class="tc-auth__input" type="text" id="reg-name" required placeholder="Masukkan nama kamu">
                        </div>

                        <div class="tc-auth__field">
                            <label class="tc-auth__label" for="reg-email">Alamat Email</label>
                            <input class="tc-auth__input" type="email" id="reg-email" required placeholder="nama@email.com">
                        </div>

                        <div class="tc-auth__field">
                            <label class="tc-auth__label" for="reg-password">Kata Sandi</label>
                            <input class="tc-auth__input" type="password" id="reg-password" required placeholder="Minimal 6 karakter">
                        </div>

                        <button type="submit" class="tc-auth__button tc-auth__button--primary">
                            Daftar Member Gratis
                        </button>

                        <p class="tc-auth__register-terms">
                            Dengan mendaftar, Anda menyetujui Ketentuan Layanan & Kebijakan Privasi TopCare AI.
                        </p>
                    </form>
                </div>
            </section>
        `;
    }

    attachEvents() {
        const form = document.getElementById('register-form');
        if (form) {
            form.addEventListener('submit', (e) => {
                e.preventDefault();
                const name = document.getElementById('reg-name').value;

                localStorage.setItem('topcare_user', JSON.stringify({
                    name: name,
                    isMember: true,
                    joinedAt: new Date().toISOString()
                }));

                alert(`Selamat datang, ${name}! Akun member gratis kamu berhasil dibuat.`);
                window.location.hash = '#/home';
            });
        }
    }

    async destroy() {
        if (this.container) {
            this.container.innerHTML = '';
        }
    }
}

export default RegisterPage;