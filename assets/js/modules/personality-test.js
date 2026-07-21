const STORAGE_KEY = "topcare-personality-test";

export async function initPersonalityTest() {
    const target = document.querySelector("#personality-test");
    if (!target) return;

    try {
        const response = await fetch("assets/json/personality-test.json");
        if (!response.ok) throw new Error("Data tes kepribadian tidak ditemukan.");

        const data = await response.json();
        renderTest(target, data);
    } catch (error) {
        console.error("Personality Test Error:", error);
        target.innerHTML = "<p class=\"test-error\">Tes belum dapat dimuat. Silakan muat ulang halaman.</p>";
    }
}

function renderTest(target, data) {
    const state = { index: 0, answers: Array(data.questions.length).fill(null) };

    const renderQuestion = () => {
        const question = data.questions[state.index];
        const progress = ((state.index + 1) / data.questions.length) * 100;

        target.innerHTML = `
            <section class="personality-test section">
                <div class="container-sm test-shell">
                    <p class="test-kicker">TopCare AI · Personality Explorer</p>
                    <h1>${data.title}</h1>
                    <p class="test-intro">${data.intro}</p>
                    <div class="test-progress" aria-label="Progres tes"><span style="width:${progress}%"></span></div>
                    <p class="test-counter">Pertanyaan ${state.index + 1} dari ${data.questions.length}</p>
                    <fieldset class="test-question">
                        <legend>${question.text}</legend>
                        <div class="test-options">
                            ${question.options.map((option, index) => `
                                <label class="test-option ${state.answers[state.index] === index ? "selected" : ""}">
                                    <input type="radio" name="personality-answer" value="${index}" ${state.answers[state.index] === index ? "checked" : ""}>
                                    <span>${option.text}</span>
                                </label>`).join("")}
                        </div>
                    </fieldset>
                    <div class="test-actions">
                        <button type="button" class="btn btn-secondary" data-action="previous" ${state.index === 0 ? "disabled" : ""}>Kembali</button>
                        <button type="button" class="btn btn-primary" data-action="next" ${state.answers[state.index] === null ? "disabled" : ""}>${state.index === data.questions.length - 1 ? "Lihat Hasil" : "Lanjut"}</button>
                    </div>
                </div>
            </section>`;

        target.querySelectorAll("input[name=\"personality-answer\"]").forEach((input) => {
            input.addEventListener("change", () => {
                state.answers[state.index] = Number(input.value);
                renderQuestion();
            });
        });
        target.querySelector('[data-action="previous"]').addEventListener("click", () => { state.index -= 1; renderQuestion(); });
        target.querySelector('[data-action="next"]').addEventListener("click", () => {
            if (state.index === data.questions.length - 1) renderResult();
            else { state.index += 1; renderQuestion(); }
        });
    };

    const renderResult = () => {
        const scores = Object.fromEntries(Object.keys(data.results).map((type) => [type, 0]));
        state.answers.forEach((answer, index) => { scores[data.questions[index].options[answer].type] += 1; });
        const resultType = Object.keys(scores).reduce((best, type) => scores[type] > scores[best] ? type : best, "Koleris");
        const result = data.results[resultType];
        localStorage.setItem(STORAGE_KEY, JSON.stringify({ type: resultType, scores, completedAt: new Date().toISOString() }));

        target.innerHTML = `
            <section class="personality-test section">
                <div class="container-sm test-shell test-result">
                    <p class="test-kicker">Hasil Tes Anda</p>
                    <div class="result-icon" style="background:${result.color}">${result.icon}</div>
                    <h1>${resultType}</h1>
                    <p class="result-summary">${result.summary}</p>
                    <div class="result-card">
                        <h2>Kekuatan Anda</h2>
                        <ul>${result.strengths.map((strength) => `<li>${strength}</li>`).join("")}</ul>
                        <h2>Langkah pengembangan</h2>
                        <p>${result.tips}</p>
                    </div>
                    <div class="result-scores" aria-label="Skor tiap tipe">
                        ${Object.entries(scores).map(([type, score]) => `<div><span>${type}</span><strong>${score}/${data.questions.length}</strong></div>`).join("")}
                    </div>
                    <p class="test-disclaimer">Hasil ini adalah refleksi kecenderungan, bukan diagnosis psikologis.</p>
                    <div class="test-actions"><button type="button" class="btn btn-secondary" data-action="restart">Ulangi Tes</button><a class="btn btn-primary" href="index.html#learning">Mulai Belajar</a></div>
                </div>
            </section>`;
        target.querySelector('[data-action="restart"]').addEventListener("click", () => { state.index = 0; state.answers.fill(null); renderQuestion(); });
    };

    renderQuestion();
}
