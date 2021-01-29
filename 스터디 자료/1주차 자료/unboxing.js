var a = new String('abc');
var b = new Number(42);
var c = new Boolean(true);

console.log(a.valueOf()); // 'abc'
console.log(b.valueOf()); // 42
console.log(c.valueOf()); // true

var d = new String('abc');
var e = d + '';

console.log(typeof d); // object
console.log(typeof e); // string