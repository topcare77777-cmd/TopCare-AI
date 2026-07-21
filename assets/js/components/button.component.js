class Button {


create(text,link="#",type="primary"){


return `


<a 

href="${link}"

class="btn btn-${type}">


${text}


</a>


`;


}


}


export default new Button();