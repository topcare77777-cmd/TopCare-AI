document.addEventListener('DOMContentLoaded', () => {
    // Intersection Observer for Statistics Counter Animation
    const counters = document.querySelectorAll('.counter');
    const speed = 200;

    const animateCounters = (entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const counter = entry.target;
                const targetStr = counter.getAttribute('data-target');
                const target = parseFloat(targetStr);
                const isDecimal = targetStr.includes('.');
                let count = 0;
                
                const updateCount = () => {
                    const inc = target / speed;
                    count += inc;
                    if (count < target) {
                        counter.innerText = isDecimal ? count.toFixed(1) + '%' : Math.floor(count) + (targetStr.includes('+') ? '+' : (targetStr.includes('ms') ? 'ms' : ''));
                        setTimeout(updateCount, 15);
                    } else {
                        counter.innerText = targetStr + (targetStr.includes('+') || targetStr.includes('%') || targetStr.includes('ms') ? '' : '');
                    }
                };
                updateCount();
                observer.unobserve(counter);
            }
        });
    };

    const observer = new IntersectionObserver(animateCounters, { threshold: 0.5 });
    counters.forEach(counter => observer.observe(counter));
});