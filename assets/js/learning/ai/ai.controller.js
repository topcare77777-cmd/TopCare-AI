/**
 * TOPCARE AI PLATFORM V2 — MAIN AI DOMAIN CONTROLLER WITH LIFECYCLE
 * Path: assets/js/learning/ai/ai.controller.js
 * Status: APPROVED & LOCKED (BUILD 127.3)
 * SRP: Manages state, mounting lifecycle, and user interactions for AI domain.
 */

import AI_MANIFEST from './ai.manifest.js';
import BASIC_METADATA from './basic/basic.data.js';
import BASIC_MODULES_LIST from './basic/basic.modules.js';
import AiRenderer from './ai.renderer.js';

export class AiController {
    constructor(container) {
        this.container = container;
        this.manifest = AI_MANIFEST;
        this.activeLevelId = 'basic';
        this.activeLesson = null;
        this.isMounted = false;
    }

    init() {
        this.activeLevelId = 'basic';
        this.activeLesson = null;
    }

    mount() {
        if (!this.container) return;
        this.isMounted = true;
        this.render();
    }

    render() {
        if (!this.container || !this.isMounted) return;

        if (this.activeLesson) {
            this.container.innerHTML = AiRenderer.renderLessonReader(this.activeLesson);
            this._bindLessonEvents();
        } else {
            this.container.innerHTML = AiRenderer.renderModuleCatalog(
                BASIC_METADATA,
                this.manifest.levels,
                this.activeLevelId,
                BASIC_MODULES_LIST
            );
            this._bindCatalogEvents();
        }
    }

    _bindCatalogEvents() {
        const openBtns = this.container.querySelectorAll('.tc-btn-open-lesson');
        openBtns.forEach(btn => {
            btn.onclick = () => {
                const modId = btn.getAttribute('data-module-id');
                const foundLesson = BASIC_MODULES_LIST.find(m => m.id === modId);
                if (foundLesson) {
                    this.activeLesson = foundLesson;
                    this.render();
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                }
            };
        });
    }

    _bindLessonEvents() {
        const backBtn = this.container.querySelector('#tc-back-to-modules-btn');
        const finishBtn = this.container.querySelector('#tc-finish-lesson-btn');

        const goBack = () => {
            this.activeLesson = null;
            this.render();
            window.scrollTo({ top: 0, behavior: 'smooth' });
        };

        if (backBtn) backBtn.onclick = goBack;
        if (finishBtn) finishBtn.onclick = goBack;
    }

    destroy() {
        this.cleanup();
        if (this.container) {
            this.container.innerHTML = '';
        }
    }

    cleanup() {
        this.isMounted = false;
        this.activeLesson = null;
    }
}

export default AiController;