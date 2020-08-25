function Foo(name) {
    this.name = name;
}

Foo.prototype.myName = function() {
    return this.name;
};

function Bar(name, label) {
    Foo.call(this, name);
    this.label = label;
}

// Bar.prototype를 Foo.prototype에 연결한다
Bar.prototype = Object.create(Foo.prototype);

// 여기서 Bar.prototype.constructor은 사라졌으니
// 이 프로퍼티에 의존하는 코드가 있다면 수동으로 일일이 해결해야 한다
Bar.prototype.myLabel = function() {
    return this.label;
};

var a = new Bar("a", "obj a");

console.log(a.myName());
console.log(a.myLabel());