var empty_object ={};
var stooge = {
    "first_name": "Lim",
    "last_name": "keunhyeok"
};

console.log(stooge.first_name);
console.log(stooge["last_name"]);
console.log(stooge["middle_name"]);

stooge.last_name = 'KH';
stooge.nickname = 'Curly';

console.log(stooge.last_name);
console.log(stooge.nickname);

var name;

for (name in stooge) {
    if (typeof stooge[name] !== 'function') {
        console.log(name + ': ' + stooge[name]);
    }
}

var another_stooge = Object.create(stooge);
another_stooge['first_name'] = 'Harry';
another_stooge['nickname'] = 'Moe';

console.log(another_stooge.nickname);
delete another_stooge.nickname;
console.log(another_stooge.nickname);

var MYAPP = {};

MYAPP.stooge = {
    "first_name": "Joe",
    "last_name": "Howard"
};

MYAPP.flight = {
    airline: "Oceanic",
    number: 815,
    departure: {
        IATA: "SYD",
        time: "2020-09-22 14:55",
        city: "Sydeny"
    },
    arrival: {
        IATA: "LAX",
        time: "2020-09-23 10:42",
        city: "Los Angeles"
    }
};