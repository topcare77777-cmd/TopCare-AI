class DashboardLayout{

constructor(){

this.sidebar="#sidebar";

this.navbar="#navbar";

this.content="#dashboard-content";

this.footer="#footer";

}

setTitle(title){

document.title=title+" | TopCare AI";

}

content(html){

const el=document.querySelector(this.content);

if(el){

el.innerHTML=html;

}

}

loading(){

this.content(`
<div class="loading">
Loading...
</div>
`);

}

}

export default new DashboardLayout();