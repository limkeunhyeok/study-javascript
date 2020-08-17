# Part 1 this와 객체 프로토타입

## Chapter 2 this가 이런 거로군

### 1. 호출부

```javascript
function baz() {
    // 호출 스택: baz
    // 따라서 호출부는 전역 스코프 내부이다
    console.log('baz');
    bar(); // bar의 호출부
}

function bar() {
    // 호출 스택: baz -> bar
    // 따라서 호출부는 'baz' 내부이다
    console.log('bar');
    foo(); // foo의 호출부
}

function foo() {
    // 호출 스택: baz -> bar -> foo
    // 따라서 호출부는 bar 내부이다
    console.log('foo');
}

baz(); // baz의 호출부
```

<p>
    this 바인딩은 오직 호출부와 연관되기 때문에 호출 스택에서 진짜 호출부를 찾아내려면 코드를 주의 깊게 잘 봐야 한다.
</p>

### 2. 단지 규칙일 뿐

#### 기본 바인딩

<p>
    가장 평범한 함수 호출인 단독 함수 실행(Standalone Function Invocation)에 관한 규칙으로 나머지 규칙에 해당하지 않을 경우 적용되는 this의 기본 규칙이다.
</p>

```javascript
function foo() {
    console.log(this.a);
}

var a = 2;
foo(); // 2
```

<p>
    `var a = 2`처럼 전역 스코프에 변수를 선언하면 변수명과 같은 이름의 전역 객체 프로퍼티가 생성된다. 그리고 `foo()` 함수 호출 시 `this.a`는 전역 객체 a다. 기본 바인딩이 적용되어 this는 전역 객체를 참조한다.
</p>

```javascript
function foo() {
    "use strict";
    console.log(this.a);
}

var a = 2;
foo(); // 타입 에러
```

<p>
    엄격 모드에서는 전역 객체가 기본 바인딩 대상에서 제외된다. 보통 this 바인딩 규칙은 오로지 호출부에 의해 좌우되지만 비엄격 모드에서 `foo()` 함수의 본문을 실행하면 전역 객체만이 기본 바인딩의 유일한 대상이다.
</p>

#### 암시적 바인딩

<p>
    두 번째 규칙은 호출부에 콘텍스트 객체가 있는지, 즉 객체의 소유(Owning)/포함(Containing) 여부를 확인하는 것이다.
</p>

```javascript
function foo() {
    console.log(this.a);
}

var obj = {
    a: 2,
    foo: foo
}

obj.foo(); // 2
```

<p>
    위의 코드에서 선언한 `foo()` 함수를 obj에서 프로퍼티로 참조하고 있다. `foo()`를 처음부터 foo 프로퍼티로 선언하든, 나중에 레퍼런스로 추가하든 obj 객체가 이 함수를 소유하거나 포함한 것은 아니다. 하지만 호출부는 obj 콘텍스트로 foo()를 참조하므로 obj 객체는 함수 호출 시점에 함수의 레퍼런스를 소유하거나 포함한다고 볼 수 있다.
</p>

<p>
    함수 레퍼런스에 대한 콘텍스트 객체가 존재할 때 암시적 바인딩(Implicit Binding) 규칙에 따르면 이 콘텍스트 객체가 함수 호출 시 this에 바인딩 된다.
</p>

```javascript
function foo() {
    console.log(this.a);
}

var obj2 = {
    a: 42,
    foo: foo
};

var obj1 = {
    a: 2,
    obj2: obj2
};

obj1.obj2.foo(); // 2
```

<p>
    위의 예시처럼 객체 프로퍼티 참조가 체이닝(Chaning)된 형태라면 최상위/최하위 수전의 정보만 호출부와 연관된다.
</p>

##### 암시적 소실

<p>
    암시적으로 바인딩 된(Implicitly Bound) 함수에서 바인딩이 소실되는 경우가 있는데 this 바인딩이 뜻밖에 헷갈리기 쉬운 경우다. 엄격 모드 여부에 따라 전역 객체나 undefined 중 한 가지로 기본 바인딩 된다.
</p>

```javascript
function foo() {
    console.log(this.a);
}

var obj = {
    a: 2,
    foo: foo
};

var bar = obj.foo;
var a = '전역';
bar(); // 전역
```

<p>
    bar는 obj의 foo를 참조하는 변수처럼 보이지만 foo를 직접 가리키는 또 다른 레퍼런스다. 또한 호출부에서 평범하게 bar()를 호출하므로 기본 바인딩이 적용된다.
</p>

```javascript
function foo() {
    console.log(this.a);
}

function doFoo(fn) {
    // fn은 foo의 또 다른 레퍼런스이다
    fn(); // 호출부
}

var obj = {
    a: 2,
    foo: foo
};

var a = '전역';
doFoo(obj.foo); // 전역
```

<p>
    인자로 전달하는 건 일종의 암시적인 할당이다. 따라서 위의 코드처럼 함수를 인자로 넘기면 암시적으로 레퍼런스가 할당되어 앞선 코드와 결과가 같다.
</p>

#### 명시적 바인딩

