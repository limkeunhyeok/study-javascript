function foo(x, y, cb) {
    setTimeout(function() {
        // 에러-우선 스타일
        cb(null, x + y);
    }, 1000);
}

function thunkify(fn) {
    return function() {
        var args = [].slice.call(arguments);
        return function(cb) {
            args.push(cb);
            return fn.apply(null, args);
        };
    };
}

var whatIsThis = thunkify(foo);

var fooThunk = whatIsThis(3, 4);

fooThunk(function(sum) {
    console.log(sum);
});