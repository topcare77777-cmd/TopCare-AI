/**
 * TopCare AI Platform V2.0.0
 * Empty State Component
 * Path: assets/js/core/empty-state.js
 */
const EmptyState = {
    render(title = 'No Data Available', message = 'There is currently no information to display.', icon = '📭') {
        return `
            <div class="empty-state glass-card" style="padding: 4rem 2rem; text-align: center; display: flex; flex-direction: column; align-items: center; gap: 1rem; margin: 2rem auto; max-width: 500px;">
                <div style="font-size: 3rem; margin-bottom: 0.5rem;" aria-hidden="true">${icon}</div>
                <h3 style="font-size: var(--font-size-xl); font-weight: 700; color: var(--color-text-main);">${title}</h3>
                <p style="font-size: var(--font-size-sm); color: var(--color-text-muted); line-height: 1.5;">${message}</p>
            </div>
        `;
    }
};

export default EmptyState;