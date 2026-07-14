export function heroRenderer(template, data) {

    let html = template;

    html = html.replace("{{badge}}", data.badge.text);

    html = html.replace("{{title}}", data.title);

    html = html.replace("{{subtitle}}", data.subtitle);

    html = html.replace("{{button1Text}}", data.buttons[0].text);
    html = html.replace("{{button1Link}}", data.buttons[0].link);

    html = html.replace("{{button2Text}}", data.buttons[1].text);
    html = html.replace("{{button2Link}}", data.buttons[1].link);

    html = html.replace("{{stat1Value}}", data.statistics[0].value);
    html = html.replace("{{stat1Label}}", data.statistics[0].label);

    html = html.replace("{{stat2Value}}", data.statistics[1].value);
    html = html.replace("{{stat2Label}}", data.statistics[1].label);

    html = html.replace("{{stat3Value}}", data.statistics[2].value);
    html = html.replace("{{stat3Label}}", data.statistics[2].label);

    html = html.replace("{{dashboardTitle}}", data.dashboard.title);

    html = html.replace("{{card1Icon}}", data.dashboard.items[0].icon);
    html = html.replace("{{card1Title}}", data.dashboard.items[0].title);
    html = html.replace("{{card1Desc}}", data.dashboard.items[0].desc);

    html = html.replace("{{card2Icon}}", data.dashboard.items[1].icon);
    html = html.replace("{{card2Title}}", data.dashboard.items[1].title);
    html = html.replace("{{card2Desc}}", data.dashboard.items[1].desc);

    html = html.replace("{{card3Icon}}", data.dashboard.items[2].icon);
    html = html.replace("{{card3Title}}", data.dashboard.items[2].title);
    html = html.replace("{{card3Desc}}", data.dashboard.items[2].desc);

    return html;

}