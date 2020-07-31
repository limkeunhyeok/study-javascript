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

console.log(0.1 + 0.2 === 0.3); // false
console.log(0.1 + 0.2)

function numbersCloseEnoughToEqual(n1, n2) {
    return Math.abs(n1 - n2) < Number.EPSILON;
}

var a = 0.1 + 0.2;
var b = 0.3;

console.log(numbersCloseEnoughToEqual(a, b)); // true
console.log(numbersCloseEnoughToEqual(0.00000001, 0.00000002)); // false

console.log(Number.isInteger(42)); // true
console.log(Number.isInteger(42.000)); // true
console.log(Number.isInteger(42.3)); // false

console.log(Number.isSafeInteger(Number.MAX_SAFE_INTEGER));
console.log(Number.isSafeInteger(Math.pow(2, 53)));
console.log(Number.isSafeInteger(Math.pow(2, 53) - 1));