import { CoachRenderer } from './coach.renderer.js';

export class CoachController {
    constructor(container) {
        this.container = container;
    }

    init() {
        if (!this.container) return;
        this.render();
    }

    render() {
        this.container.innerHTML = CoachRenderer.renderCard();
    }
}

export default CoachController;