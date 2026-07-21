class Validator {



required(value){


return (

value !== null &&
value !== undefined &&
value.trim() !== ""

);


}



email(value){


return /^[^\s@]+@[^\s@]+\.[^\s@]+$/

.test(value);


}



minLength(value,length){


return value.length >= length;


}



maxLength(value,length){


return value.length <= length;


}



number(value){


return !isNaN(value);


}



}



export default new Validator();