/**
 * TopCare AI Platform V2.0.0
 * Command Palette
 * Path: assets/js/core/command.palette.js
 */
import Logger from '../core/logger.js';

const CommandPalette = {
    isOpen: false,
    element: null,

    init() {
        if (this.element) return;
        
        this.element = document.createElement('div');
        this.element.id = 'command-palette';
        this.element.style.cssText = 'position:fixed;inset:0;background:rgba(0,0,0,0.6);backdrop-filter:blur(8px);z-index:1090;display:none;align-items:flex-start;justify-content:center;padding-top:15vh;';
        this.element.innerHTML = `
            <div class="glass-card" style="width:100%;max-width:600px;background:var(--color-bg-secondary);border:var(--border-glass);padding:1.5rem;border-radius:var(--radius-lg);box-shadow:var(--shadow-float);">
                <input type="text" id="command-input" placeholder="Type a command or search..." style="width:100%;background:rgba(255,255,255,0.03);border:var(--border-glass);padding:0.875rem 1rem;color:var(--color-text-main);border-radius:var(--radius-sm);font-size:var(--font-size-md);outline:none;" />
                <div id="command-results" style="margin-top:1rem;display:flex;flex-direction:column;gap:0.5rem;max-height:300px;overflow-y:auto;"></div>
            </div>
        `;
        document.body.appendChild(this.element);

        window.addEventListener('keydown', (e) => {
            if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
                e.preventDefault();
                this.toggle();
            }
            if (e.key === 'Escape' && this.isOpen) {
                this.close();
            }
        });

        this.element.addEventListener('click', (e) => {
            if (e.target === this.element) this.close();
        });

        Logger.info("[CommandPalette] Initialized.");
    },

    toggle() {
        this.isOpen ? this.close() : this.open();
    },

    open() {
        this.isOpen = true;
        this.element.style.display = 'flex';
        const input = this.element.querySelector('#command-input');
        if (input) {
            input.value = '';
            input.focus();
        }
    },

    close() {
        this.isOpen = false;
        this.element.style.display = 'none';
    }
};

export default CommandPalette;