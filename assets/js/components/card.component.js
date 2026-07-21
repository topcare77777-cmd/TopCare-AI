document.addEventListener('DOMContentLoaded', () => {
    const cards = document.querySelectorAll('.card');
    cards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.style.willChange = 'transform, box-shadow';
        });
        card.addEventListener('mouseleave', () => {
            card.style.willChange = 'auto';
        });
    });
});