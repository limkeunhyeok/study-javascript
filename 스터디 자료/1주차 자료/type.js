console.log(typeof undefined === 'undefined'); // true
console.log(typeof true === 'boolean'); // true
console.log(typeof 42 === 'number'); // true
console.log(typeof 'string' === 'string'); // true
console.log(typeof {object: 'good'} === 'object'); // true
console.log(typeof Symbol() === 'symbol'); // true
console.log(typeof null === 'object'); // true

// 타입으로 null 값을 확인하는 방법
var a = null;
console.log(!a && typeof a === 'object'); // true