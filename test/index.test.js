const { isObject } = require("../src/index");

test("check is object [true]", ()=>
{
    const one_object = { };
    expect(isObject(one_object)).toBe(true);
})

test("check is object [false]", ()=>
{
    const one_string = "string";
    expect(isObject(one_string)).toBe(false);
})