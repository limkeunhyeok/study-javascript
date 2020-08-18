var prefix = "foo";
var myObject = {
    [prefix + "bar"]: "hello",
    [prefix + "baz"]: "world"
}

console.log(myObject["foobar"]); // hello
console.log(myObject["foobaz"]); // world