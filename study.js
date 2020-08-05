var a = 42;
var b = a.toString();

var c = '3.14';
var d = +c;

console.log(typeof b); // string
console.log(typeof d); // number

var c = '3.14';
var d = 5+ +c;
console.log(typeof d); // number
console.log(d); // 8.14

var a = '42';
var b = '42px';

console.log(Number(a)); // 42
console.log(parseInt(a)); // 42

console.log(Number(b)); // NaN
console.log(parseInt(b)); // 42

var a = '0';
var b = [];
var c = {};

var d = '';
var e = 0;
var f = null;
var g;

console.log(!!a); // true
console.log(!!b); // true
console.log(!!c); // true
console.log(!!d); // false
console.log(!!e); // false
console.log(!!f); // false
console.log(!!g); // false

var a = [1, 2];
var b = [3, 4];

console.log(a + b); // 1, 23, 4


var a = '3.14';
var b = a - 0;

console.log(typeof b); // number;
console.log(b); // 3.14

function onlyOne(a, b, c) {
    return !!((a && !b && !c) || (!a && b && !c) || (!a && !b && c));
}

var a = true;
var b = false;

console.log(onlyOne(a, b, b)); // true
console.log(onlyOne(b, a, b)); // true
console.log(onlyOne(a, b, a)); // false

function onlyOne() {
    var sum = 0;
    for (var i = 0; i < arguments.length; i++) {
        // falsy 값은 0으로 취급되어 건너뛴다.
        // NaN은 피해야 한다.
        if (arguments[i]) {
            sum += arguments[i];
        }
    }
    return sum == 1;
}

var a = true;
var b = false;

console.log(onlyOne(b, a)); // true
console.log(onlyOne(b, a, b, b, b)); // true

console.log(onlyOne(b, b)); // false
console.log(onlyOne(b, a, b, b, b, a)); // false

var a = 42;
var b = 'abc';
var c = null;

console.log(a || b);
console.log(a && b);

console.log(c || b);
console.log(c && b);

function foo() {
    console.log(a);
}

var a = 42;
a && foo();