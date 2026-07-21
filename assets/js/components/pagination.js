class Pagination {


render(total,current=1){


let html="";


for(let i=1;i<=total;i++){


html += `


<button

class="${i===current?'active':''}"

data-page="${i}">

${i}

</button>


`;


}


return html;


}


}


export default new Pagination();