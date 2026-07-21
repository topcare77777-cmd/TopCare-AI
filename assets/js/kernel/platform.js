const Platform={

    mobile:()=>window.innerWidth<768,

    tablet:()=>window.innerWidth>=768 && window.innerWidth<1200,

    desktop:()=>window.innerWidth>=1200,

    online:()=>navigator.onLine

};

export default Platform;