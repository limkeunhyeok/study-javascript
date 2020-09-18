// 제너레이터 아닌 일반 함수다.
function bar(url1, url2) {
    return Promise.all([
        request(url1),
        request(url2)
    ]);
}

function *foo() {
    // 프로미스형 동시성 관련 세부분은 감춘다.
    // bar() 내부
    var results = yield bar(
        "http://some.url.1",
        "http://some.url.2"
    );

    var r1 = results[0];
    var r2 = results[1];

    var r3 = yield request("http://some.url.3/?v=" + r1 + "," + r2);

    console.log(r3);
}
// 앞서 정의한 run 유틸리티
run(foo);