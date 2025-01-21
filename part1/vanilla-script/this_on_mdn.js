function getThis() {
  return this;
}

const obj1 = { name: 'obj1' };
const obj2 = { name: 'obj2' };

obj1.getThis = getThis;
obj2.getThis = getThis;

console.log(obj1.getThis());
console.log(obj2.getThis());

/**
 * using prototype chain to include an object to another
 * - prototype chain is used to include an object to another
 *
 */
const obj3 = {
  __proto__: obj1,
  name: 'obj3',
};

console.log(obj3.getThis());

/**
 * defined function on object creation
 */
const obj4 = {
  name: 'obj4',
  getThis() {
    return this;
  },
};

const obj5 = { name: 'obj5' };

obj5.getThis = obj4.getThis;

console.log('function definition on object creation');
console.log(obj5.getThis());
