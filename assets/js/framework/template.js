class Template {

    render(template, data = {}) {

        return template.replace(/\{\{(.*?)\}\}/g, (_, key) => {

            return data[key.trim()] ?? "";

        });

    }

}

export default new Template();