function foo() {
    var a = 2;
    (() => {
        console.log(a);
    })();
}

foo();