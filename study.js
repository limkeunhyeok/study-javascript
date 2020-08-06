var x = '42';
var y = true;

console.log(x == y); // false

var x = '42';
var y = false;

console.log(x == y); // false

var a = null;
var b;

console.log(a == b); // true
console.log(a == null); // true
console.log(b == null); // true

console.log(a == false); // false
console.log(b == false); // false
console.log(a == ''); // false
console.log(b == ''); // false
console.log(a == 0); // false
console.log(b == 0); // false

var a = 42;
var b = [42];

console.log(a == b); // true

var a = 'abc';
var b = Object(a);

console.log(a === b); // false
console.log(a == b); // true



var a = null;
var b = Object(a);
console.log(a == b); // false

var c = undefined;
var d = Object(c);
console.log(c == d); // false

var e = NaN;
var f = Object(e);
console.log(e == f); // false

Number.prototype.valueOf = function() {
    return 3;
}
console.log(new Number(2) == 3); // true

console.log('0' == null); // false
console.log('0' == undefined); // false
console.log('0' == false); // true
console.log('0' == NaN); // false
console.log('0' == 0); // true
console.log('0' == ''); // false

console.log(false == null); // false
console.log(false == undefined); // false
console.log(false == NaN); // false
console.log(false == 0); // true
console.log(false == ''); // true
console.log(false == []); // true
console.log(false == {}); // false

console.log('' == null); // false
console.log('' == undefined); // false
console.log('' == NaN); // false
console.log('' == 0); // true
console.log('' == []); // true
console.log('' == {}); // false

console.log(0 == null); // false
console.log(0 == undefined); // false
console.log(0 == NaN); // false
console.log(0 == []); // true
console.log(0 == {}); // false

console.log([] == ![]); // true

console.log(2 == [2]); // true
console.log('' == [null]); // true

console.log(0 == '\n'); // true

var a = ['42'];
var b = ['043'];

console.log(a < b); // false

var a = {b: 42};
var b = {b: 43};

console.log(a < b);

var a = {b: 42};
var b = {b: 43};

console.log(a < b); // false
console.log(a == b); // false
console.log(a > b); // false

console.log(a <= b); // true
console.log(a >= b); // true