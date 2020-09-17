function *main() {
    var x = yield "hello world!";
    
    // 실행되지 않음
    console.log(x);
}

var it = main();
it.next();

try {
    it.throw("???");
} catch (error) {
    console.log(error);
}

// ???