[![CircleCI](https://circleci.com/gh/jonathan-sh/schema-type-validation/tree/master.svg?style=svg)](https://circleci.com/gh/jonathan-sh/schema-type-validation/tree/master)
[![Build Status](https://travis-ci.org/jonathan-sh/schema-type-validation.svg?branch=master)](https://travis-ci.org/jonathan-sh/schema-type-validation)

# schema-type-validation

Simple library for checking schema types by another schema with reference.

### getting start
```js
const { compare } = require('schema-type-validation');
let reference = { a: '', b: 0, c: true, d : [ 0 ] };

let to_check = { a:  0, b:'', c: 'oi'};
let erros = compare(reference, to_check);
console.log(erros);
// [ 
//   { path: 'a', required: 'string', informed: 'number' },
//   { path: 'b', required: 'number', informed: 'string' },
//   { path: 'c', required: 'boolean', informed: 'string' },
//   { path: 'd.e', required: '[number]', informed: 'undefined' } 
// ]

to_check = { a: 'name', b: 42, c: false, d : [ -1 ] };
erros = compare(reference, to_check);
console.log(erros);
// [ ]

```

### you can check:  
✓ string or [string]  
✓ number or [number]  
✓ boolean or [boolean]  
✓ object or [object]  
✓ multiple errors  
✓ sublevels validation  

Remember, this library is to help verify types, not values. 