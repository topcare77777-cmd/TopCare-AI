/**
 * Cache Configuration
 */

const CacheConfig={

enabled:true,

version:"2.0.0",

ttl:1000*60*15,

maxItems:150,

strategy:"memory-first",

persistent:true,

compression:false

};

export default CacheConfig;