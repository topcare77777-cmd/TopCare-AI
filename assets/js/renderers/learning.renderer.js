export function learningRenderer(template, data) {
    const courses = data.courses.map((course) => `
        <article class="learning-card learning-card-${course.accent}" data-course-id="${course.id}" data-level="${course.level}" data-search="${course.title} ${course.description} ${course.level}">
            <div class="course-topline"><span class="course-icon">${course.icon}</span><span class="course-level">${course.level}</span></div>
            <h3>${course.title}</h3>
            <p>${course.description}</p>
            <div class="course-meta"><span>${course.lesson}</span><span>${course.duration}</span></div>
            <div class="course-footer"><span class="course-rating">★ ${course.rating} <small>· ${course.students}</small></span><button type="button" class="btn btn-primary" data-open-course="${course.id}">${course.button}</button></div>
        </article>`).join("");

    return template
        .replace("{{title}}", data.title)
        .replace("{{subtitle}}", data.subtitle)
        .replace("{{courseCount}}", data.courses.length)
        .replace("{{searchPlaceholder}}", data.searchPlaceholder)
        .replace("{{courses}}", courses);
}
