// var myObject = {
//     // a의 게터를 정의한다
//     get a() {
//         return 2;
//     }
// };

// Object.defineProperty(
//     myObject, // 타겟
//     "b", // 프로퍼티명
//     { // 서술자
//         // b의 게터를 정의한다
//         get: function() {return this.a * 2},
//         // b가 객체 프로퍼티로 확실히 표시되게 한다.
//         enumerable: true
//     }
// );

// console.log(myObject.a); // 2
// console.log(myObject.b); // 4

// var myObject = {
//     // a의 게터를 정의한다
//     get a() {
//         return 2;
//     }
// };

// myObject.a = 3;
// console.log(myObject.a); // 2

// var myObject = {
//     // a의 게터를 정의한다
//     get a() {
//         return this._a_;
//     },

//     // a의 세터를 정의한다
//     set a(val) {
//         this._a_ = val * 2;
//     }
// };

// myObject.a = 2;
// console.log(myObject.a); // 4

var myObject = {
    a: 2
};

console.log("a" in myObject); // true
console.log("b" in myObject); // false

console.log(myObject.hasOwnProperty("a")); // true
console.log(myObject.hasOwnProperty("b")); // false