<p>
    함수 레퍼런스 프로퍼티를 객체에 더하지 않고 어떤 객체를 this 바인딩에 이용하겠다는 의지를 코드에 명확히 밝힐 방도로 `call()`과 `apply()` 메서드를 사용한다. 두 메서드는 this에 바인딩할 객체를 첫째 인자로 받아 함수 호출 시 이 객체를 this로 세팅한다. this를 지정한 객체로 직접 바인딩 하므로 이를 명시적 바인딩(Explicit Binding)이라 한다.
</p>

```javascript
function foo() {
    console.log(this.a);
}

var obj = {
    a: 2
};

foo.call(obj); // 2
```

<p>
    위의 코드는 `foo.call()`에서 명시적으로 바인딩하여 함수를 호출하므로 this는 반드시 obj가 된다. 객체 대신 단순 원시 값을 인자로 전다랗면 원시 값에 대응되는 객체로 래핑된다. 이 과정을 박싱(Boxing)이라고 한다.
</p>

##### 하드 바인딩

```javascript
function foo() {
    console.log(this.a);
}

var obj = {
    a: 2
};

var bar = function() {
    foo.call(obj);
};

bar(); // 2
setTimeout(bar, 100); // 2

// 하드 바인딩된 bar에서 재정의된 this는 의미 없다
bar.call(window); // 2
```

<p>
    함수 `bar()`는 내부에서 `foo.call(obj)`로 foo를 호출하면서 obj를 this에 강제로 바인딩하도록 하드 코딩한다. 따라서 bar를 어떻게 호출하든 이 함수는 항상 obj를 바인딩하여 foo를 실행한다. 이런 바인딩은 명시적이고 강력해서 하드 바인딩(Hard Binding)이라고 한다.
</p>

<p>
    하드 바인딩으로 함수를 감싸는 형태의 코드는 인자를 넘기고 반환 값을 돌려받는 참구가 필요할 때 주로 쓰인다. 재사용 가능한(Reusable) 헬퍼(Helper) 함수를 쓰는 것도 같은 패턴이다.
</p>

<p>
    하드 바인딩은 매우 자주 쓰는 패턴이어서 ES5 내장 유틸리티 `Function.prototype.bind`가 구현되어 있다. bind()는 주어진 this 콘텍스트로 원본 함수를 호출하도록 하드 코딩된 새 함수를 반환한다.
</p>

##### API 호출 콘텍스트

<p>
    많은 라이브러리 함수와 자바스크립트 언어 및 호스트 환경에 내장된 여러 새로운 함수는 대개 콘텍스트라 불리는 선택적인 인자를 제공한다. 이는 `bind()`를 써서 콜백 함수의 this를 지정할 수 없는 경우를 대비한 일종의 예비책이다. 아래 코드의 함수는 편의상 내부적으로 `call()`이나 `apply()`로 명시적 바인딩을 대신해준다.
</p>

```javascript
function foo(el) {
    console.log(el, this.id);
}

var obj = {
    id: '멋진 남자'
};

// foo() 호출 시 obj를 this로 사용한다.
[1, 2, 3].forEach(foo, obj);
// 1 멋진 남자 2 멋진 남자 3 멋진 남자
```

#### new 바인딩

<p>
    전통적인 클래스 지향(Class-Oriented) 언어의 생성자(Constructor)는 클래스에 붙은 특별한 메서드로, 클래스 인스턴스 생성 시 new 연산자로 호출된다. 자바스크립트도 new 연산자가 있어 다른 클래스 지향 언어와 비슷할 거라 생각할 수도 있지만, 의미상 클래스 지향적인 기능과 아무 상관이 없다.
</p>

<p>
    자바스크립트 생성자는 앞에 new 연산자가 있을 때 호출되는 일반 함수에 불과하다. 클래스에 붙은 것도 아니고 클래스 인스턴스화 기능도 없다. 특별한 형태의 함수도 아니며, 단지 new를 사용하여 호출할 때 자동으로 붙들려 실행되는 평범한 함수다.
</p>

<p>
    내장 객체 함수는 물론이고 상당수의 옛 함수는 앞에 new를 붙여 호출할 수 있고 이는 결국 생성자 호출(Constructor Call)이나 다름없다. 미묘한 차이를 잘 구분해야 하는데, 생성자 함수(Constructor Function)가 아니라 함수를 생성하는 호출(Construction Calls Of Function)이라고 해야 옳다. 함수 앞에 new를 붙여 생성자를 호출을 하면 다음과 같은 일들이 일어난다.
</p>

- 새 색체가 만들어진다.
- 새로 생성된 객체의 [[ Prototype ]]이 연결된다.
- 새로 생성된 객체는 함수 호출 시 this로 바인딩 된다.
- 이 함수가 자신의 또 다른 객체를 반환하지 않는 한 new와 함께 호출된 함수는 자동으로 새로 생성된 객체를 반환한다.

```javascript
function foo(a) {
    this.a = a;
}

var bar = new foo(2);
console.log(bar.a); // 2
```

![1](https://user-images.githubusercontent.com/38815618/90412082-9d56cc80-e0e7-11ea-85a2-4b5e15bae124.png)

<p>
    new는 함수 호출 시 this를 새 객체와 바인딩 하는 방법이다.
</p>
