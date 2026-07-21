import Renderer from "./renderer.js";


class TestimonialRenderer{


async init(){


const response =
await fetch(
"/assets/json/homepage/testimonial.json"
);


const data =
await response.json();



const html =
data.map(item=>


`

<div class="testimonial">


<p>

"${item.message}"

</p>


<strong>

${item.name}

</strong>


</div>


`

).join("");



Renderer.render(
"#testimonial",
html
);


}


}


export default new TestimonialRenderer();