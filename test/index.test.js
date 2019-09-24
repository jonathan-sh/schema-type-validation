const { isObject, 
        isArray,
        arrayType } = require('../src/index');

test('check is object [true]', ()=>
{
    const one_object = { };
    expect(isObject(one_object)).toBe(true);
});

test('check is object [false]', ()=>
{
    const one_string = 'string';
    expect(isObject(one_string)).toBe(false);
});

test('check is array [true]', ()=>
{
    const one_array = [ ];
    expect(isArray(one_array)).toBe(true);
});

test('check is array [false]', ()=>
{
    const one_string = 'string';
    expect(isArray(one_string)).toBe(false);
});

test('get array type [number]', ()=>
{
    const number_array = [ 0, 0 ];
    expect(arrayType(number_array)).toEqual(['number']);
});

test('get array type [string]', ()=>
{
    const string_array = ['string', 'string'];
    expect(arrayType(string_array)).toEqual(['string']);
});

test('get array type [boolean]', ()=>
{
    const boolean_array = [ true, false ];
    expect(arrayType(boolean_array)).toEqual(['boolean']);
});

test('get array type [object]', ()=>
{
    const object_array = [ true, false ];    
    expect(arrayType(object_array)).toEqual(['boolean']);
});