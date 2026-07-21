/**
 * FAQ Renderer
 */


export default function(items){


return items.map(item=>{


return `


<div class="faq-card">


<h4>
${item.question}
</h4>


<p>
${item.answer}
</p>


</div>


`;


}).join("");



}