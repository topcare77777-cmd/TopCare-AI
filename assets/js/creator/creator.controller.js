/**
 * TOPCARE AI PLATFORM V2 — CREATOR CONTROLLER
 * Path: assets/js/creator/creator.controller.js
 * Status: APPROVED & LOCKED (BUILD 128.6)
 * SRP: Manages state transitions across Creator Layer 2 (Hub) and Layer 3 (Ebook, Artikel, Prompt AI).
 */

import { CreatorRenderer } from './creator.renderer.js';

export class CreatorController {
    constructor(container) {
        this.container = container;
        // VIEW STATES: 'HUB' | 'EBOOK' | 'ARTIKEL' | 'PROMPT'
        this.viewState = 'HUB';
    }

    init() {
        this.render();
    }

    render() {
        if (!this.container) return;

        switch (this.viewState) {
            case 'HUB':
                this.container.innerHTML = CreatorRenderer.renderHubSelection();
                this._bindHubEvents();
                break;
            case 'EBOOK':
                this.container.innerHTML = CreatorRenderer.renderEbookSection();
                this._bindSubSectionEvents();
                break;
            case 'ARTIKEL':
                this.container.innerHTML = CreatorRenderer.renderArtikelSection();
                this._bindSubSectionEvents();
                break;
            case 'PROMPT':
                this.container.innerHTML = CreatorRenderer.renderPromptSection();
                this._bindSubSectionEvents();
                break;
            default:
                this.container.innerHTML = CreatorRenderer.renderHubSelection();
                this._bindHubEvents();
                break;
        }
    }

    _bindHubEvents() {
        const selectEbookBtn = this.container.querySelector('#tc-select-ebook-btn');
        const selectArtikelBtn = this.container.querySelector('#tc-select-artikel-btn');
        const selectPromptBtn = this.container.querySelector('#tc-select-prompt-btn');

        if (selectEbookBtn) {
            selectEbookBtn.onclick = () => {
                this.viewState = 'EBOOK';
                window.location.hash = '#/ebook';
                this.render();
                window.scrollTo({ top: 0, behavior: 'smooth' });
            };
        }

        if (selectArtikelBtn) {
            selectArtikelBtn.onclick = () => {
                this.viewState = 'ARTIKEL';
                window.location.hash = '#/artikel';
                this.render();
                window.scrollTo({ top: 0, behavior: 'smooth' });
            };
        }

        if (selectPromptBtn) {
            selectPromptBtn.onclick = () => {
                this.viewState = 'PROMPT';
                window.location.hash = '#/prompt';
                this.render();
                window.scrollTo({ top: 0, behavior: 'smooth' });
            };
        }
    }

    _bindSubSectionEvents() {
        const backBtn = this.container.querySelector('#tc-back-to-creator-hub-btn');

        if (backBtn) {
            backBtn.onclick = () => {
                this.viewState = 'HUB';
                window.location.hash = '#/creator';
                this.render();
                window.scrollTo({ top: 0, behavior: 'smooth' });
            };
        }
    }
}

export default CreatorController;