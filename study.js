// // 간단한 mixin() 예제

// function mixin(sourceObj, targetObj) {
//     for (var key in sourceObj) {
//         // 타깃에 없는 프로퍼티만 복사한다
//         if (!(key in targetObj)) {
//             targetObj[key] = sourceObj[key];
//         }
//     }
//     return targetObj;
// }

// var Vehicle = {
//     engines: 1,
//     ignition: function() {
//         console.log('엔진을 켠다.');
//     },
//     drive: function() {
//         this.ignition();
//         console.log('방향을 맞추고 앞으로 간다!');
//     }
// };

// var Car = mixin(Vehicle, {
//     wheels: 4,
//     drive: function() {
//         Vehicle.drive.call(this);
//         console.log(this.wheels + '개의 바퀴로 굴러간다!');
//     }
// });

// Car.drive();
// // 엔진을 켠다.
// // 방향을 맞추고 앞으로 간다!
// // 4개의 바퀴로 굴러간다!

// 전통적인 자바스크립트 클래스 Vehicle
function Vehicle() {
    this.engines = 1;
}

Vehicle.prototype.ignition = function() {
    console.log('엔진을 견다.');
};

Vehicle.prototype.drive = function() {
    this.ignition();
    console.log('방향을 맞추고 앞으로 간다!');
};

// 기생 클래스 Car
function Car() {
    // 자동차는 탈것의 하나다
    var car = new Vehicle();

    // 자동차에만 해당되는 내용은 수정한다
    car.wheels = 4;

    // Vehicle::drive()를 가리키는 내부 레퍼런스를 저장한다
    var vehDrive = car.drive;

    // Vehicle::drive()를 오버라이드한다
    car.drive = function() {
        vehDrive.call(this);
        console.log(this.wheels + '개의 바퀴로 굴러간다!');
    }
    return car;
}

var myCar = new Car();

myCar.drive();
// 엔진을 견다.
// 방향을 맞추고 앞으로 간다!
// 4개의 바퀴로 굴러간다!

var Something = {
    cool: function() {
        this.greeting = 'hello world';
        this.count = this.count ? this.count + 1 : 1;
    }
};

Something.cool();
console.log(Something.greeting); // hello world
console.log(Something.count); // 1

var Another = {
    cool: function() {
        // Something을 암시적으로 Another로 믹스인한다
        Something.cool.call(this);
    }
};

Another.cool();
console.log(Another.greeting); // hello world
console.log(Another.count); // 1

Another.cool();
console.log(Something.count); // 1
console.log(Another.count); // 2 Something과 상태가 공유되지 않는다