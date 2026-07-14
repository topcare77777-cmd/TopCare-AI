export async function renderSection({

    selector,

    template,

    data,

    component

}) {

    const element = document.querySelector(selector);

    if (!element) return;

    try {

        const html = await fetch(template)
            .then(r => r.text());

        const json = await fetch(data)
            .then(r => r.json());

        element.innerHTML = component(html, json);

    }

    catch (error) {

        console.error("Render Error :", selector);

        console.error(error);

    }

}