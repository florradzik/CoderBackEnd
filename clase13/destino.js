"use strict";

var lista = [2, 4, 18, -5, 3];
lista.map(function (x) {
  return x * x;
}).forEach(function (x) {
  return console.log(x);
}); //usamos cosas propias del es6, queremos que convierta a es5
