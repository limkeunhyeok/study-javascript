var p1 = Promise.resolve(21);
var p2 = Promise.resolve(42);
var p3 = Promise.resolve("???");

Promise.map([p1, p2, p3], function(pr, done) {
    Promise.resolve(pr)
    .then(
        function(v) {
            done(v * 2);
        },
        done
    );
})
.then(function(vals) {
    console.log(vals);
});