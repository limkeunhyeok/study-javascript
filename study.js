var mixed_list = ['one', 2, 3.0, {'four': 'four', 'five': 'five'}, null, undefined];

var list = [1, 2, 3, 4];
console.log(list.length);

list[1000] = 0;
console.log(list.length);



var list = [1, 2, 3, 4, 5, 6];
console.log(list.length);

list.length = 3;
for (var i = 0; i < list.length; i++) {
    console.log(list[i]);
};

var list = [1, 2, 3, 4, 5];
console.log(list);
list[5] = 6;
console.log(list);
list.push(7);
console.log(list);
console.log('-----------------')


var list = [1, 2, 3, 4, 5];
var deleted = list.splice(1, 3);
console.log(deleted);
console.log(list);

var list = [1, 2, 3, 4, 5];
var deleted = list.pop();
console.log(deleted);
console.log(list);

var list = [1, 2, 3, 4, 5];
delete list[2];
console.log(list);

Array.dim = function (dimension, initial) {
    var a = [], i;
    for (i = 0; i < dimension; i++) {
        a[i] = initial;
    };
    return a;
};

var list = Array.dim(5, 0);
console.log(list);
console.log('----------');

Array.dim_2d = function (m, n, initial) {
    var outer = [], inner = [], i, j;
    
    for (i = 0; i < n; i++) {
        inner[i] = initial;
    };

    for (j = 0; j < m; j++) {
        outer[j] = inner;
    };
    return outer;
};

var list_2d = Array.dim_2d(5, 3, 0);
console.log(list_2d);