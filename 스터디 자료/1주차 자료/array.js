var a = [1, '2', [3]]

console.log(a.length); // 3
console.log(a[0] === 1); // true
console.log(a[2][0] === 3); // true


var b = [];

b[0] = 1;
b[2] = [3];

console.log(b[1]); // undefined
console.log(b.length); // 3

var c = [];

c[0] = 1;
c["foobar"] = 2;

console.log(c.length); // 1
console.log(c.foobar); // 2
console.log(c["foobar"]); // 2