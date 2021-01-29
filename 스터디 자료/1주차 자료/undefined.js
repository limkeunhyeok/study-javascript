var a;
console.log(typeof a); // undefined

var b = 42;
var c;

b = c;

console.log(typeof b); // undefined
console.log(typeof c); // undefined

var d;

console.log(d); // undefined
console.log(typeof e); // undefined
console.log(e); // ReferenceError