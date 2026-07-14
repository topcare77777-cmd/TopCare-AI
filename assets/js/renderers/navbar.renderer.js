export function navbarRenderer(template, data) {

    let menus = "";

    data.menus.forEach(menu => {

        menus += `
            <li>
                <a href="${menu.link}">
                    ${menu.title}
                </a>
            </li>
        `;

    });

    let html = template;

    html = html.replace("{{logo}}", data.brand.logo);

    html = html.replace("{{brand}}", data.brand.name);

    html = html.replace("{{menus}}", menus);

    html = html.replace("{{login}}", data.buttons.login);

    html = html.replace("{{register}}", data.buttons.register);

    return html;

}