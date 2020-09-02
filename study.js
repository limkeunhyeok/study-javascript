function now() {
    return 21;
}

function later() {
    answer = answer * 2;
    console.log("answer:", answer);
}

var answer = now();
setTimeout(later, 1000); // answer: 42
