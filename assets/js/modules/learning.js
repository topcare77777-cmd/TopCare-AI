import { getLearningData } from "../services/learning.service.js";
import { learningRenderer } from "../renderers/learning.renderer.js";

const PROGRESS_KEY = "topcare-learning-progress";

export async function initLearning() {
    const target = document.querySelector("#learning");
    if (!target) return;

    try {
        const [templateResponse, data] = await Promise.all([
            fetch("templates/components/learning.html"),
            getLearningData()
        ]);
        if (!templateResponse.ok || !data) throw new Error("Katalog Learning tidak dapat dimuat.");

        target.innerHTML = learningRenderer(await templateResponse.text(), data);
        setupLearning(target, data);
    } catch (error) {
        console.error("Learning Module Error:", error);
        target.innerHTML = "<p class=\"learning-error\">Katalog belajar belum dapat dimuat. Silakan muat ulang halaman.</p>";
    }
}

function setupLearning(target, data) {
    const filters = target.querySelectorAll(".learning-filter");
    const search = target.querySelector(".learning-search input");
    const cards = target.querySelectorAll(".learning-card");
    const empty = target.querySelector(".learning-empty");
    const dialog = target.querySelector(".learning-dialog");
    let activeFilter = "All";

    const applyFilters = () => {
        const query = search.value.trim().toLowerCase();
        let visible = 0;
        cards.forEach((card) => {
            const matchesLevel = activeFilter === "All" || card.dataset.level === activeFilter;
            const matchesQuery = card.dataset.search.toLowerCase().includes(query);
            const show = matchesLevel && matchesQuery;
            card.hidden = !show;
            if (show) visible += 1;
        });
        empty.hidden = visible > 0;
    };

    filters.forEach((button) => button.addEventListener("click", () => {
        activeFilter = button.dataset.filter;
        filters.forEach((item) => item.classList.toggle("active", item === button));
        applyFilters();
    }));
    search.addEventListener("input", applyFilters);
    target.querySelectorAll("[data-open-course]").forEach((button) => button.addEventListener("click", () => {
        const course = data.courses.find((item) => item.id === button.dataset.openCourse);
        openCourse(dialog, course);
    }));
}

function openCourse(dialog, course) {
    const progress = getProgress(course.id);
    dialog.innerHTML = `
        <div class="dialog-header"><div><p class="learning-kicker">${course.level} · ${course.duration}</p><h2 id="course-dialog-title">${course.title}</h2></div><button type="button" class="dialog-close" aria-label="Tutup detail kursus">×</button></div>
        <p class="dialog-description">${course.description}</p>
        <div class="course-progress"><div><strong>Progres belajar</strong><span data-progress-label>${progress.length}/${course.lessons.length} materi selesai</span></div><div class="course-progress-track"><span data-progress-bar style="width:${(progress.length / course.lessons.length) * 100}%"></span></div></div>
        <ol class="lesson-list">${course.lessons.map((lesson, index) => `<li><label><input type="checkbox" data-lesson="${index}" ${progress.includes(index) ? "checked" : ""}><span><strong>${lesson.title}</strong><small>${lesson.duration}</small></span></label></li>`).join("")}</ol>
        <p class="dialog-note">Progres disimpan di perangkat ini.</p>`;
    dialog.querySelector(".dialog-close").addEventListener("click", () => dialog.close());
    dialog.querySelectorAll("[data-lesson]").forEach((checkbox) => checkbox.addEventListener("change", () => {
        const completed = [...dialog.querySelectorAll("[data-lesson]:checked")].map((item) => Number(item.dataset.lesson));
        saveProgress(course.id, completed);
        dialog.querySelector("[data-progress-label]").textContent = `${completed.length}/${course.lessons.length} materi selesai`;
        dialog.querySelector("[data-progress-bar]").style.width = `${(completed.length / course.lessons.length) * 100}%`;
    }));
    dialog.showModal();
}

function getProgress(courseId) {
    try {
        const value = JSON.parse(localStorage.getItem(PROGRESS_KEY));
        return Array.isArray(value?.[courseId]) ? value[courseId] : [];
    } catch { return []; }
}

function saveProgress(courseId, completed) {
    let allProgress = {};
    try { allProgress = JSON.parse(localStorage.getItem(PROGRESS_KEY)) || {}; } catch { /* Start fresh. */ }
    allProgress[courseId] = completed;
    localStorage.setItem(PROGRESS_KEY, JSON.stringify(allProgress));
}
