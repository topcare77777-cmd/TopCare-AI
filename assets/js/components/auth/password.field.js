/**
 * file: assets/js/components/auth/password.field.js
 * Version: 132.1.0
 * Status: APPROVED & LOCKED
 * SRP: Secure password input component with vector SVG toggle icon.
 */

export class PasswordField {
    constructor(options = {}) {
        this.id = options.id || 'tc-password';
        this.label = options.label || 'Password';
        this.placeholder = options.placeholder || '••••••••';
        this.required = options.required !== false;
        Object.seal(this);
    }

    render() {
        return `
            <div class="tc-form-group">
                <label for="${this.id}" class="tc-form-label">${this.label}</label>
                <div style="position: relative; display: flex; align-items: center;">
                    <input 
                        type="password" 
                        id="${this.id}" 
                        class="tc-form-input tc-input-password" 
                        placeholder="${this.placeholder}" 
                        ${this.required ? 'required' : ''} 
                    />
                    <button 
                        type="button" 
                        class="tc-toggle-password-btn" 
                        data-target="${this.id}"
                        style="position: absolute; right: 10px; background: none; border: none; cursor: pointer; color: #64748b; padding: 4px;"
                    >
                        <svg class="tc-svg-icon" viewBox="0 0 20 20"><path d="M10 12a2 2 0 100-4 2 2 0 000 4z"/><path fill-rule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clip-rule="evenodd"/></svg>
                    </button>
                </div>
            </div>
        `;
    }

    static bindToggle(containerElement) {
        const btns = containerElement.querySelectorAll('.tc-toggle-password-btn');
        btns.forEach(btn => {
            btn.addEventListener('click', () => {
                const targetId = btn.getAttribute('data-target');
                const input = containerElement.querySelector(`#${targetId}`);
                if (input) {
                    const isPass = input.type === 'password';
                    input.type = isPass ? 'text' : 'password';
                }
            });
        });
    }
}