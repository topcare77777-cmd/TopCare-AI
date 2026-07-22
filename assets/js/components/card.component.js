/**
 * TopCare AI Platform V2.0.0
 * Card Component
 * Path: assets/js/components/card.component.js
 */

class CardComponent {
    init() {
        this.bindEvents();
    }

    render(containerId, data = []) {
        const container = document.getElementById(containerId);
        if (!container) return;

        if (Array.isArray(data) && data.length > 0) {
            container.innerHTML = data.map(item => `
                <div class="card p-6 rounded-2xl bg-slate-900/50 border border-slate-800 backdrop-blur-xl hover:border-cyan-500/50 transition-all duration-300 group">
                    <h4 class="text-xl font-semibold text-white mb-3">${item.title || 'Feature'}</h4>
                    <p class="text-slate-400 text-sm leading-relaxed">${item.description || ''}</p>
                </div>
            `).join('');
        }
    }

    renderGrid(containerId, data = []) {
        this.render(containerId, data);
    }

    bindEvents() {
        const cards = document.querySelectorAll('.card');
        cards.forEach(card => {
            card.addEventListener('mouseenter', () => {
                card.style.willChange = 'transform, box-shadow';
            });
            card.addEventListener('mouseleave', () => {
                card.style.willChange = 'auto';
            });
        });
    }

    destroy() {
        // Cleanup listeners if necessary
    }
}

export default new CardComponent();