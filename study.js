function *foo() {
    try {
        yield "B";
    } catch (error) {
        console.log("*foo()에서 붙잡힌 에러:", error);
    }

    yield "C";
    throw "D";
}

function *bar() {
    yield "A";
    try {
        yield *foo();
    } catch (error) {
        console.log("*bar()에서 붙잡힌 에러:", error);
    }

    yield "E";
    yield *baz();

    // 아래 코드는 실행되지 않는다.
    yield "G";
}

function *baz() {
    throw "F";
}

var it = bar();

console.log("외부:", it.next().value);
console.log("외부:", it.next(1).value);
console.log("외부:", it.throw(2).value);
console.log("외부:", it.next(3).value);

try {
    console.log("외부:", it.next(4).value);
} catch (error) {
    console.log("외부에서 붙잡힌 에러:", error);
}