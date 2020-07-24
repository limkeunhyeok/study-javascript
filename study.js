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