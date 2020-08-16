function foo(num) {
    console.log("foo: " + num);
    // foo가 몇 번 호출됐는지 추적한다
    // this는 foo를 어떻게 호출하느냐에 따라 진짜 foo가 된다
    this.count++;
}

foo.count = 0;

var i;

for (i = 0; i < 10; i++) {
    if (i > 5) {
        // call 함수로 호출하므로
        // this는 자신의 함수 객체 foo를 가리킨다
        foo.call(foo, i);
    }
}

// foo: 6
// foo: 7
// foo: 8
// foo: 9

console.log(foo.count); // 4

var Ø = {};

console.log(Ø)