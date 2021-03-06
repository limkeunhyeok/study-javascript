# Javascript garbage collection

- 출처: https://engineering.huiseoul.com/%EC%9E%90%EB%B0%94%EC%8A%A4%ED%81%AC%EB%A6%BD%ED%8A%B8%EB%8A%94-%EC%96%B4%EB%96%BB%EA%B2%8C-%EC%9E%91%EB%8F%99%ED%95%98%EB%8A%94%EA%B0%80-%EB%A9%94%EB%AA%A8%EB%A6%AC-%EA%B4%80%EB%A6%AC-4%EA%B0%80%EC%A7%80-%ED%9D%94%ED%95%9C-%EB%A9%94%EB%AA%A8%EB%A6%AC-%EB%88%84%EC%88%98-%EB%8C%80%EC%B2%98%EB%B2%95-5b0d217d788d

## 도입

> C언어같은 저수준 언어에서는 메모리 관리를 위해 malloc()과 free()를 사용한다. 자바스크립트는 객체가 생성되었을 때 자동으로 메모리에 할당하고 쓸모가 없어졌을 때 자동으로 해체하는데 이러한 과정을 가비지 컬렉션(garbage collection)이라고 한다. 메모리 생존주기는 프로그래밍 언어에 관계없이 비슷하다.

