/**
 * @file personality-ui.js
 * @description Enterprise-grade semantic HTML UI renderer for the Personality Test V2.
 * @module Personality/UI
 */

export const PersonalityUI = {
    renderAgeSelector(config) {
        const groups = config && config.ageGroups ? config.ageGroups : [];
        return `
            <div class="personality-test section">
                <div class="container-sm test-shell text-center">
                    <p class="test-kicker">TopCare AI · Personality Explorer V2</p>
                    <h1 class="test-title">Pilih Kelompok Usia Anda</h1>
                    <p class="test-intro">Pilih kategori usia yang sesuai untuk mendapatkan kuesioner yang dirancang khusus dengan konteks kehidupan dan kebutuhan Anda.</p>
                    <div class="age-selector-grid">
                        ${groups.map(g => `
                            <button type="button" class="enterprise-card age-card" data-age-group="${g.key}">
                                <span class="age-icon">${g.key === '12-15' ? '🎒' : g.key === '16-18' ? '🎓' : '💼'}</span>
                                <h3>${g.title}</h3>
                                <p>${g.subtitle}</p>
                            </button>
                        `).join("")}
                    </div>
                </div>
            </div>
        `;
    },

    renderHeader(groupTitle) {
        return `
            <div class="test-header-row">
                <p class="test-kicker" style="margin: 0;">${groupTitle}</p>
                <button type="button" class="btn btn-secondary" data-action="change-age">Ganti Kategori Usia</button>
            </div>
        `;
    },

    renderProgress(currentIndex, totalQuestions) {
        const progress = ((currentIndex + 1) / totalQuestions) * 100;
        return `
            <div class="test-progress" aria-label="Progres tes">
                <span style="width: ${progress}%"></span>
            </div>
            <p class="test-counter">Pertanyaan ${currentIndex + 1} dari ${totalQuestions}</p>
        `;
    },

    renderOption(option, idx, selectedAnswerIndex) {
        const isSelected = selectedAnswerIndex === idx;
        return `
            <label class="test-option-row ${isSelected ? "selected" : ""}" tabindex="0">
                <input type="radio" name="personality-answer" value="${idx}" ${isSelected ? "checked" : ""}>
                <span class="option-radio-indicator"></span>
                <span class="option-text">${option.text}</span>
            </label>
        `;
    },

    renderQuestion(question, currentIndex, totalQuestions, selectedAnswerIndex, groupTitle) {
        return `
            <section class="personality-test section">
                <div class="container-sm test-shell">
                    ${this.renderHeader(groupTitle)}
                    ${this.renderProgress(currentIndex, totalQuestions)}
                    <fieldset class="test-question-fieldset">
                        <legend class="test-legend-bold">${question.text}</legend>
                        <div class="test-options-stack">
                            ${question.options.map((opt, idx) => this.renderOption(opt, idx, selectedAnswerIndex)).join("")}
                        </div>
                    </fieldset>
                    ${this.renderFooter(currentIndex, totalQuestions, selectedAnswerIndex)}
                </div>
            </section>
        `;
    },

    renderFooter(currentIndex, totalQuestions, selectedAnswerIndex) {
        const isFirst = currentIndex === 0;
        const isLast = currentIndex === totalQuestions - 1;
        return `
            <div class="test-actions">
                <button type="button" class="btn btn-secondary" data-action="previous" ${isFirst ? "disabled" : ""}>Kembali</button>
                <button type="button" class="btn btn-primary" data-action="next" ${selectedAnswerIndex === null ? "disabled" : ""}>${isLast ? "Lihat Hasil" : "Lanjut"}</button>
            </div>
        `;
    },

    renderLoading() {
        return `
            <section class="personality-test section">
                <div class="container-sm test-shell text-center test-loading-box">
                    <div class="spinner"></div>
                    <h2>Menganalisis Jawaban Anda...</h2>
                    <p>Sistem AI sedang memproses profil temperamen primer, sekunder, serta rekomendasi pengembangan diri Anda.</p>
                </div>
            </section>
        `;
    },

    renderResult(report) {
        const { ranking, primary, secondary, primaryMeta, secondaryMeta, strength, weakness, communication, learning, leadership, compatibility, stress, development, career, historicalFigures, recommendedJobs, jobsToAvoid, recommendedStudy } = report;

        const primaryImageMap = {
            "Koleris": "koleris.webp",
            "Sanguinis": "sanguinis.webp",
            "Melankolis": "melankolis.webp",
            "Plegmatis": "plegmatis.webp"
        };
        const imageFileName = primaryImageMap[primary] || "koleris.webp";
        const imagePath = `assets/images/personality/${imageFileName}`;

        return `
            <section class="personality-test section">
                <div class="container-sm test-shell test-result-dashboard">
                    <div class="result-header-card" style="background: ${primaryMeta.color || 'linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%)'}">
                        <div class="result-header-content-wrapper">
                            <div class="result-header-text">
                                <span class="result-badge">Hasil Asesmen Temperamen AI</span>
                                <div class="result-title-row">
                                    <span class="result-emoji">${primaryMeta.icon || '⭐'}</span>
                                    <h1>${primary}</h1>
                                </div>
                                <p class="result-summary">${primaryMeta.summary}</p>
                            </div>
                            <div class="result-avatar-container">
                                <img src="${imagePath}" alt="${primary}" class="result-personality-avatar" onerror="this.onerror=null; this.src='assets/images/personality/koleris.webp';">
                            </div>
                        </div>
                    </div>

                    <div class="result-secondary-banner">
                        <h3>Profil Sekunder: <span>${secondary}</span></h3>
                        <p>${secondaryMeta.summary || ''}</p>
                    </div>

                    <div class="result-card-section">
                        <h2>Distribusi Persentase Temperamen</h2>
                        <div class="result-scores-stack">
                            ${ranking.map(r => `
                                <div class="score-row-item">
                                    <div class="score-label-row">
                                        <span class="score-type-name">${r.type}</span>
                                        <span class="score-percentage-val">${r.percentage}% (${r.score} soal)</span>
                                    </div>
                                    <div class="score-track">
                                        <div class="score-fill" style="width: ${r.percentage}%; background: ${r.type === primary ? '#3b82f6' : 'rgba(255,255,255,0.25)'};"></div>
                                    </div>
                                </div>
                            `).join("")}
                        </div>
                    </div>

                    <div class="result-grid-two">
                        <div class="result-card enterprise-card">
                            <div class="card-icon-title">🛡️ <h2>Strengths (Kekuatan Utama)</h2></div>
                            <ul class="result-bullet-list">
                                ${strength.map(s => `<li>${s}</li>`).join("")}
                            </ul>
                        </div>
                        <div class="result-card enterprise-card">
                            <div class="card-icon-title">⚡ <h2>Weaknesses (Area Pengembangan)</h2></div>
                            <ul class="result-bullet-list">
                                ${weakness.map(w => `<li>${w}</li>`).join("")}
                            </ul>
                        </div>
                    </div>

                    <div class="result-card enterprise-card recommendation-card-box">
                        <div class="card-icon-title">🎯 <h2>Rekomendasi Komprehensif & Karier</h2></div>
                        <div class="recommendation-grid-details">
                            <div class="comprehensive-item"><strong>Career Recommendation</strong><p>${career}</p></div>
                            <div class="comprehensive-item"><strong>Recommended Study / Major</strong><p>${recommendedStudy}</p></div>
                            <div class="comprehensive-item"><strong>Leadership Style</strong><p>${leadership}</p></div>
                            <div class="comprehensive-item"><strong>Communication Style</strong><p>${communication}</p></div>
                            <div class="comprehensive-item"><strong>Learning Style</strong><p>${learning}</p></div>
                            <div class="comprehensive-item"><strong>Compatible Personality</strong><p>${compatibility}</p></div>
                            <div class="comprehensive-item"><strong>Stress Response</strong><p>${stress}</p></div>
                            <div class="comprehensive-item"><strong>Development Advice</strong><p>${development}</p></div>
                            <div class="comprehensive-item"><strong>Recommended Jobs</strong><p>${recommendedJobs.join(", ")}</p></div>
                            <div class="comprehensive-item"><strong>Jobs to Avoid</strong><p>${jobsToAvoid.join(", ")}</p></div>
                            <div class="comprehensive-item"><strong>Historical Figures</strong><p>${historicalFigures.join(", ")}</p></div>
                        </div>
                    </div>

                    <p class="test-disclaimer">Hasil ini adalah refleksi kecenderungan temperamen berdasarkan model psikologi modern, bukan diagnosis klinis.</p>
                    
                    <div class="test-actions center-actions">
                        <button type="button" class="btn btn-secondary" data-action="restart">Ulangi Tes</button>
                        <button type="button" class="btn btn-primary" data-action="print-pdf">Download Hasil PDF</button>
                        <a href="index.html#learning" class="btn btn-secondary" style="text-decoration: none; display: inline-flex; align-items: center;">Mulai Belajar</a>
                    </div>
                </div>
            </section>
        `;
    }
};