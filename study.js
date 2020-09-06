function add(xPromimse, yPromise) {
    // Promise.all([])은 프로미스 배열을 인자로 받아
    // 프로미스들이 모두 귀결될 때까지 기다렸다가
    // 새 프로미스를 만들어 반환하는 함수다.
    return Promise.all([xPromise, yPromise])
    // 프로미스가 귀결되면 X와 Y 값을 받아 더한다.
    .then(function(values) {
        return values[0] + values[1];
    });
}

// fetchX()와 fetchY()는 제각기 값을 가진
// 프로미스를 반환하는데 지금 또는 나중에 준비된다.
add(fetchX(), fetchY())
// 두 숫자의 합이 담긴 프로미스를 받는다.
// 이제 반환된 프로미스가 귀결될 때까지 대기하기 위해
// then()을 연쇄 호출한다.
.then(function(sum) {
    console.log(sum);
});