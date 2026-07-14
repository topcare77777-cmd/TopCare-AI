export function render(targetSelector, html) {

    const target = document.querySelector(targetSelector);

    if (!target) return;

    target.innerHTML = html;

}