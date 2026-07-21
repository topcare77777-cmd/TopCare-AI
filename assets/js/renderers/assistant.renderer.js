export function assistantRenderer(template, data) {
    const suggestions = data.suggestions.map((item) => `
        <button type="button" class="assistant-chip" data-prompt="${item}">${item}</button>
    `).join("");

    return template
        .replace("{{eyebrow}}", data.eyebrow)
        .replace("{{title}}", data.title)
        .replace("{{subtitle}}", data.subtitle)
        .replace("{{note}}", data.note)
        .replace("{{status}}", data.status)
        .replace("{{placeholder}}", data.placeholder)
        .replace("{{button}}", data.button)
        .replace("{{suggestions}}", suggestions);
}
