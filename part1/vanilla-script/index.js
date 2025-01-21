// 'use strict';

//  this in global scope

// console.log(this);

/***
 * this in this place in represent the global object
 * in browser this represent the window object
 */

/**
 * this Inside a Function
 *
 */
function x() {
  // the value is depends on strict / non strict mode
  console.log(this);
}
x();

// let damar = {
//   name: 'damar wulan',
//   age: 16,
//   sayHello: function () {
//     console.log(this.name);
//   },
// };

// damar.sayHello(); // this refer to the object it self
// let hello = damar.sayHello;
// hello(); // this refer to the global object. It's gonna be error
// because variable name is not defined in globalObject

/**
 * this in strict mode - (this subtitution)
 *
 * -- Non Strict Mode --
 * Jika nilai dari this adalah undefined atau null, maka keyword this
 * akan digantikan dengan globalObject hanya pada non strict mode
 *
 * -- Strict Mode --
 * Jika pada strict mode, maka nilai this adalah undefined
 *
 * Contoh bisa kita ambil dari this inside a function
 */

// this in strict mode - (this subtitution)

// this value depends on how this is called (window)

// this inside a object's method

// call apply bind method (sharing method)

// this inside arrow function

// this inside nested arrow function

// this inside DOM
