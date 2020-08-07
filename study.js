foo: for (var i = 0; i < 4; i++) {
    for (var j = 0; j < 4; j++) {
        if ((i * j) >= 3) {
            console.log('그만!', i, j);
            break foo;
        }

        console.log(i, j);
    }
}

// 0 0
// 0 1
// 0 2
// 0 3
// 1 0
// 1 1
// 1 2
// 그만! 1 3