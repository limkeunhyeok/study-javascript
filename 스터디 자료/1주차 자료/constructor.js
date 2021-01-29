var a = new Date();
console.log(a.getTime()); // 유닉스 타임스탬프 값
console.log(Date()); // 현재 시각 날짜

var b = new Error('Error!');
console.log(b); // 에러 스택
console.log(b.toString()); // 에러 메세지

var c = Symbol('My symbol');
console.log(c); // Symbol(My symbol)

var d = {};
d[c] = 'foo';
console.log(d); // { [Symbol(My symbol)]: 'foo' }