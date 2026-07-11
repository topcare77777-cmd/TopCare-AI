const textList = [
    "Learn Artificial Intelligence",
    "Learn Programming",
    "Learn Personality",
    "Learn Web Design",
    "Self Development"
];

const typing = document.getElementById("typing");

let textIndex = 0;
let charIndex = 0;

function typeEffect() {

    if (!typing) return;

    if (charIndex < textList[textIndex].length) {

        typing.textContent += textList[textIndex].charAt(charIndex);

        charIndex++;

        setTimeout(typeEffect, 80);

    } else {

        setTimeout(eraseEffect, 1800);

    }

}

function eraseEffect() {

    if (charIndex > 0) {

        typing.textContent =
            textList[textIndex].substring(0, charIndex - 1);

        charIndex--;

        setTimeout(eraseEffect, 40);

    } else {

        textIndex++;

        if (textIndex >= textList.length) {

            textIndex = 0;

        }

        setTimeout(typeEffect, 300);

    }

}

typeEffect();
