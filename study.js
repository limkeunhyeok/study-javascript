function foo(url) {
    var state; // 제너레이터 상태 관리
    var val; // 제너레이터 스코프 변수 선언

    function process(v) {
        switch (state) {
            case 1:
                console.log("요청 중:", url);
                return request(url);
            case 2:
                val = v;
                console.log(val);
                return;
            case 3:
                var err = v;
                console.log("에러:", err);
                return false;
        }
    }

    // 이터레이터를 만들어 반환
    return {
        next: function(v) {
            // 초기 상태
            if (!state) {
                state = 1;
                return {
                    done: false,
                    value: process()
                };
            }
            // yield 재개가 성공
            else if (state == 1) {
                state = 2;
                return {
                    done: true,
                    value: process(v)
                };
            }
            // 제너레이터는 이미 완료
            else {
                return {
                    done: true,
                    value: undefined
                };
            }
        },
        "throw": function(e) {
            // 명시적인 에러 처리는 상태 1에만 해당
            if (state == 1) {
                state = 3;
                return {
                    done: true,
                    value: process(e)
                };
            }
            // 이 밖의 에러는 처리되지 않으니 그냥 곧바로 던짐
            else {
                throw e;
            }
        }
    };
}