![그림1](https://user-images.githubusercontent.com/38815618/88454611-ccdd3500-ceab-11ea-962b-c31e633b1b9f.png)

- **메모리 할당(allocate)**
  - 프로그램이 사용할 수 있도록 운영체제가 메모리를 할당한다.
  - 저수준 언어(예를 들어 C)에서는 이를 개발자가 명시적으로 처리해줘야 하나, 고수준 언어에서는 개발자가 신경 쓸 필요 없다.
- **메모리 사용(use)**
  - 할당된 메모리를 실제로 프로그램이 사용하는 단계이다.
  - 개발자가 코드 상에서 할당된 변수를 사용함으로써 읽기와 쓰기 작업이 이루어진다.
- **메모리 해제(release)**
  - 프로그램에서 필요하지 않은 메모리 전체를 되돌려주어 다시 사용가능하게 만드는 단계이다.
  - 메모리 할당 작업과 마찬가지로 저수준 언어에서는 이를 명시적으로 처리해야 한다.

## 메모리

> 하드웨어 수준에서 컴퓨터 메모리는 많은 수의 플립플롭으로 구성되어 있다. 각각의 플립플롭은 하나의 비트를 저장할 수 있으며, 고유한 식별자를 통해 위치를 확인할 수 있어 읽거나 쓰기가 가능하다. 따라서 개념적으로 볼 때 컴퓨터 메모리는 여러 개의 비트로 구성된 하나의 배열로 볼 수 있으며 여기에 무언가를 읽고 쓸 수 있다.

- 메모리에는 다음 것들이 저장된다.
  - 프로그램에서 사용되는 모든 변수와 기타 데이터
  - 운영체제 및 개별 프로그램의 코드
- 메모리 할당 과정
  - 코드를 컴파일하면 컴파일러는 원시 데이터 타입을 검사해서 필요한 메모리를 미리 계산한다.
  - 그러면 필요로 하는 만큼의 양이 스택 스페이스 라는 곳에서 프로그램에 할당된다.
    - 함수가 호출되면 해당 함수의 메모리가 기존 메모리 위에 추가된다.
  - 함수가 종료되면 LIFO의 순서로 제거된다.

```cpp
int n; // 4바이트
int x[4]; // 4개의 요소를 가진 배열, 각각 4바이트
double m; // 8바이트
```

![그림2](https://user-images.githubusercontent.com/38815618/88454608-cb137180-ceab-11ea-88e2-e4a417c2d18f.png)

- 컴파일러는 즉각적으로 위의 코드가 28바이트를 필요로 한다는 것을 알 수 있다.
- 컴파일러는 변수가 저장될 때 스택에서 필요로 하는 바이트 만큼의 메모리를 운영체제에 요청을 할 수 있도록 상호작용 코드를 삽입한다.
- 위의 코드에서 컴파일러는 각각의 변수의 정확한 메모리 주소를 알고 있다.
  - 변수 n이라고 적을 때마다 내부적으로는 `메모리 주소 4127963`라는 식으로 번역된다.
- 만약 x[4]를 접근하려고 하면 아직 존재하지 않는 배열상의 요소에 접근하는 것이기 때문에 m과 연결된 데이터에 접근하게 된다.
- 어떤 함수가 다른 함수를 호출할 때 각각의 함수는 자신만의 스택 꾸러미를 갖는다.
  - 거기에는 모든 지역 변수와 함수의 실행이 어디에서 이뤄졌는지를 기억하는 프로그램 카운터가 들어 있다.
  - 함수가 종료되면 함수의 메모리 블록은 다른 용도로 사용될 수 있도록 반환된다.

## 동적 할당

```cpp
int n = readInput(); // 사용자로부터 입력을 받음
...
// n개의 요소로 이루어진 배열 생성
```

> 위의 코드에서 컴파일러는 배열이 얼마나 많은 메모리를 필요로 할지 할 수 없다. 따라서 컴파일러는 스택에 변수를 위한 공간을 할당할 수 없다. 대신 프로그램은 운영체제에 명시적으로 적당량의 공간을 요구하는 것을 런타임 해야 한다. 이러한 메모리는 힙 공간으로부터 할당 받는다.

- 정적 메모리 할당과 동적 메모리 할당의 차이는 다음과 같다.

![그림3](https://user-images.githubusercontent.com/38815618/88454609-cbac0800-ceab-11ea-8c8e-bec9eeeea612.png)

- 자바스크립트는 변수 할당 시점에 메모리 할당을 스스로 수행한다.

```javascript
var n = 374; // 숫자에 대한 메모리 할당
var s = 'sessionstack'; // 문자에 대한 메모리 할당

// 객체 및 그 값에 대한 메모리 할당
var o = {
    a: 1,
    b: null
};
var a = [1, null, 'str']; // (객체와 같음) 배열과 그 값에 대한 메모리 할당

// 함수에 대한 할당(함수는 호출할 수 있는 객체임)
// 함수 표현식 또한 객체를 할당함
function f(a) {
    return a + 3;
}

someElement.addEventListener('click', function() {
    someElement.style.backgroundColor = 'blue';
}, false);
```

- 몇몇 함수 호출은 객체 할당의 결과를 가져오기도 한다.

```javascript
var d = new Date(); // Date객체 할당
var e = document.createElement('div'); // DOM 요소 할당
```

- 메소드는 새로운 값이나 객체를 할당할 수 있습니다.

```javascript
var s1 = 'sessionstack';
var s2 = s1.substr(0, 3); // s2는 새로운 문자열이 됨
// 문자열은 불변(immutable)이므로 자바스크립트는 메모리를 할당하지 않고
// [0, 3]의 범위만 저장할 수도 있음

var a1 = ['str1', 'str2'];
var a2 = ['str3', 'str4'];
var a3 = a1.concat(a2);
// 4개의 요소를 가진 새로운 배열은
// a1과 a2 요소의 연결이 됨
```

## 가비지 컬렉터

> 자바스크립트에서 할당된 메모리를 사용하는 것은 기본적으로 그 메모리 내에서 읽거나 쓰는 것을 뜻한다. 객체의 속성이나 변수의 값을 읽거나 쓸 때 혹은 함수에 인수를 넘겨줄 때에도 일어난다.

- 고수준의 언어에는 가비지 컬렉터(garbage collector)라는 소프트웨어가 내장되어, 메모리의 할당을 추적하고 언제 할당된 메모리가 더 이상 사용되지 않는지 파악해서 자동으로 반환한다.
- 일반적으로 메모리 일부가 필요할지를 알아내는 문제는 결정불가능(undecidable)이기 때문에 이러한 과정은 추정에 기반한다.
- 대부분의 가비지 컬렉터는 어떤 메모리를 가리키는 모든 변수가 스코프를 벗어나게 됐을 때 처럼 더 이상 접근 불가능한 메모리를 수집한다.
- 프로그램 상에서 일정한 메모리가 더 이상 사용되지 않고 있으며 이를 반환해야 하는 지를 프로그래머가 판단해야 할 때도 종종 있다.

## 메모리 참조

- 가비지 컬렉션 알고리즘이 의존하고 있는 주요 개념은 참조(reference)이다.
- 메모리 관리의 관점에서 어떤 객체가 다른 객체에 접근할 수 있으면 다른 객체를 참조한다고 말한다.
- 자바스크립트 객체는 자신의 프로토타입에 대한 (암묵적)참조를 갖고 있으며 자신의 속성 값에 대한 (명시적)참조도 갖고 있다.
- 객체라는 것의 개념은 일반적인 자바스크립트 객체에서 좀 더 큰 범위로 확장되어 함수 스코프나 글로벌 렉시컬 스코프까지도 포함하는 것이 된다.

## 참조 횟수 계산 가비지 컬렉션

- 가장 단순한 형태의 가비지컬렉션 알고리즘이다.
- 객체는 가리키는 참조가 하나도 없는 경우 가비지컬렉션 대상(garbage collectible)으로 간주된다.

```javascript
var o1 = {
    o2: {
        x: 1
    }
};

// 두 객체가 생성됨
// 'o2'는 'o1'이 자신의 속성으로서 참조함
// 둘 다 가비지컬렉션 될 수 없음

var o3 = o1; // 'o3' 변수는 'o1'이 가리키는 오브젝트에 대한 참조를 갖는 두 번째임

o1 = 1;      // 이제 'o1'에 있던 객체는 하나의 참조만 남게 되고, 그것은 'o3' 변수에 들어 있음

var o4 = o3.o2; // 'o2' 속성에 대한 참조
                // 이제 이 객체는 두개의 참조를 가짐. 하나는 속성으로서
                // 다른 하나는 'o4' 변수로서

o3 = '374'; // 원래 'o1'에 있던 객체는 이제 참조를 하는 곳이 없음
            // 따라서 가비지컬렉션 될 수 있음
            // 하지만 'o2' 속성은 'o4' 변수가 참조하므로 가비지컬렉션 될 수 없음

o4 = null; // 원래 'o1'객체 내에 있던 'o2'속성은 이제 참조하는 곳이 없으므로
           // 가비지컬렉션 될 수 있음
```

## 순환 참조 때문에 생기는 문제

```javascript
function f() {
    var o1 = {};
    var o2 = {};
    o1.p = o2; // o1은 o2를 참조함
    o2.p = o1; // o2는 o1을 참조함. 이를 통해 순환 참조가 만들어짐.
}

f();
```

- 위의 예제에서는 두 객체가 서로를 참조하므로 순환참조가 생성된다.
- 이 객체들은 함수 호출 뒤에 스코프를 벗어나게 되므로 실질적으로는 쓸모가 없게 되고 이들이 차지하던 메모리는 반환되어야 한다.
- 하지만 참조횟수계산 알고리즘에서는 두 객체가 적어도 한 번은 참조한 것으로 간주하므로 둘 다 가비지컬렉션 될 수 없다.

![그림4](https://user-images.githubusercontent.com/38815618/88454610-cc449e80-ceab-11ea-9526-cc97c93789d1.png)

## 마크스위프 알고리즘(mark and sweep)

- 이 알고리즘은 해당 객체에 닿을 수 있는지(reachable)를 판단한다.
- 마크스위프 알고리즘은 다음 세 단계를 거친다.
    1. roots: 일반적으로 루트는 코드에서 참조되는 전역 변수이다. 예를 들어 자바스크립트에서 루트로 동작할 수 있는 전역 변수는 window 객체이다. Node.js에서 이와 동일한 객체는 global이다. 가비지컬렉터는 모든 루트의 완전한 목록을 만들어낸다.
    2. 모든 루트와 자식들을 검사하여 활성화 여부를 표시한다. 루트가 닿을 수 없는 것들을 가비지로 표시된다.
    3. 마지막으로 가비지컬렉터는 활성으로 표시되지 않은 모든 메모리를 OS에 반환합니다.
- 이 알고리즘은 순환 참조의 문제를 해결한다.

## 가비지 컬렉터의 직관적이지 않은 행동

> 가비지 컬렉터는 예측이 어려워, 개발자는 가비지 컬렉션이 언제 작동하는지 알기 어렵다. 때에 따라 프로그램이 실제로 필요한 것 보다 더 많은 메모리를 사용할 수도 있다. 민감한 애플리케이션의 경우 이렇게 잠깐씩 동작이 멈추는 것이 사용자들의 눈에 띌 수도 있다. 비결정주의가 가비지컬렉션이 언제 수행될지 확실히 알 수 없다는 뜻이기는 하지만 대부분의 가비지컬렉터들의 구현을 보면 공통적으로 메모리 할당 중에 가비지컬렉션을 넘겨주는 패턴을 보인다. 할당이 일어나지 않으면 대부분의 가비지컬렉터는 아무일도 하지 않는다.

1. 대단히 큰 규모의 메모리 할당이 일어남
2. 이 요소들의 대부분(혹은 전체)은 닿을 수 없음(unreachable)의 상태로 표시됨(더 이상 필요로 하지 않는 캐쉬에 대한 참조 포인터를 null로 만듦)
3. 더 이상의 메모리 할당이 일어나지 않음

- 위 시나리오에서 대부분의 가비지 컬렉터들은 더 이상의 컬렉션을 넘겨주지 않는다.
  - 다시 말하면 가비지컬렉션에 더할 만한, 닿을 수 없는 참조가 존재하기는 하지만 가비지 컬렉터들이 이들을 가져 가려하지 않는다.
  - 엄밀히 말해 이것을 메모리 누수라고 할 수는 없지만 그래도 보통 때보다는 더 많은 메모리를 사용하는 원인이 된다.

## 메모리 누수(memory leaks)

- 메모리 누수는 전에는 프로그램에서 사용했다가 더 이상 필요하지 않지만 아직 OS나 자유메모리 풀에 반환되지 않은 메모리 조각들을 말한다.
- 프로그래밍 언어는 나름대로의 메모리 관리 기법을 갖고 있지만, 어떤 메모리가 사용 중인지 아닌지는 결정할 수 없는 문제이다.
- 다시 말하면 오직 개발자만이 어떤 메모리 조각이 운영체제에 반환될 수 있는지를 분명히 할 수 있는 것이다.
- 어떤 프로그램 언어에서는 이러한 작업을 수행할 수 있는 기능을 개발자에게 제공하기도 한다.
- 몇몇 언어에서는 개발자들이 사용되지 않는 메모리에 대해 완전히 명시적이기를 요구하기도 한다.

### 메모리 누수 - 전역 변수

- 선언되지 않은 변수가 참조하는 것은 전역 객체에 새로운 변수를 생성하는 것이다.
- 브라우저상이라면 전역 객체는 window가 된다.

```javascript
function foo (arg) {
    bar = "same text";
};

// 위의 코드는 다음과 동일
function foo (arg) {
    window.bar = "same text";
};
```

- bar의 목적이 foo 함수 내의 어떤 변수를 가리키는 것이라고 할 때, var를 사용하여 변수를 선언하지 않아 필요 없는 전역 변수가 생성될 것이다.
- this를 이용해서도 뜻하지 않은 전역 변수를 생성할 수 있다.

```javascript
function foo() {
    this.var1 = "potential accidental global";
}

// 다른 함수 내에 있지 않은 foo를 호출하면 this는 글로벌 객체(window)를 가리킴
foo();
```

- 자바스크립트 파일의 상단에 use strict를 사용하면 예제와 같은 모든 것들을 회피할 수 있다.
- 이 모드에서 자바스크립트는 예상치 못한 전역 변수 생성을 방지할 수 있는 엄격한 파싱을 시도한다.
- 기대치 않게 생성된 전역변수는 문제이지만, 많은 경우에는 의도적으로 가비지컬렉터가 정리할 수 없는 전역 변수를 사용하기도 한다.
- 임시로 정보를 저장하거나 많은 양의 정보를 처리할 때 사용하는 전역 변수에 주의를 기울일 필요가 있다.
- 필요하다면 전역 변수를 사용할 수도 있지만 사용을 마친 다음에는 꼭 null로 할당하거나 다른 변수로 할당하는 것을 추천한다.

### 메모리 누수 - 잊혀진 타이머, 콜백함수

- 옵저버(이벤트 핸들러)를 제공하는 라이브러리나 콜백을 받는 함수들은 대부분 객체가 닿을 수 없는 상태가 되면 이들에 대한 참조도 닿을 수 없도록 해주고 있다.
- 하지만 종종 아래의 코드들도 볼 수 있다.

```javascript
var serverData = loadData();
setInterval(function() {
    var renderer = document.getElementById('renderer');
    if(renderer) {
        renderer.innerHTML = JSON.stringify(serverData);
    }
}, 5000); // 매 5초 마다 실행
```

- renderer객체는 어느 시점에 다른 것으로 대체되거나 제거될 수 있으며, 인터벌 핸들러로 둘러쌓은 코드는 더 이상 필요 없게 된다.
- 이 인터벌 타이머는 아직 활성 상태이므로 가비지컬렉터는 이 핸들러나 그 내부의 것들을 가져가지 않는다.
- 결국은 많은 양의 데이터를 저장하고 처리하고 있을 serverData도 가져가지 않게 된다.
- 옵저버 사용 시, 그 사용이 종료되었을 때 꼭 명시적으로 제거해야 한다.
- 현대적인 브라우저에서는 개발자가 리스너를 제거하는 것을 잊었다고 하더라도 객체가 닿을 수 없는 상태가 되면 자동으로 옵저버 핸들러를 가져간다.
  - 예전에는 이러한 경우에 대처를 하지 못했다(IE6 같은 경우).
  - 그래도 객체의 사용이 끝나면 그 옵저버는 제거하는 것이 바람직하다.

```javascript
var element = document.getElementById('launch-button');
var counter = 0;

function onClick(event) {
    counter++;
    element.innerHtml = 'text ' + counter;
}
element.addEventListener('click', onClick);

// 필요한 작업 수행

element.removeEventListener('click', onClick);
element.parentNode.removeChild(element);

// 이제 요소들이 스코프를 벗어나게 되면
// 순환참조를 잘 처리하지 못 하는 구형 웹브라우저에서도
// 해당 요소와 onClick 콜백을 가비지컬렉터가 가져감
```

- 위의 예제에서 더 이상 노드를 닿을 수 없는 상태로 만들기 전에 removeEventListener를 호출할 필요가 없다.
  - 현대적 브라우저들은 이러한 순환참조를 탐지하고 적절히 처리하는 가비지컬렉터를 지원하기 때문이다.
- jQuery를 사용한다면 노드가 사용 불가 상태가 되기 전에 리스너를 제거할 수 있으며, 구형 브라우저에서도 메모리 누수가 없도록 처리한다.

### 메모리 누수 - 클로져

- 클로져는 자신을 감싸고 있는 바깥 함수의 변수에 접근할 수 있는 내부의 함수를 말한다.
- 자바스크립트 런타임 구현의 특성상 다음과 같이 메모리누수를 일으키는 것이 가능합니다.

```javascript
var theThing = null;

var replaceThing = function () {
    var originalThing = theThing;
    var unused = function () {
        if (originalThing) { // 'originalThing'에 대한 참조
            console.log("hi");
        };
    };

    theThing = {
        longStr: new Array(1000000).join('*'),
        someMethod: function () {
            console.log("message");
        }
    };
};

setInterval(replaceThing, 1000);
```

- 먼저 replaceThing이 호출 되면 theThing은 커다란 배열과 새로운 클로져(someMethod)를 포함하는 새로운 객체를 얻게 되고, 아직 originalThing은 unused 변수가 갖고 있는 클로져에 의해 참조되고 있다.
  - 기억할 점은 한 번 동일한 부모 스코프에 있는 클로져들에 대한 스코프가 생성되고 나면 이것은 공유된다는 점이다.
- 예제의 경우 someMethod 클로져를 위해 생성된 스코프는 unused와 공유되었다.
- unused는 originalThing에 대한 참조를 가지고 있으며, 다시 사용되지 않는다 해도 theThing을 통해 replaceThing 스코프 바깥에서 사용될 수 있다.
- someMethod는 unused와 클로져 스코프를 공유하기 때문에 unused가 originalThing에 대해 갖고 있는 참조 때문에 강제로 활성 상태가 유지되며, 이로 인해 가비지컬렉션이 작동하지 않는다.
- 위 코드가 실행될 때 마다 메모리 사용량이 갑자기 증가하는 것을 볼 수 있으며, 가비지컬렉터가 수행되어도 그 크기는 줄어들지 않는다.
- 클로져들 사이의 연결된 리스트가 한번 생성되면 각각의 클로져 스코프는 커다란 배열에 대한 간접적 참조를 전달한다.
- 참고: https://blog.meteor.com/an-interesting-kind-of-javascript-memory-leak-8b47d2e7f156

### 메모리 누수 – DOM에서 벗어난 요소 참조

- 테이블 내 몇 열의 내용을 빠르게 업데이트하고 싶은 상황이라고 가정해볼때, 각 열에 대한 참조를 딕셔너리나 배열에 저장하면 동일한 DOM 요소에 대해 두 개의 참조가 존재하는 셈이다.
- 하나는 DOM 트리에, 하나는 딕셔너리에 이 열들을 제거하고자 결정한다면 이 두개의 참조 모두가 닿을 수 없도록 해야하는 것을 주의해야 한다.

```javascript
var elements = {
    button: document.getElementById('button'),
    image: document.getElementById('image')
};

function doStuff() {
    elements.image.src = 'http://example.com/image_name.png';
};

function removeImage() {
    // image는 body 요소의 바로 아래 자식임
    document.body.removeChild(document.getElementById('image'));
    // 이 순간까지 #button 전역 요소 객체에 대한 참조가 아직 존재함
    // 즉, button 요소는 아직도 메모리 상에 있고 가비지컬렉터가 가져갈 수 없음
};
```

- 테이블 내의 셀 태그 (예를 들어 `<td>`)를 참조하고 있다가 해당 테이블을 DOM에서 제거한 상태에서 해당 셀에 대한 참조를 갖고 있다면 커다란 메모리누수가 일어날 수 있다.
- 그 셀은 테이블의 자식노드이고 자식노드들은 부모에 대한 참조를 갖고 있기 때문에 테이블 셀에 대한 참조 하나만으로도 전체 테이블이 메모리에 남아 있게 된다.
