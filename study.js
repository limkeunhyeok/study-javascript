function foo() {
    try {
        return 42;
    }
    finally {
        console.log('hello');
    }
    console.log('실행되지 않는다');
}

console.log(foo());
// hello
// 42

for (var i = 0; i < 10; i++) {
    try {
        // console.log(i)
        continue;
    }
    finally {
        console.log(i);
    }
}

var a = '42';

switch (true) {
    case a == 10:
        console.log("10 또는 '10'");
        break;
    case a == 42:
        console.log("42 또는 '42'");
        break;
    default:
        // 여기엔 오지 않는다.
}
// 42 또는 '42'