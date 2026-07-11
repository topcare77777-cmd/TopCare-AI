// ==========================
// Animated Counter
// ==========================

const counters = document.querySelectorAll(".counter");

counters.forEach((counter) => {

    counter.innerText = "0";

    function updateCounter() {

        const target = +counter.dataset.target;

        const current = +counter.innerText;

        const increment = Math.ceil(target / 80);

        if (current < target) {

            counter.innerText = current + increment;

            setTimeout(updateCounter, 20);

        } else {

            counter.innerText = target + "+";

        }

    }

    updateCounter();

});