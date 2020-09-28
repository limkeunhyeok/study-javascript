var a = 2;
var b = a; // 값-복사
b++;
console.log(a); // 2
console.log(b); // 3

var c = [1, 2, 3];
var d = c; // 레퍼런스-복사
d.push(4);
console.log(c); // [1, 2, 3, 4]
console.log(d); // [1, 2, 3, 4]
