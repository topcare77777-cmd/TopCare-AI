document.addEventListener('DOMContentLoaded', () => {
    const heroVisual = document.querySelector('.animate-float');
    if (heroVisual) {
        window.addEventListener('mousemove', (e) => {
            const x = (window.innerWidth / 2 - e.clientX) / 50;
            const y = (window.innerHeight / 2 - e.clientY) / 50;
            heroVisual.style.transform = `translate(${x}px, ${y}px)`;
        });
    }
});