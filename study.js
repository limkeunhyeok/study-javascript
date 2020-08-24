var anotherObject = {
    a: 2
};

// anotherObject에 연결된 객체를 생성한다
var myObject = Object.create(anotherObject);

for (var k in myObject) {
    console.log(k + "를 발견!");
}

console.log("a" in myObject); // true