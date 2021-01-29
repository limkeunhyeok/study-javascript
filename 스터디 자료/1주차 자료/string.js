var a = 'foo';
var b = ['f', 'o', 'o'];

console.log(a.length); // 3
console.log(b.length); // 3

console.log(a.indexOf('o')); // 1
console.log(b.indexOf('o')); // 1

var c = a.concat('bar'); // 'foobar'
var d = b.concat('bar'); // ['f', 'o', 'o', 'b', 'a', 'r']

console.log(a === c); // false
console.log(b === d); // false

console.log(a); // foo
console.log(b); // ['f', 'o', 'o']

a[1] = 'O';
b[1] = 'O';

console.log(a); // foo
console.log(b); // ['f', 'O', 'o']