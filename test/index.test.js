const { isObject, 
        isArray,
        getArrayType,
        compare } = require('../src/index');

test('check if is object (true)', ()=>
{
    const one_object = { };
    expect(isObject(one_object)).toBe(true);
});

test('check if is object (false)', ()=>
{
    const one_string = 'string';
    expect(isObject(one_string)).toBe(false);
});

test('check if is array (true)', ()=>
{
    const one_array = [ ];
    expect(isArray(one_array)).toBe(true);
});

test('check if is array (false)', ()=>
{
    const one_string = 'string';
    expect(isArray(one_string)).toBe(false);
});

test('get array type (number)', ()=>
{
    const number_array = [ 0, 0 ];
    expect(getArrayType(number_array)).toEqual(['number']);
});

test('get array type (string)', ()=>
{
    const string_array = ['string', 'string'];
    expect(getArrayType(string_array)).toEqual(['string']);
});

test('get array type (boolean)', ()=>
{
    const boolean_array = [ true, false ];
    expect(getArrayType(boolean_array)).toEqual(['boolean']);
});

test('get array type (object)', ()=>
{
    const object_array = [ true, false ];    
    expect(getArrayType(object_array)).toEqual(['boolean']);
});

test('compare equals objects', () =>
{
    const required = { a: '', b: 0, c: true, d : { e: [''], f: [0], g: [{}] } };
    const informed = { a: '', b: 0, c: true, d : { e: [''], f: [0], g: [{}] } };
    const erros = compare(required, informed);
    expect(erros).toEqual([]);
});

test('compare objects check (string is required)', () =>
{
    const required = { a: '', b: 0, c: true, d : { e: [''], f: [0], g: [{}] } };
    const informed = { a: 0 , b: 0, c: true, d : { e: [''], f: [0], g: [{}] } };
    const erros = compare(required, informed);
    expect(erros).toEqual([{key:'a', required: 'string', informed: 'number'}]);
});


test('compare objects check (number is required)', () =>
{
    const required = { a: '', b:  0, c: true, d : { e: [''], f: [0], g: [{}] } };
    const informed = { a: '', b: '', c: true, d : { e: [''], f: [0], g: [{}] } };
    const erros = compare(required, informed);
    expect(erros).toEqual([{key:'b', required: 'number', informed: 'string'}]);
});

test('compare objects check (boolean is required)', () =>
{
    const required = { a: '', b: 0, c: true, d : { e: [''], f: [0], g: [{}] } };
    const informed = { a: '', b: 0, c: ''  , d : { e: [''], f: [0], g: [{}] } };
    const erros = compare(required, informed);
    expect(erros).toEqual([{key:'c', required: 'boolean', informed: 'string'}]);
});