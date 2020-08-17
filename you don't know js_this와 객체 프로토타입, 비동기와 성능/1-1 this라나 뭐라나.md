# Part 1 this와 객체 프로토타입

## Chapter 1 this라나 뭐라나

### 1. this를 왜

```javascript
function identify() {
    return this.name.toUpperCase();
}

function speak() {
    var greeting = "Hello, I'm " + identify.call(this);
    console.log(greeting);
}

var me = {
    name: "Kyle"
};

var you = {
    name: 'Reader'
};

console.log(identify.call(me)); // KYLE
console.log(identify.call(you)); // READER

speak.call(me); // Hello, I'm KYLE
speak.call(you); // Hello, I'm READER
```

<p>
    위의 코드에서 identify()와 speak() 두 함수는 객체별로 함수를 작성할 필요 없이 다중 콘텍스트(Context) 객체인 me와 you 모두에서 재사용할 수 있다. this를 안 쓰고 아래의 코드처럼 identify()와 speak() 함수에 콘텍스트 객체를 명시할 수 도 있다.
</p>

```javascript
function identify(context) {
    return context.name.toUpperCase();
}

function speak() {
    var greeting = "Hello, I'm " + identify(context);
    console.log(greeting);
}

console.log(identify.call(you)); // READER
speak(me); // Hello, I'm KYLE
```

<p>
    암시적인 객체 레퍼런스를 함께 넘기는(Passing Along) this 체계가 API 설계상 좀 더 깔끔하고 명확하며 재사용하기 쉽다. 사용 패턴이 복잡해질수록 보통 명시적인 인자로 콘텍스트를 넘기는 방법이 this 콘텍스트를 사용하는 것보다 코드가 더 지저분해진다.
</p>

### 2. 헷깔리는 것들

#### 자기 자신

```javascript
function foo(num) {
    console.log("foo: " + num);
    this.count++;
}

foo.count = 0;

var i;

for (i = 0; i < 10; i++) {
    if (i > 5) {
        foo(i);
    }
}

// foo: 6
// foo: 7
// foo: 8
// foo: 9

console.log(foo.count); // 0
```

<p>
    this가 함수 그 자체를 가리킨다는 것은 오해이다. 위의 코드에서 `foo.count = 0`으로 foo 함수 객체에 count 프로퍼티가 추가된다. 하지만 this는 함수 객체를 바라보는 것이 아니다. count는 전역 변수 count로 현재 값은 NaN이다.
</p>

```javascript
function foo() {
    foo.count = 4; // foo는 자기 자신을 가리킨다
}

setTimeout(function() {
    // 익명 함수는 자기 자신을 가리킬 방법이 없다.
}, 10);
```

<p>
    함수가 내부에서 자신을 참조할 때 일반적으로 this만으로는 부족하며 렉시컬 식별자(Lexical Identifier)를 거쳐 함수 객체를 참조한다. 이름 붙은 함수(Named Function)라 불리는 foo 함수는 foo라는 함수명 자체가 내부에서 자신을 가리키는 레퍼런스로 쓰인다. 하지만 setTimeout()에 콜백으로 전달한 함수는 이름 식별자가 없으므로 함수 자신을 참조할 방법이 마땅치 않다.
</p>

```javascript
function foo(num) {
    console.log("foo: " + num);
    // foo가 몇 번 호출됐는지 추적한다
    // this는 foo를 어떻게 호출하느냐에 따라 진짜 foo가 된다
    this.count++;
}

foo.count = 0;

var i;

for (i = 0; i < 10; i++) {
    if (i > 5) {
        // call 함수로 호출하므로
        // this는 자신의 함수 객체 foo를 가리킨다
        foo.call(foo, i);
    }
}

// foo: 6
// foo: 7
// foo: 8
// foo: 9

console.log(foo.count); // 4
```

<p>
    위의 코드처럼 foo 함수 객체를 직접 가리키도록 강제하는 것도 방법이다.
</p>

#### 자신의 스코프

<p>
    this가 바로 함수의 스코프를 가리킨다는 것은 아주 흔한 오해다. this는 어떤 식으로도 함수의 렉시컬 스코프를 참조하지 않는다. 스코프 객체는 자바스크립트 구현체인 엔진의 내부 부품이기 때문에 일반 자바스크립트 코드로는 접근하지 못한다.
</p>

```javascript
function foo() {
    var a = 2;
    this.bar();
}

function bar() {
    console.log(this.a);
}

foo(); // ReferenceError: a is not defined
```

<p>
    위의 코드는 bar() 함수를 this.bar()로 참조하려고 한 것이 문제이다. bar() 앞의 this를 빼고 식별자를 어휘적으로 참조하는 것이 가장 자연스러운 호출 방법이다.
</p>

### 3. this는 무엇인가

<p>
    this는 작성 시점이 아닌 런타임 시점에 바인딩되며 함수 호출 당시 상황에 따라 콘텍스트가 결정된다. 함수 선언 위치와 상관없이 this 바인딩은 오로지 어떻게 함수를 호출했느냐에 따라 정해진다.
</p>

<p>
    함수를 호출하면 활성화 레코드(Activation Record), 즉 실행 콘텍스트(Execution Context)가 만들어진다. 여기엔 함수가 호출된 근원(콜스택)과 호출 방법, 전달된 인자 등의 정보가 담겨있다. this 레퍼런스는 그중 하나로, 함수가 실행되는 동안 이용할 수 있다.
</p>
