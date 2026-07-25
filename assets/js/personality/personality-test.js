/**
 * @file personality-test.js
 * @description Enterprise Personality Test V2 controller managing lifecycle, state binding, and workflow execution.
 * @module Personality/Test
 */

import { PersonalityLoader } from './personality-loader.js';
import { PersonalityState } from './personality-state.js';
import { PersonalityScoring } from './personality-scoring.js';
import { PersonalityAnalytics } from './personality-analytics.js';
import { PersonalityStorage } from './personality-storage.js';
import { PersonalityUI } from './personality-ui.js';

export async function initPersonalityTest(containerOverride = null) {
    const container = containerOverride || document.getElementById('personality-test') || document.getElementById('main-content');
    if (!container) return;

    try {
        const config = await PersonalityLoader.loadConfig();
        PersonalityState.setConfig(config);
        renderAgeSelectorView(container, config);
    } catch (err) {
        console.error('Failed to initialize personality test:', err);
        container.innerHTML = `<div class="personality-test section"><div class="container-sm test-shell text-center"><p style="color:#ef4444;">Gagal memuat konfigurasi tes. Silakan muat ulang halaman.</p></div></div>`;
    }
}

function renderAgeSelectorView(container, config) {
    container.innerHTML = PersonalityUI.renderAgeSelector(config);
    attachAgeSelectorEvents(container);
}

function attachAgeSelectorEvents(container) {
    const cards = container.querySelectorAll('.age-card');
    cards.forEach(card => {
        card.addEventListener('click', async () => {
            const ageKey = card.getAttribute('data-age-group');
            try {
                container.innerHTML = `<div class="personality-test section"><div class="container-sm test-shell text-center"><div class="spinner"></div><p style="margin-top:1rem; color:#9ca3af;">Memuat pertanyaan...</p></div></div>`;
                const dataset = await PersonalityLoader.loadQuestions(ageKey);
                PersonalityState.setDataset(dataset);
                PersonalityState.setAgeGroup(ageKey);
                PersonalityState.resetAnswers(dataset.questions.length);
                renderQuestionView(container);
            } catch (err) {
                console.error('Failed to load question dataset:', err);
                renderAgeSelectorView(container, PersonalityState.config);
            }
        });
    });
}

function renderQuestionView(container) {
    const dataset = PersonalityState.dataset;
    const currentIndex = PersonalityState.currentIndex;
    const answers = PersonalityState.answers;
    const question = dataset.questions[currentIndex];
    const groupTitle = PersonalityState.getGroupTitle();

    container.innerHTML = PersonalityUI.renderQuestion(question, currentIndex, dataset.questions.length, answers[currentIndex], groupTitle);
    attachQuestionEvents(container);
}

function attachQuestionEvents(container) {
    const optionCards = container.querySelectorAll('.test-option-row');
    optionCards.forEach((optCard, idx) => {
        optCard.addEventListener('click', () => {
            optionCards.forEach(c => c.classList.remove('selected'));
            optCard.classList.add('selected');
            const radio = optCard.querySelector('input[type="radio"]');
            if (radio) radio.checked = true;

            PersonalityState.setAnswer(PersonalityState.currentIndex, idx);
            const nextBtn = container.querySelector('[data-action="next"]');
            if (nextBtn) nextBtn.removeAttribute('disabled');
        });
    });

    const nextBtn = container.querySelector('[data-action="next"]');
    if (nextBtn) {
        nextBtn.addEventListener('click', () => {
            if (PersonalityState.currentIndex < PersonalityState.dataset.questions.length - 1) {
                PersonalityState.currentIndex++;
                renderQuestionView(container);
            } else {
                handleSubmission(container);
            }
        });
    }

    const prevBtn = container.querySelector('[data-action="previous"]');
    if (prevBtn) {
        prevBtn.addEventListener('click', () => {
            if (PersonalityState.currentIndex > 0) {
                PersonalityState.currentIndex--;
                renderQuestionView(container);
            }
        });
    }

    const changeAgeBtn = container.querySelector('[data-action="change-age"]');
    if (changeAgeBtn) {
        changeAgeBtn.addEventListener('click', () => {
            renderAgeSelectorView(container, PersonalityState.config);
        });
    }
}

async function handleSubmission(container) {
    container.innerHTML = PersonalityUI.renderLoading();
    await new Promise(r => setTimeout(r, 1200));

    try {
        const answers = PersonalityState.answers;
        const scores = PersonalityScoring.calculate(answers, PersonalityState.dataset);
        const resultsMeta = await PersonalityLoader.loadResults();
        const report = PersonalityAnalytics.generateReport(scores, resultsMeta);

        PersonalityStorage.save({
            ageGroup: PersonalityState.ageGroup,
            answers,
            report,
            timestamp: new Date().toISOString()
        });

        container.innerHTML = PersonalityUI.renderResult(report);
        attachResultEvents(container, report);
    } catch (err) {
        console.error('Error generating report:', err);
        container.innerHTML = `<div class="personality-test section"><div class="container-sm test-shell text-center"><p style="color:#ef4444;">Terjadi kesalahan saat memproses hasil.</p></div></div>`;
    }
}

function attachResultEvents(container, report) {
    const restartBtn = container.querySelector('[data-action="restart"]');
    if (restartBtn) {
        restartBtn.addEventListener('click', () => {
            PersonalityState.reset();
            renderAgeSelectorView(container, PersonalityState.config);
        });
    }

    const printBtn = container.querySelector('[data-action="print-pdf"]');
    if (printBtn) {
        printBtn.addEventListener('click', () => {
            window.print();
        });
    }
}