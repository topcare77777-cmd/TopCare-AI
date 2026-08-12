/**
 * TOPCARE AI PLATFORM V2 — MBTI PAGE ORCHESTRATOR
 * Path: assets/js/pages/mbti/test-mbti.page.js
 * SRP: Page Controller orchestrating MBTI test state and view lifecycle.
 */

import { MBTI_QUESTIONS } from './mbti.data.js';
import { MBTIEngine } from './mbti.engine.js';
import { MBTIView } from './mbti.view.js';

export class TestMBTIPage {
    constructor() {
        this.questions = MBTI_QUESTIONS;
        this.currentIndex = 0;
        this.userAnswers = [];
        this.container = null;
    }

    async mount(container) {
        this.container = container || document.getElementById('app') || document.body;
        if (!this.container) return;

        this.container.innerHTML = MBTIView.renderContainer();
        this._renderCurrentStep();
    }

    _renderCurrentStep() {
        const mbtiCard = document.getElementById('mbti-card');
        if (!mbtiCard) return;

        if (this.currentIndex < this.questions.length) {
            const currentQ = this.questions[this.currentIndex];
            mbtiCard.innerHTML = MBTIView.renderQuestionStep(currentQ, this.currentIndex, this.questions.length);
            this._bindQuestionEvents();
        } else {
            this._finishTest();
        }
    }

    _bindQuestionEvents() {
        const optionBtns = document.querySelectorAll('.tc-mbti-option-btn');
        optionBtns.forEach(btn => {
            btn.onclick = (e) => {
                const targetBtn = e.currentTarget;
                const selectedTrait = targetBtn.dataset.trait;

                if (selectedTrait) {
                    this.userAnswers.push(selectedTrait);
                    this.currentIndex++;
                    this._renderCurrentStep();
                }
            };
        });
    }

    _finishTest() {
        const mbtiCard = document.getElementById('mbti-card');
        if (!mbtiCard) return;

        const resultData = MBTIEngine.calculateResult(this.userAnswers);
        MBTIEngine.saveToStorage(resultData);

        mbtiCard.innerHTML = MBTIView.renderResultView(resultData);
        this._bindResultEvents();
    }

    _bindResultEvents() {
        const retryBtn = document.getElementById('tc-mbti-retry-btn');
        if (retryBtn) {
            retryBtn.onclick = () => {
                this.reset();
                this._renderCurrentStep();
            };
        }
    }

    reset() {
        this.currentIndex = 0;
        this.userAnswers = [];
        MBTIEngine.clearStorage();
    }

    destroy() {
        this.container = null;
        this.userAnswers = [];
    }
}

export default new TestMBTIPage();