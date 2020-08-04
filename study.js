var a = new String('abc');

console.log(typeof a); // object
console.log(a instanceof String); // true
console.log(Object.prototype.toString.call(a)); // [object String]

console.log(Object.prototype.toString.call([1, 2, 3]));
console.log(Object.prototype.toString.call(/regex-literal/i));

var a = new String('abc');
var b = new Number(42);
var c = new Boolean(true);

console.log(a.valueOf());
console.log(b.valueOf());
console.log(c.valueOf());

var a = new String('abc');
var b = a + '';

console.log(typeof a);
console.log(typeof b);

var a = new Array(3);
console.log(a);
console.log(a.length);

var a = new Array(3);
var b = [undefined, undefined, undefined];
var c = [];
c.length = 3;

console.log(a);
console.log(b);
console.log(c);

var a = Array.apply(null, {length: 3});
console.log(a);

var a = {
    a : 'abc',
    b : 2
};

console.log(a)
console.log(a.toString())