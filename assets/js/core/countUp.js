/**
 * TopCare AI Platform V2.0.0
 * CountUp Animation Utility
 * Path: assets/js/core/countUp.js
 */
const CountUp = {
    animate(el, targetValue, duration = 2000) {
        let startTimestamp = null;
        const isPercentage = targetValue.includes('%');
        const isPlus = targetValue.includes('+');
        const isK = targetValue.includes('K');
        const isM = targetValue.includes('M');

        let cleanNum = parseFloat(targetValue.replace(/[^0-9.]/g, ''));
        if (isK) cleanNum *= 1000;
        if (isM) cleanNum *= 1000000;

        const step = (timestamp) => {
            if (!startTimestamp) startTimestamp = timestamp;
            const progress = Math.min((timestamp - startTimestamp) / duration, 1);
            const current = Math.floor(progress * cleanNum);

            let formatted = current.toLocaleString();
            if (isK && current >= 1000) formatted = (current / 1000).toFixed(0) + 'K';
            if (isM && current >= 1000000) formatted = (current / 1000000).toFixed(0) + 'M';
            if (isPercentage) formatted += '%';
            if (isPlus) formatted += '+';

            el.textContent = formatted;

            if (progress < 1) {
                window.requestAnimationFrame(step);
            } else {
                el.textContent = targetValue;
            }
        };

        window.requestAnimationFrame(step);
    }
};

export default CountUp;