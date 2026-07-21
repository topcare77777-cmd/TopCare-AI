/**
 * Hero Renderer
 */


export default function(data){


return `


<div class="hero-wrapper">


<h1>
${data.title}
</h1>


<p>
${data.description}
</p>


<a 
href="${data.buttonLink}"
class="btn">

${data.buttonText}

</a>


</div>


`;


}