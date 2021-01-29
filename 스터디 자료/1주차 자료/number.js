var a = 42;
var b = 42.3;

var c = 5E10;
console.log(c); // 50000000000
console.log(c.toExponential()); // 5e+10

var d = c * c;
console.log(d); // 2.5e+21

var e = 1 / c;
console.log(e); // 2e-11

var f = 42.59;

console.log(f.toFixed(0)); // 43
console.log(f.toFixed(1)); // 42.6
console.log(f.toFixed(2)); // 42.59
console.log(f.toFixed(3)); // 42.590
console.log(f.toFixed(4)); // 42.5900

console.log(0.1 + 0.2 === 0.3);

console.log(Number.EPSILON); // 2.220446049250313e-16 = 2^-52

console.log(Number.MAX_SAFE_INTEGER); // 9007199254740991 = 2^53 -1
console.log(Number.MIN_SAFE_INTEGER); // -9007199254740991 = -(2^53 -1)