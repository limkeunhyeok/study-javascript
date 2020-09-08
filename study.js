var p1 = Promise.resolve(42);
var p2 = Promise.resolve(p1);

console.log(p1 === p2); // true