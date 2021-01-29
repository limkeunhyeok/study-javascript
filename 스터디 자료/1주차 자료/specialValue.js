var a = 42;
console.log(void a, a); // undefined, 42

var b = 2 / 'foo';
console.log(typeof b); // number

var c = 2 / 'foo';
console.log(c === NaN); // false

var d = 2 / 'foo';
var e = 'foo';
console.log(isNaN(d)); // true
console.log(isNaN(e)); // true

console.log(1 / 0); // Infinity
console.log(-1 / 0); // -Infinity

console.log(0 / -3); // -0
console.log(0 / 3); // 0

var f = 2 / 'foo';
var g = -3 * 0;
console.log(Object.is(f, NaN)); // true
console.log(Object.is(g, -0)); // true
console.log(Object.is(g, 0)); // false