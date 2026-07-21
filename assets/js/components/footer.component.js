class Footer {


render(){


return `


<footer class="footer">


<div>


<h3>
TopCare AI
</h3>


<p>
AI Platform untuk belajar,
berkarya dan berkembang.
</p>


</div>



<div>


<p>
© ${new Date().getFullYear()}
TopCare AI
</p>


</div>


</footer>


`;


}


mount(selector="#footer"){


const el =
document.querySelector(selector);


if(el)

el.innerHTML =
this.render();


}



}


export default new Footer();