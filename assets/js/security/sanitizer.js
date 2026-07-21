class Sanitizer {


clean(value){


if(!value)
return "";



return String(value)

.replace(
/</g,
"&lt;"
)

.replace(
/>/g,
"&gt;"
)

.replace(
/"/g,
"&quot;"
)

.replace(
/'/g,
"&#039;"
);



}



stripHTML(value){


const div =
document.createElement("div");


div.innerHTML=value;


return div.textContent || "";

}



}



export default new Sanitizer();