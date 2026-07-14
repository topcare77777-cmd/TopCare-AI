export function testimonialRenderer(template,data){

let reviews="";

data.reviews.forEach((item,index)=>{

reviews+=`

<div
class="testimonial-card ${index===0?'active':''}">

<div class="testimonial-stars">

${"⭐".repeat(item.rating)}

</div>

<p class="testimonial-comment">

"${item.comment}"

</p>

<div class="testimonial-user">

<div class="testimonial-avatar">

${item.avatar}

</div>

<div>

<h4>${item.name}</h4>

<span>${item.job}</span>

</div>

</div>

</div>

`;

});

return template
.replace("{{title}}",data.title)
.replace("{{subtitle}}",data.subtitle)
.replace("{{reviews}}",reviews);

}