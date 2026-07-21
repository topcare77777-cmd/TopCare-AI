export default class Component {

    constructor(props = {}) {

        this.props = props;

    }

    render() {

        return "";

    }

    mount(selector) {

        const target = document.querySelector(selector);

        if (!target) return;

        target.innerHTML = this.render();

    }

}