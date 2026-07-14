export function learningRenderer(template,data){

let cards="";

data.courses.forEach(course=>{

cards+=`

<div
class="card learning-card"
data-animate="animate-fade-up">

<div class="learning-level">

${course.icon}
${course.level}

</div>

<h3>

${course.title}

</h3>

<p>

${course.lesson}

</p>

<div class="learning-rating">

⭐⭐⭐⭐⭐

${course.rating}

</div>

<a
href="#"
class="btn btn-primary">

${course.button}

</a>

</div>

`;

});

let html=template;

html=html.replace("{{title}}",data.title);

html=html.replace("{{subtitle}}",data.subtitle);

html=html.replace("{{courses}}",cards);

return html;

}