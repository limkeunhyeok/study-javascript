// var a = String('abc');
// console.log(a.length); // 3
// console.log(a.indexOf('c')); // 2
// console.log(a.toUpperCase()); // ABC

function isThisCool(vals, fn, rx) {
    vals = vals || Array.prototype;
    fn = fn || Function.prototype;
    rx = rx || RegExp.prototype;

    return rx.test(
        vals.map(fn).join("")
    );
}

//isThisCool();

isThisCool(
    ['a', 'b', 'c'],
    function(v) { return v.toUpperCase() },
    /D/
);

console.log(Array.prototype);
console.log(Function.prototype);