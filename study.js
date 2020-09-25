// 케이스 1
var x = [];
for (var i = 0; i < 10; i++) {
    x[i] = "x";
}

// 케이스 2
var x = [];
for (var i = 0; i < 10; i++) {
    x[x.length] = "x";
}

// 케이스 3
var x = [];
for (var i = 0; i < 10; i++) {
    x.push("x");
}