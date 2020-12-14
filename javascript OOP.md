# Javascript OOP

## 객체 지향 프로그래밍

- 객체지향 프로그래밍은 실제 세계에 기반한 모델을 만들기 위해 추상화를 사용하는 프로그래밍 패러다임이다.
- 객체지향 프로그래밍은 modularity, polymorphism, encapsulation을 포함하여 이전에 정립된 패러다임들부터 여러가지 테크닉들을 사용한다.
- 객체지향 프로그래밍은 관계성있는 객체들의 집합이라는 관점으로 접근하는 소프트웨어 디자인으로 볼 수 있다.
  - 각 객체는 별도의 역할이나 책임을 갖는 작은 독립적인 기계로 볼 수 있는 것이다.
- 객체지향 프로그래밍은 보다 유연하고 유지보수성이 높은 프로그래밍을 하도록 의도되었다.
  - modularity에 기반해 코드를 보다 단순하게 했고, 분석과 이해를 쉽게 하였다.

## 용어

- Class: 객체의 특성을 정의
- Object: Class의 인스턴스
- Property: 객체의 특성
- Method: 객체의 능력
- Constructor: 인스턴스화 되는 시점에서 호출되는 메서드
- Inheritance: 클래스는 다른 클래스로부터 특성들을 상속 받을 수 있다.
- Encapsulation: 클래스는 해당 객체의 특성들만을 정의할 수 있고, 메서드는 그 메서드가 어떻게 실행되는지만 정의할 수 있다. (외부 접근 불가)
- Abstraction: 복잡한 상속, 메서드, 객체의 속성의 결합은 반드시 현실 세계를 시뮬레이션할 수 있어야 한다.
- Polymorphism: 다른 클래스들이 같은 메서드나 속성으로 정의될 수 있다.

## core objects

- 자바스크립트는 코어(core)에 몇 개의 객체를 갖고 있다.
  - Math, Object, Array, String과 같은 객체가 있다.
- 자바스크립트의 core object들의 리스트는 Core JavaScript 1.5 Reference:Global Objects라는 글을 참고
- 자바스크립트의 모든 객체는 Object 객체의 인스턴스이므로 Object의 모든 속성과 메서드를 상속받는다.

## custom objects

### The Class

- class문을 흔하게 볼 수 있는 C++이나 자바와는 달리 자바스크립트는 class문이 포함되지 않은 프로토타입 기반 언어이다.
- 자바스크립트에서는 function을 class로서 사용한다.

### The Object (Class Instance)

- obj라는 이름의 객체의 새로운 인스턴스를 만들 때에는 new obj라는 statement를 사용하고, 차후에 접근할 수 있도록 변수에 결과를 받는다.
- 아래의 예제에서 Person이라는 이름의 클래스를 정의한 후에, 두 개의 인스턴스를 생성하고 있다.

```javascript
function Person() { }
var person1 = new Person();
var person2 = new Person();
```

### The Constructor

- 생성자는 인스턴스화되는 순간(객체 인스턴스가 생성되는 순간) 호출되며, 생성자는 해당 클래스의 메서드이다.
- 자바스크립트에서는 함수 자체가 그 객체의 생성자 역할을 하기 때문에 특별히 생성자 메서드를 정의할 필요가 없다.
- 클래스 안에 선언된 모든 내역은 인스턴스화되는 그 시간에 실행된다.
- 생성자는 주로 객체의 속성을 설정하거나 사용하기 위해 객체를 준비시키는 메서드를 호출할 때 주로 사용된다.
- 아래의 예제에서, Person 클래스의 생성자는 Person이 인스턴스화되었을 때 console을 보여주게 된다.

```javascript
function Person() {
    console.log('Person instantiated');
};
var person1 = new Person();
var person2 = new Person();
```

### The Property (object attribute)

- 속성은 클래스 안에 있는 변수들을 말한다.
- 객체의 모든 인스턴스는 그 인스턴스의 속성을 갖는다.
- 속성들의 상속이 바르게 이루어지려면 해당 클래스(function)의 프로토타입에 선언되어 있어야 한다.
- 클래스 내에서 속성 작업은 현재 객체를 가리키는 this 키워드에 의해 이루어진다.
- 클래스의 외부에서 속성에 접근하는 것은 "인스턴스명.속성명" 의 형식으로 이루어지며, 이러한 문법은 수많은 언어에서와 동일한 방식이다.
  - 클래스 내부에서 "this.속성명" 은 해당 속성의 값을 읽거나 쓸 때 주로 사용된다.
- 아래의 예제에서 Person 클래스에 gender라는 속성을 정의하고 인스턴스화할 때 그 값을 설정한다.

```javascript
function Person(gender) {
    this.gender = gender;
    console.log('Person instantiated');
};
var person1 = new Person('Mail');
var person2 = new Person('Femail');

console.log('person1 is a ' + person1.gender); // person1 is a Mail
```

### The Method

- 메서드는 앞서 살펴본 속성과 같은 방식을 따르며, 차이점이 있다면 메서드는 function이기 때문에 function 형태로 정의된다.
- 메서드를 호출하는 것은 속성에 접근하는 것과 매우 유사한데 단지 끝에 ()를 추가하면 된다.
- argument가 있다면 괄호 안에 입력해준다.
- 메서드를 정의하기 위해서는 클래스의 prototype에 명명된 속성에 함수를 할당하면 되며, 이때 할당된 이름은 해당 객체의 메서드를 호출할 때 사용되는 이름이다.
- 아래의 예에서는 Person 클래스에 sayHello()라는 메서드를 정의하고 사용하고 있다.
- 자바스크립트에서 메서드는 "컨텍스트에 관계 없이" 호출될 수 있는 속성으로서 클래스/객체에 연결되어 있다.

