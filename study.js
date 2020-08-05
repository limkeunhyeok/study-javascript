var a = 'false';
var b = "0";
var c = "' '";
var d = [];
var e = {};
var f = function(){}
var g = Boolean(a && b && c && d && e && f);

console.log(g) // true