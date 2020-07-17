if (typeof Object.create != 'function') {
    Object.create = function (obj) {
        function F () {};

        // 새로 만든 객체의 prototype 속성에 인자로 받은 객체를 할당한다.
        F.prototype = obj;
        return new F ();
    }
}


Function.prototype.new = function() {
    // 생성자의 원형은 생성자.prototype이기 때문에 this.prototype으로
    // 상속받아서 새로운 객체를 생성한다
    var that = Object.create(this.prototype);

    // 위에서 만든 객체를 적용하여 this 객체의 반환값을 받아온다
    var other = this.apply(that, arguments);

    // 만약 this 객체의 반환값이 객체 타입이라면 other를 반환하고,
    // 객체가 아니라면 맨위에서 생성한 that 객체를 반환한다
    return (typeof other === 'object' && other) || that;
};

var Mother = function () {
    this.name = 'Mother';
    this.ability = 'Cooking';
};

Mother.prototype.get_name = function () {
    return this.name;
};

Mother.prototype.get_ability = function () {
    return this.ability;
};

var Daughter = function () {
    this.name = 'Daughter';
    this.ability = 'Programming';
};

// 딸 생성자 프로토타입을 엄마 생성자 프로토타입을 가진 객체로 변경
Daughter.prototype = new Mother();

var daughter = new Daughter();
console.log(daughter.get_name()); // Daughter
console.log(daughter.get_ability()) // Programming

var mother = {
    name: 'Mother',
    ability: 'Cooking',
    get_name: function () {
        return this.name;
    },
    get_ability: function () {
        return this.ability;
    }
};

var daughter = Object.create(mother);
console.log(daughter.name); // Mother
console.log(daughter.get_name()); // Mother

var mother = function (spec) {
    // 상속을 위한 속성을 담는 객체를 생성
    var that = {};

    // 상속하려는 메소드를 추가
    that.get_name = function () {
        return spec.name;
    };
    that.get_ability = function () {
        return spec.ability;
    };
    // 코드 마지막에 생성했던 객체를 반환
    return that;
};

var mom = mother({name: 'mom', ability: 'cooking'});
console.log(mom.get_name()); // mom
console.log(mom.get_ability());
console.log('---------------------')

var daughter = function (spec) {
    spec.ability = spec.ability || 'game';
    var that = mother(spec);

    // mother로부터 ability에 대한 호출 값을 가져와서 저장
    var super_get_ability = that.get_ability();

    // get_ability에 대한 함수를 재정의
    that.get_ability = function () {
        return 'this is new ability ' + super_get_ability;
    };
    return that;
};

var myDaughter = daughter({name: 'daughter'});
console.log(myDaughter.get_name()); // daughter
console.log(myDaughter.get_ability()); // this is new ability game
console.log('---------------------')

Object.prototype.super = function (name) {
    // 호출한 객체를 that에 할당
    var that = this;
    // 객체에서 이름으로 메소드를 찾음
    var method = that[name];
    
    // 찾아온 메소드를 실행할 때, 호출객체와 매개변수를 활용
    return function () {
        return method.apply(that, arguments);
    };
};

var daughter = function(spec){    
    spec.ability = spec.ability || 'game';
    var that = mother(spec);
    
    // 부모 객체의 메소드를 찾아서 가져옴
    var super_get_ability = that.super('get_ability');
    
    //get_ability 함수를 재정의 한다
    that.get_ability = function(){
        return 'this is new ability '+ super_get_ability();
    };
    return that;
};

var myDaughter = daughter({'name': 'daughter'});
console.log(myDaughter.get_ability()); // this is new ability game