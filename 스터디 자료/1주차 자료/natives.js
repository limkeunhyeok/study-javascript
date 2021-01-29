var a = new String('abc');

console.log(typeof a); // object
console.log(a instanceof String); // true
console.log(Object.prototype.toString.call(a)); // [object String]