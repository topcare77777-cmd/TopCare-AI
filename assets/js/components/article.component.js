import BaseComponent
from "./base.component.js";


import ArticleService
from "../services/article.service.js";



class ArticleComponent
extends BaseComponent{


constructor(){

super(
"#articles"
);

}





async mount(){


const articles =
await ArticleService.getLatest();



let html="";



articles.forEach(article=>{


html += `


<article class="article-card">


<h3>
${article.title}
</h3>


<p>
${article.excerpt}
</p>


</article>


`;



});



this.render(html);



}


}



export default new ArticleComponent();