```javascript
function Person(gender) {
    this.gender = gender;
    console.log('Person instantiated');
};

Person.prototype.sayHello = function () {
    console.log('hello');
};

var person1 = new Person('Mail');
var person2 = new Person('Femail');

console.log('person1 is a ' + person1.gender); // person1 is a Mail
person1.sayHello(); // hello
```

- 아래의 예제는 자바스크립트에 "per-object methods" 가 존재하지 않는다는 것을 보여준다.
- JavaScript는 메서드에 대한 레퍼런스가 모두 똑같은 (프로토타입에 처음 정의한) 함수를 참조하고 있기 때문이다.
- 자바스크립트는 어떤 객체의 메서드로서 함수가 호출될 때 현재 "객체의 컨텍스트"를 특별한 "this" 변수에 "연결한다".
  - 이는 아래와 같이 function 객체의 call 메서드를 호출하는 것과 동일하다.
- genderTeller() 만 호출했을 때 undefined 가 나타난 것은 해당 메서드가 호출될 때 컨텍스트가 window 로 잡혔기 때문에, window.gender 는 존재하지 않으므로 undefined 가 나타난 것이다.

```javascript
function Person(gender) {
    this.gender = gender;
};

Person.prototype.sayGender = function () {
    console.log(this.gender);
};

var person1 = new Person('Mail');
var genderTeller = person1.sayGender;

person1.sayGender(); // Mail
genderTeller(); // undefined
console.log(genderTeller === person1.sayGender); // true
console.log(genderTeller === Person.prototype.sayGender); // true
```

### Inheritance

- 상속은 하나 이상의 클래스를 특별한 버전의 클래스로 생성하는 하나의 방법이다.
  - 다만 자바스크립트는 오직 하나의 클래스를 상속받는 것만 지원한다.
- 이 특별한 클래스는 흔히 자식 클래스(child)라고 불리우고 원본 클래스는 흔히 부모 클래스(parent)라고 불리운다.
- 자바스크립트에서는 부모 클래스의 인스턴스를 자식 클래스에 할당함으로써 상속이 이루어진다.
- 최신 브라우저에서는 Object.create 메서드를 사용해서 상속을 수행할 수도 있다.
- Object.create를 사용하면 상속을 아래와 같이 수행할 수 있다.

```javascript
Student.prototype = Object.create(Person.prototype);
```

- 아래 예제에서는, Student라는 클래스를 Person 클래스의 자식 클래스로 정의한다.
- 그 후에 sayHello() 메서드를 재정의하고 sayGoodBye() 메서드를 추가한다.

```javascript
// define the Person Class
function Person() {}

Person.prototype.walk = function () {
    console.log('I am walking');
};

Person.prototype.sayHello = function () {
    console.log('hello');
};

// define the Student Class
function Student () {
    // Call the parent constructor
    Person.call(this);
};

// inherit Person
Student.prototype = new Person();

// correct the constructor pointer because it points to Person
Student.prototype.construcrtor = Student;

// replace the sayHello method
Student.prototype.sayHello = function () {
    console.log('hi, i am a student');
};

// add sayGoodbye method
Student.prototype.sayGoodbye = function () {
    console.log('goodbye');
};

var student1 = new Student();
student1.sayHello(); // hi, i am a student
student1.walk(); // I am walking
student1.sayGoodbye(); // goodbye

// check inheritance
console.log(student1 instanceof Person); // true
console.log(student1 instanceof Student); // true
```

### Encapsulation

- 이전의 예제에서, Student 클래스는 Person 클래스의 walk() 메서드가 어떻게 실행되는지에 대해 알 필요가 없고, walk() 메서드를 사용하는데에도 전혀 문제가 없다.
  - 또 Student 클래스에서는 walk() 메서드의 내용을 바꾸려는게 아니라면 walk() 메서드를 특별히 정의할 필요도 없다.
- 자식 클래스는 부모 클래스의 모든 메서드를 상속받고, 상속받은 메서드중 일부를 수정하고 싶은 경우에만 해당 메서드를 정의하는 것을 우리는 캡슐화(encapsulation)이라고 부른다.

### Abstraction

- 추상화는 작업 문제의 현재 부분을 모델링할 수 있도록 하는 매커니즘이다.
- 추상화는 상속(specialization, 추상의 수준을 낮추는 것)과 합성으로 구현할 수 있다.
- 자바스크립트는 상속에 의해 특별화(specialization)를, 클래스들의 인스턴스를 다른 객체의 속성값이 되게 함으로써 합성을 구현한다.
- 자바스크립트 Function 클래스는 Object 클래스를 상속받고(이는 모델의 특별화를 보여준다), Function.prototype 속성은 Object의 인스턴스이다(이는 합성을 보여준다).

### Polymorphism

- 모든 메서드와 속성들은 prototype 속성에 선언되어 있고, 클래스가 다르다면 같은 이름의 메서드도 선언할 수 있다.
- 메서드들은 메서드가 선언된 클래스로 그 실행 영역이 한정된다.
  - 물론 이건 두 개의 클래스들이 서로 부모-자식 관계가 아닐때에만 성립한다.
  - 즉 다시 말해 부모-자식 관계의 상속 관계로 하나가 다른 하나에게서 상속받지 않았을 때에만 성립한다.
